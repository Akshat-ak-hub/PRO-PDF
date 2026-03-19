import React from 'react';
import Layout from './components/Layout';
import { Layers, SplitSquareHorizontal, Image as ImageIcon, Type, RotateCw, Trash2, FileImage, Hash, Unlock, Lock } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ToolPage from './pages/ToolPage';

const tools = [
  {
    id: 'merge',
    title: 'Merge PDF',
    description: 'Combine PDFs in the order you want with the easiest PDF merger available.',
    icon: <Layers size={32} />,
  },
  {
    id: 'split',
    title: 'Split PDF',
    description: 'Separate one page or a whole set for easy conversion into independent PDF files.',
    icon: <SplitSquareHorizontal size={32} />,
  },
  {
    id: 'rotate',
    title: 'Rotate PDF',
    description: 'Rotate your PDFs the way you need them. You can even rotate multiple PDFs at once!',
    icon: <RotateCw size={32} />,
  },
  {
    id: 'remove-pages',
    title: 'Remove Pages',
    description: 'Remove annoying pages from a document. Upload your PDF and select the pages to delete.',
    icon: <Trash2 size={32} />,
  },
  {
    id: 'add-page-numbers',
    title: 'Add Page Numbers',
    description: 'Add page numbers into PDFs with ease. Automatically formatted at the bottom center.',
    icon: <Hash size={32} />,
  },
  {
    id: 'pdf-to-images',
    title: 'PDF to Images',
    description: 'Extract every single page of your PDF into high-quality JPG images directly in your browser.',
    icon: <FileImage size={32} />,
  },
  {
    id: 'watermark',
    title: 'Add Watermark',
    description: 'Stamp an image or text over your PDF in seconds. Choose the typography and transparency.',
    icon: <Type size={32} />,
  },
  {
    id: 'image-to-pdf',
    title: 'Image to PDF',
    description: 'Convert JPG, PNG, or TIFF images to PDF document.',
    icon: <ImageIcon size={32} />,
  },
  {
    id: 'unlock',
    title: 'Unlock PDF',
    description: 'Remove PDF password security recursively with decryption.',
    icon: <Unlock size={32} />,
  },
  {
    id: 'protect',
    title: 'Protect PDF',
    description: 'Protect PDF files with a password. Encrypt PDF documents to prevent unauthorized access.',
    icon: <Lock size={32} />,
  }
];

function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero-section" style={{ minHeight: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', position: 'relative' }}>
        <div className="container" style={{ zIndex: 10 }}>
          <h1 style={{ fontSize: '5rem', fontWeight: 900, marginBottom: '1.5rem', lineHeight: 1.1, textTransform: 'uppercase' }}>
            <span className="text-gradient">Cyber-Grade</span><br/>
            PDF Processing
          </h1>
          <p style={{ fontSize: '1.35rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto 3rem', fontWeight: 600, letterSpacing: '0.5px' }}>
            Experience blindingly fast, completely offline, client-side PDF tools. <br/>Merge, split, rotate, and extract pages securely. No servers. No limits.
          </p>
          <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center' }}>
            <a href="#tools" className="btn btn-primary">Initialize Tools</a>
            <a href="#features" className="btn btn-secondary">System Specs</a>
          </div>
        </div>
        {/* Decorative background glow */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '70vw', height: '70vw', background: 'radial-gradient(circle, rgba(0,240,255,0.06) 0%, transparent 60%)', zIndex: 0, pointerEvents: 'none' }}></div>
      </section>

      {/* Features Section */}
      <section id="features" style={{ padding: '6rem 0', borderTop: '1px solid var(--glass-border)', background: 'rgba(5,5,5,0.8)' }}>
        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '4rem', color: 'var(--neon-pink)', textTransform: 'uppercase', letterSpacing: '2px' }}>System Advantages</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
            <div className="glass-panel" style={{ padding: '3rem 2rem', textAlign: 'center' }}>
              <div style={{ width: 64, height: 64, margin: '0 auto 1.5rem', borderRadius: '50%', background: 'rgba(0,240,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--neon-cyan)' }}>
                <span style={{ fontSize: '1.5rem', color: 'var(--neon-cyan)', fontWeight: 800 }}>01</span>
              </div>
              <h3 style={{ color: 'var(--neon-cyan)', marginBottom: '1rem', fontSize: '1.5rem' }}>100% Client-Side</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Files never leave your device. All processing happens within your local browser memory using advanced WASM and JS engines.</p>
            </div>
            <div className="glass-panel" style={{ padding: '3rem 2rem', textAlign: 'center' }}>
               <div style={{ width: 64, height: 64, margin: '0 auto 1.5rem', borderRadius: '50%', background: 'rgba(0,240,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--neon-cyan)' }}>
                <span style={{ fontSize: '1.5rem', color: 'var(--neon-cyan)', fontWeight: 800 }}>02</span>
              </div>
               <h3 style={{ color: 'var(--neon-cyan)', marginBottom: '1rem', fontSize: '1.5rem' }}>Zero Latency</h3>
               <p style={{ color: 'var(--text-secondary)' }}>Since no upload or download to a remote server is required, your PDFs are processed instantly natively.</p>
            </div>
            <div className="glass-panel" style={{ padding: '3rem 2rem', textAlign: 'center' }}>
               <div style={{ width: 64, height: 64, margin: '0 auto 1.5rem', borderRadius: '50%', background: 'rgba(0,240,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--neon-cyan)' }}>
                <span style={{ fontSize: '1.5rem', color: 'var(--neon-cyan)', fontWeight: 800 }}>03</span>
              </div>
               <h3 style={{ color: 'var(--neon-cyan)', marginBottom: '1rem', fontSize: '1.5rem' }}>Total Privacy</h3>
               <p style={{ color: 'var(--text-secondary)' }}>Ultimate security for your sensitive documents. We can't see your data even if we wanted to.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section id="tools" style={{ padding: '8rem 0' }}>
        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <h2 style={{ fontSize: '3.5rem', textAlign: 'center', marginBottom: '1rem', color: '#fff', textTransform: 'uppercase' }}>Tool <span className="text-gradient">Database</span></h2>
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '4rem', fontSize: '1.2rem' }}>Select a module to begin operations.</p>
          <div className="tool-grid">
            {tools.map(tool => (
              <Link key={tool.id} to={`/tool/${tool.id}`} className="tool-card glass-panel">
                <div className="diamond-icon">
                  {tool.icon}
                </div>
                <h3 className="tool-title">{tool.title}</h3>
                <p className="tool-desc">{tool.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tool/:id" element={<ToolPage />} />
      </Routes>
    </Router>
  );
}

export default App;
