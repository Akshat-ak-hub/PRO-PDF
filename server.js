import express from 'express';
import multer from 'multer';
import cors from 'cors';
import muhammara from 'muhammara';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());

// Ensure uploads directory exists
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

app.post('/api/protect', upload.single('pdf'), (req, res) => {
  try {
    const password = req.body.password;
    if (!password) {
      return res.status(400).send("No password provided");
    }
    
    if (!req.file) {
      return res.status(400).send("No PDF file provided");
    }

    const inputPath = req.file.path;
    const outputPath = inputPath + '-protected.pdf';
    
    // Encrypt using Muhammara - construct a completely new stream to reliably inject encryption
    const pdfWriter = muhammara.createWriter(outputPath, {
      userPassword: password,
      ownerPassword: password,
      userProtectionFlag: 4
    });
    pdfWriter.appendPDFPagesFromPDF(inputPath);
    
    pdfWriter.end();
    
    res.download(outputPath, 'protected_document.pdf', (err) => {
      // Cleanup files after download finishes
      try {
        if (fs.existsSync(inputPath)) fs.unlinkSync(inputPath);
        if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
      } catch(e) {
        console.error("Cleanup error:", e);
      }
    });

  } catch (error) {
    console.error("Encryption error:", error);
    res.status(500).send("Error encrypting PDF");
    // Cleanup on error
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`PROPDF Backend running locally on http://localhost:${PORT}`);
  console.log(`Encryption API ready at http://localhost:${PORT}/api/protect`);
});
