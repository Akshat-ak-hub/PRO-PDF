import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import ToolContainer from '../components/ToolContainer';
import { mergePdfs, splitPdf, addWatermark, convertImageToPdf, rotatePdf, removePages, addPageNumbers, extractPdfToImages, unlockPdf } from '../utils/pdfOperations';

export default function ToolPage() {
  const { id } = useParams();

  let toolProps = {};

  switch (id) {
    case 'merge':
      toolProps = {
        title: 'Merge PDF',
        description: 'Combine PDFs in the order you want with the easiest PDF merger available.',
        accept: { 'application/pdf': ['.pdf'] },
        multiple: true,
        onProcess: (files) => mergePdfs(files),
      };
      break;
    case 'split':
      toolProps = {
        title: 'Split PDF',
        description: 'Separate one page or a whole set for easy conversion into independent PDF files.',
        accept: { 'application/pdf': ['.pdf'] },
        multiple: false,
        onProcess: (files) => splitPdf(files[0]),
      };
      break;
    case 'rotate':
      toolProps = {
        title: 'Rotate PDF',
        description: 'Rotate your PDFs the way you need them.',
        accept: { 'application/pdf': ['.pdf'] },
        multiple: false,
        renderOptions: (options, setOptions) => (
          <div>
            <h4 style={{ marginBottom: '0.75rem', fontWeight: 700 }}>Rotation Angle</h4>
            <select 
              className="btn btn-secondary"
              style={{ width: '100%', outline: 'none', textAlign: 'left', padding: '1rem' }}
              value={options.angle || 90} 
              onChange={e => setOptions({...options, angle: parseInt(e.target.value)})}>
              <option value={90} style={{ color: '#000' }}>Rotate 90° Clockwise</option>
              <option value={180} style={{ color: '#000' }}>Rotate 180°</option>
              <option value={270} style={{ color: '#000' }}>Rotate 90° Counter-Clockwise</option>
            </select>
          </div>
        ),
        onProcess: (files, options) => rotatePdf(files[0], options.angle || 90),
      };
      break;
    case 'remove-pages':
      toolProps = {
        title: 'Remove Pages',
        description: 'Remove annoying pages from a document. Enter page numbers to delete (e.g. 1, 3, 5).',
        accept: { 'application/pdf': ['.pdf'] },
        multiple: false,
        renderOptions: (options, setOptions) => (
          <div>
            <h4 style={{ marginBottom: '0.75rem', fontWeight: 700 }}>Pages to Remove (Comma separated)</h4>
            <input 
              type="text" 
              className="btn btn-secondary" 
              style={{ width: '100%', cursor: 'text', textAlign: 'left', padding: '1rem' }} 
              placeholder="e.g. 1, 3, 4"
              value={options.pageString || ''}
              onChange={e => setOptions({...options, pageString: e.target.value})}
            />
          </div>
        ),
        onProcess: (files, options) => {
          if (!options.pageString) throw new Error("No pages specified");
          const pagesToRemove = options.pageString.split(',')
            .map(s => parseInt(s.trim()) - 1)
            .filter(n => !isNaN(n));
          return removePages(files[0], pagesToRemove);
        },
      };
      break;
    case 'add-page-numbers':
      toolProps = {
        title: 'Add Page Numbers',
        description: 'Automatically stamp page numbers at the bottom center of the document.',
        accept: { 'application/pdf': ['.pdf'] },
        multiple: false,
        onProcess: (files) => addPageNumbers(files[0]),
      };
      break;
    case 'pdf-to-images':
      toolProps = {
        title: 'PDF to Images',
        description: 'Extract every single page of your PDF into high-quality JPG images directly in your browser.',
        accept: { 'application/pdf': ['.pdf'] },
        multiple: false,
        onProcess: (files) => extractPdfToImages(files[0]),
      };
      break;
    case 'watermark':
      toolProps = {
        title: 'Add Watermark',
        description: 'Stamp text over your PDF in seconds.',
        accept: { 'application/pdf': ['.pdf'] },
        multiple: false,
        renderOptions: (options, setOptions) => (
          <div>
            <h4 style={{ marginBottom: '0.75rem', fontWeight: 700 }}>Watermark Text</h4>
            <input 
              type="text" 
              className="btn btn-secondary" 
              style={{ width: '100%', cursor: 'text', textAlign: 'left', padding: '1rem' }} 
              placeholder="CONFIDENTIAL"
              value={options.text || ''}
              onChange={e => setOptions({...options, text: e.target.value})}
            />
          </div>
        ),
        onProcess: (files, options) => addWatermark(files[0], options.text || "CONFIDENTIAL"),
      };
      break;
    case 'image-to-pdf':
      toolProps = {
        title: 'Image to PDF',
        description: 'Convert JPG, PNG, or TIFF images to PDF document.',
        accept: { 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'] },
        multiple: true,
        onProcess: (files) => convertImageToPdf(files),
      };
      break;
    case 'unlock':
      toolProps = {
        title: 'Unlock PDF',
        description: 'Remove PDF password security.',
        accept: { 'application/pdf': ['.pdf'] },
        multiple: false,
        renderOptions: (options, setOptions) => (
          <div>
            <h4 style={{ marginBottom: '0.75rem', fontWeight: 700 }}>Document Password</h4>
            <input 
              type="password" 
              className="btn btn-secondary" 
              style={{ width: '100%', cursor: 'text', textAlign: 'left', padding: '1rem' }} 
              placeholder="Enter password..."
              value={options.password || ''}
              onChange={e => setOptions({...options, password: e.target.value})}
            />
          </div>
        ),
        onProcess: (files, options) => {
          if (!options.password) throw new Error("Please enter a password.");
          return unlockPdf(files[0], options.password);
        },
      };
      break;
    case 'protect':
      toolProps = {
        title: 'Protect PDF',
        description: 'Encrypt your PDF with a password to prevent unauthorized access.',
        accept: { 'application/pdf': ['.pdf'] },
        multiple: false,
        renderOptions: (options, setOptions) => (
          <div>
            <h4 style={{ marginBottom: '0.75rem', fontWeight: 700 }}>Set Password</h4>
            <input 
              type="password" 
              className="btn btn-secondary" 
              style={{ width: '100%', cursor: 'text', textAlign: 'left', padding: '1rem' }} 
              placeholder="Enter a strong password..."
              value={options.password || ''}
              onChange={e => setOptions({...options, password: e.target.value})}
            />
          </div>
        ),
        onProcess: async (files, options) => {
          if (!options.password) throw new Error("Please enter a password.");
          
          const formData = new FormData();
          formData.append('pdf', files[0]);
          formData.append('password', options.password);
          
          const response = await fetch('http://localhost:3001/api/protect', {
            method: 'POST',
            body: formData,
          });
          
          if (!response.ok) {
            const errText = await response.text();
            throw new Error(errText || "Encryption Failed on Backend");
          }
          
          const blob = await response.blob();
          return blob;
        },
      };
      break;
    default:
      return <Layout><h2 style={{ textAlign: 'center', marginTop: '4rem' }}>Tool Not Found</h2></Layout>;
  }

  return (
    <Layout>
      <ToolContainer {...toolProps} />
    </Layout>
  );
}
