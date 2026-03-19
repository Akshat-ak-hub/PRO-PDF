import React from 'react';
import { Terminal } from 'lucide-react';

export default function Layout({ children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <header style={{ 
        padding: '1.25rem 0', 
        borderBottom: '1px solid var(--border-color)',
        background: 'rgba(5, 5, 5, 0.85)',
        backdropFilter: 'blur(16px)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a href="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Terminal size={36} color="var(--neon-cyan)" style={{ filter: 'drop-shadow(0 0 8px rgba(0, 240, 255, 0.6))' }} />
            <h1 style={{ fontSize: '1.8rem', fontWeight: 900, letterSpacing: '2px', color: '#fff', margin: 0 }}>
              PRO<span style={{ color: 'var(--neon-pink)', textShadow: '0 0 10px rgba(255, 0, 60, 0.6)' }}>PDF</span>
            </h1>
          </a>
          <nav style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
            <a href="/#features" className="nav-link" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 700, transition: 'color 0.2s', textTransform: 'uppercase', fontSize: '0.95rem', letterSpacing: '1px' }}>Capabilities</a>
            <a href="/#tools" className="nav-link" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 700, transition: 'color 0.2s', textTransform: 'uppercase', fontSize: '0.95rem', letterSpacing: '1px' }}>Tools</a>
            <a href="/#tools" className="btn btn-primary" style={{ padding: '0.6rem 1.75rem', fontSize: '0.95rem' }}>Initialize</a>
          </nav>
        </div>
      </header>
      
      <main className="animate-fade-in" style={{ flex: 1 }}>
        {children}
      </main>
      
      <footer style={{ 
        padding: '4rem 0', 
        borderTop: '1px solid var(--glass-border)',
        background: '#050505',
        marginTop: 'auto'
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', color: 'var(--neon-cyan)', marginBottom: '0.75rem', fontFamily: 'Orbitron', letterSpacing: '2px' }}>PROPDF // SYSTEM</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', fontFamily: 'Rajdhani' }}>Fully client-side PDF operations. Zero server telemetry.</p>
          </div>
          <div style={{ display: 'flex', gap: '2.5rem' }}>
            <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s', textTransform: 'uppercase', fontSize: '0.9rem', letterSpacing: '1px' }}>Privacy Protocol</a>
            <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s', textTransform: 'uppercase', fontSize: '0.9rem', letterSpacing: '1px' }}>Terms of Service</a>
            <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s', textTransform: 'uppercase', fontSize: '0.9rem', letterSpacing: '1px' }}>Status</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
