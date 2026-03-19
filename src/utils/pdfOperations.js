import { PDFDocument, rgb, degrees, StandardFonts } from 'pdf-lib';
import * as pdfjsLib from 'pdfjs-dist';

// Use CDN for worker to bypass bundler setup for Vite
pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

export async function mergePdfs(files) {
  const mergedPdf = await PDFDocument.create();
  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer();
    const pdfToMerge = await PDFDocument.load(arrayBuffer);
    const copiedPages = await mergedPdf.copyPages(pdfToMerge, pdfToMerge.getPageIndices());
    copiedPages.forEach((page) => mergedPdf.addPage(page));
  }
  const mergedPdfFile = await mergedPdf.save();
  return new Blob([mergedPdfFile], { type: 'application/pdf' });
}

export async function splitPdf(file) {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  const totalPages = pdfDoc.getPageCount();
  const blobs = [];
  for (let i = 0; i < totalPages; i++) {
    const newPdf = await PDFDocument.create();
    const [copiedPage] = await newPdf.copyPages(pdfDoc, [i]);
    newPdf.addPage(copiedPage);
    const pdfBytes = await newPdf.save();
    blobs.push({
      blob: new Blob([pdfBytes], { type: 'application/pdf' }),
      filename: `${file.name.replace('.pdf', '')}_page_${i+1}.pdf`
    });
  }
  return blobs;
}

export async function addWatermark(file, text = "CONFIDENTIAL") {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  const pages = pdfDoc.getPages();
  for (const page of pages) {
    const { width, height } = page.getSize();
    page.drawText(text, {
      x: width / 2 - 100,
      y: height / 2,
      size: 50,
      color: rgb(0.95, 0.1, 0.1),
      opacity: 0.3,
      rotate: degrees(45),
    });
  }
  const pdfBytes = await pdfDoc.save();
  return new Blob([pdfBytes], { type: 'application/pdf' });
}

export async function convertImageToPdf(files) {
  const pdfDoc = await PDFDocument.create();
  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer();
    let image;
    if (file.type === 'image/jpeg') {
      image = await pdfDoc.embedJpg(arrayBuffer);
    } else if (file.type === 'image/png') {
      image = await pdfDoc.embedPng(arrayBuffer);
    } else continue;
    
    const page = pdfDoc.addPage([image.width, image.height]);
    page.drawImage(image, { x: 0, y: 0, width: image.width, height: image.height });
  }
  const pdfBytes = await pdfDoc.save();
  return new Blob([pdfBytes], { type: 'application/pdf' });
}

// ==========================================
// V2 NEW FEATURES
// ==========================================

export async function rotatePdf(file, angle = 90) {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  const pages = pdfDoc.getPages();
  for (const page of pages) {
    const currentRotation = page.getRotation().angle || 0;
    page.setRotation(degrees(currentRotation + angle));
  }
  const pdfBytes = await pdfDoc.save();
  return new Blob([pdfBytes], { type: 'application/pdf' });
}

export async function removePages(file, pagesToRemove) {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  
  // Sort descending to not mess up indices as we remove
  const sortedPages = [...pagesToRemove].sort((a, b) => b - a);
  for (const pageIndex of sortedPages) {
    try {
      pdfDoc.removePage(pageIndex);
    } catch(e) {
      console.warn("Could not remove page index: " + pageIndex);
    }
  }
  
  const pdfBytes = await pdfDoc.save();
  return new Blob([pdfBytes], { type: 'application/pdf' });
}

export async function addPageNumbers(file) {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  const pages = pdfDoc.getPages();
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

  pages.forEach((page, idx) => {
    const { width } = page.getSize();
    const text = `Page ${idx + 1} of ${pages.length}`;
    const textWidth = helveticaFont.widthOfTextAtSize(text, 12);
    
    page.drawText(text, {
      x: width / 2 - textWidth / 2,
      y: 20, 
      size: 12,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });
  });

  const pdfBytes = await pdfDoc.save();
  return new Blob([pdfBytes], { type: 'application/pdf' });
}

export async function extractPdfToImages(file) {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  const totalPages = pdf.numPages;
  const imageBlobs = [];
  
  for (let i = 1; i <= totalPages; i++) {
    const page = await pdf.getPage(i);
    const scale = 2; // high res
    const viewport = page.getViewport({ scale });
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    
    await page.render({ canvasContext: ctx, viewport }).promise;
    
    const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', 0.9));
    imageBlobs.push({
      blob,
      filename: `${file.name.replace('.pdf', '')}_page_${i}.jpg`
    });
  }
  
  return imageBlobs;
}

export async function unlockPdf(file, password) {
  const arrayBuffer = await file.arrayBuffer();
  // PDFDocument.load automatically decrypts if standard encryption is used and password provided
  const pdfDoc = await PDFDocument.load(arrayBuffer, { password });
  const pdfBytes = await pdfDoc.save(); // Saved unprotected
  return new Blob([pdfBytes], { type: 'application/pdf' });
}
