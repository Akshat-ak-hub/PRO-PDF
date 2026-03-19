import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, FileText, CheckCircle, Download, RefreshCw } from 'lucide-react';

export default function ToolContainer({ title, description, onProcess, accept, multiple = true, renderOptions }) {
  const [files, setFiles] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [options, setOptions] = useState({});

  const onDrop = useCallback(acceptedFiles => {
    setFiles(prev => multiple ? [...prev, ...acceptedFiles] : acceptedFiles);
    setResult(null);
  }, [multiple]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    multiple,
  });

  const handleProcess = async () => {
    if (files.length === 0) return;
    setProcessing(true);
    try {
      const output = await onProcess(files, options);
      setResult(output);
    } catch (error) {
      console.error("Processing failed", error);
      alert("An error occurred while processing files. Check the console for more details.");
    } finally {
      setProcessing(false);
    }
  };

  const handleDownload = async () => {
    if (!result) return;
    
    if (Array.isArray(result)) {
      const JSZip = (await import('jszip')).default;
      const { saveAs } = await import('file-saver');
      const zip = new JSZip();
      
      result.forEach(({ blob, filename }) => {
        zip.file(filename, blob);
      });
      
      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, "propdf_output_files.zip");
    } else {
      const { saveAs } = await import('file-saver');
      saveAs(result, "propdf_output.pdf");
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 0' }}>
      <h2 style={{ fontSize: '3rem', fontWeight: 900, textAlign: 'center', marginBottom: '1rem' }}>{title}</h2>
      <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '3rem', fontSize: '1.2rem' }}>{description}</p>
      
      {!result ? (
        <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
          
          <div 
            {...getRootProps()} 
            style={{
              border: `2px dashed ${isDragActive ? 'var(--accent-primary)' : 'var(--border-color)'}`,
              borderRadius: '16px',
              padding: '4rem 2rem',
              cursor: 'pointer',
              background: isDragActive ? 'rgba(236, 72, 153, 0.15)' : 'rgba(255,255,255,0.03)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              marginBottom: '2rem'
            }}
          >
            <input {...getInputProps()} />
            <UploadCloud size={72} style={{ color: isDragActive ? 'var(--accent-primary)' : 'var(--text-muted)', margin: '0 auto 1.5rem', transition: 'all 0.3s' }} />
            <h3 style={{ fontSize: '1.75rem', marginBottom: '0.75rem', fontWeight: 800 }}>
              {isDragActive ? "Drop files here..." : "Select PDF files"}
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>or drag and drop them here</p>
          </div>

          {files.length > 0 && (
            <div style={{ textAlign: 'left', marginBottom: '2rem' }}>
              <h4 style={{ marginBottom: '1rem', fontSize: '1.2rem', fontWeight: 700 }}>Selected Files ({files.length})</h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {files.map((f, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem', background: 'rgba(255,255,255,0.08)', borderRadius: '12px', marginBottom: '0.75rem', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <FileText size={24} style={{ color: 'var(--accent-secondary)' }} />
                    <span style={{ flex: 1, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', fontWeight: 600 }}>{f.name}</span>
                    <button className="btn btn-danger" style={{ padding: '0.35rem 0.75rem', fontSize: '0.85rem' }} onClick={(e) => { e.stopPropagation(); setFiles(files.filter((_, idx) => idx !== i)) }}>Remove</button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {renderOptions && files.length > 0 && (
            <div style={{ marginBottom: '2rem', textAlign: 'left', background: 'rgba(15, 23, 42, 0.3)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
              {renderOptions(options, setOptions, files)}
            </div>
          )}

          <button 
            className="btn btn-primary" 
            style={{ fontSize: '1.35rem', padding: '1.25rem 4rem' }}
            disabled={files.length === 0 || processing}
            onClick={handleProcess}
          >
            {processing ? (
              <><RefreshCw className="animate-spin" /> Processing...</>
            ) : (
              "Process Document"
            )}
          </button>
        </div>
      ) : (
        <div className="glass-panel animate-fade-in" style={{ padding: '4rem 2rem', textAlign: 'center', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
          <CheckCircle size={96} style={{ color: 'var(--success)', margin: '0 auto 1.5rem' }} />
          <h3 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: 900 }}>Task Complete!</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem', fontSize: '1.2rem' }}>
            Your files have been processed securely on your device.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button className="btn btn-primary" style={{ fontSize: '1.2rem', padding: '1rem 2.5rem' }} onClick={handleDownload}>
              <Download /> Download Result
            </button>
            <button className="btn btn-secondary" style={{ fontSize: '1.2rem', padding: '1rem 2.5rem' }} onClick={() => { setResult(null); setFiles([]); setOptions({}); }}>
              Start Over
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
