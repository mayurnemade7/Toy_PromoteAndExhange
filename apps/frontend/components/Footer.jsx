import React from 'react';
import { Heart, MapPin, ShieldCheck, Instagram, Mail, Phone, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ background: '#0F172A', color: '#94A3B8', paddingTop: '50px', paddingBottom: '30px', borderTop: '1px solid #1E293B' }}>
      <div className="app-container">
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '32px',
          marginBottom: '40px'
        }}>
          
          {/* Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '12px',
                background: 'var(--primary-gradient)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFF',
                fontSize: '18px'
              }}>
                🧩
              </div>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFF', fontFamily: 'var(--font-heading)' }}>
                Ojas Toy Exchange
              </span>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#94A3B8', lineHeight: 1.6, marginBottom: '16px' }}>
              Ravet's premiere hyper-local eco-friendly toy exchange platform. Empowering parents to swap disinfected toys, reduce plastic waste, and nurture happy kids.
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" style={{ background: '#1E293B', color: '#FFF', padding: '8px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Instagram size={18} />
              </a>
              <a href="mailto:hello@ojastoyexchange.in" style={{ background: '#1E293B', color: '#FFF', padding: '8px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Ravet Societies Served */}
          <div>
            <h4 style={{ color: '#FFF', fontSize: '0.95rem', fontWeight: 700, marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Ravet Societies
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><MapPin size={12} color="#FF5A5F" /> Celestial City Phase 1 & 2</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><MapPin size={12} color="#FF5A5F" /> Rohan Ananta</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><MapPin size={12} color="#FF5A5F" /> Urban Skyline Ravet</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><MapPin size={12} color="#FF5A5F" /> Runwal Gardens / Kiwale</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><MapPin size={12} color="#FF5A5F" /> GK Rosewoods & Silver Gracia</li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: '#FFF', fontSize: '0.95rem', fontWeight: 700, marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Platform Features
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>Disinfected Toy Feed</li>
              <li>Gemini AI Matchmaker</li>
              <li>4-Step UV Sterilization Standard</li>
              <li>Exchange Ticket Tracking</li>
              <li>Community Eco Impact Metrics</li>
            </ul>
          </div>

          {/* Contact & Location */}
          <div>
            <h4 style={{ color: '#FFF', fontSize: '0.95rem', fontWeight: 700, marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Ravet Hub Office
            </h4>
            <p style={{ fontSize: '0.84rem', lineHeight: 1.5, color: '#94A3B8', marginBottom: '10px' }}>
              Ojas Toy Exchange Hub, Near BRTS Corridor, Ravet, Pimpri-Chinchwad, Pune 411044.
            </p>
            <div style={{ fontSize: '0.82rem', color: '#10B981', fontWeight: 700 }}>
              🟢 Pickup & Dropbox Open Daily 9 AM - 8 PM
            </div>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div style={{
          paddingTop: '24px',
          borderTop: '1px solid #1E293B',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          fontSize: '0.78rem'
        }}>
          <div>
            © {new Date().getFullYear()} Ojas Toy Exchange. Built for Ravet & PCMC Pune Parents with <Heart size={12} color="#FF5A5F" style={{ fill: '#FF5A5F', display: 'inline', margin: '0 2px' }} />
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <span>Privacy Policy</span>
            <span>Safety Terms</span>
            <span>Hygiene Guidelines</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
