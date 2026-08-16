import React, { useState } from 'react';
import { instagramReelsData } from '../data/instagramReels';
import { Play, Heart, MessageCircle, Eye, ExternalLink, Instagram, Sparkles, Volume2, VolumeX } from 'lucide-react';

export default function IGReelSection() {
  const [activeReel, setActiveReel] = useState(null);
  const [isMuted, setIsMuted] = useState(true);

  return (
    <section style={{ padding: '24px 0 36px' }}>
      <div className="app-container">
        
        {/* Section Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <Instagram size={20} color="#E1306C" />
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#E1306C', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Instagram Highlights
              </span>
            </div>
            <h2 style={{ fontSize: '1.75rem', color: '#0F172A' }}>
              Ravet Kids in Action & Toy Sanitization Reels
            </h2>
          </div>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#E1306C', fontWeight: 700, textDecoration: 'none', fontSize: '0.9rem', background: '#FDF2F8', padding: '8px 16px', borderRadius: '99px', border: '1px solid #FBCFE8' }}
          >
            <span>Follow @ojastoyexchange</span>
            <ExternalLink size={14} />
          </a>
        </div>

        {/* Reels Horizontal Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '18px'
        }}>
          {instagramReelsData.map((reel) => (
            <div
              key={reel.id}
              className="reel-card-shadow"
              onClick={() => setActiveReel(reel)}
              style={{
                borderRadius: '24px',
                overflow: 'hidden',
                position: 'relative',
                height: '380px',
                cursor: 'pointer',
                background: '#0F172A'
              }}
            >
              {/* Thumbnail Image */}
              <img
                src={reel.thumbnail}
                alt={reel.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
              />

              {/* Gradient Overlay */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.2) 60%, rgba(0,0,0,0.1) 100%)'
              }} />

              {/* Play Badge Center */}
              <div style={{
                position: 'absolute',
                top: '40%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: 'rgba(255, 90, 95, 0.9)',
                backdropFilter: 'blur(6px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFF',
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)'
              }}>
                <Play size={26} style={{ fill: '#FFF', marginLeft: '3px' }} />
              </div>

              {/* IG Tag Header */}
              <div style={{ position: 'absolute', top: '16px', left: '16px', right: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', color: '#FFF', padding: '4px 10px', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 600 }}>
                  {reel.society}
                </span>
                <Instagram size={18} color="#FFF" />
              </div>

              {/* Reel Info Footer */}
              <div style={{ position: 'absolute', bottom: '16px', left: '16px', right: '16px', color: '#FFF' }}>
                <div style={{ fontSize: '0.78rem', color: '#FFD54F', fontWeight: 700, marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Sparkles size={12} />
                  <span>{reel.toyTag}</span>
                </div>
                <h3 style={{ fontSize: '0.92rem', fontWeight: 600, color: '#F8FAFC', lineHeight: 1.3, marginBottom: '12px' }}>
                  {reel.title}
                </h3>

                {/* Stats Bar */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '0.78rem', color: '#CBD5E1' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Heart size={14} color="#FF5A5F" style={{ fill: '#FF5A5F' }} />
                    {reel.likes}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <MessageCircle size={14} />
                    {reel.comments}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', marginLeft: 'auto' }}>
                    <Eye size={14} />
                    {reel.views}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Video Player Modal */}
        {activeReel && (
          <div className="modal-overlay" onClick={() => setActiveReel(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '440px', background: '#0F172A', color: '#FFF', borderRadius: '24px', overflow: 'hidden' }}>
              
              <div style={{ position: 'relative', height: '520px', background: '#000' }}>
                <video
                  src={activeReel.videoUrl}
                  poster={activeReel.thumbnail}
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />

                {/* Top overlay controls */}
                <div style={{ position: 'absolute', top: '16px', left: '16px', right: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ background: 'rgba(0,0,0,0.6)', color: '#FFF', padding: '6px 12px', borderRadius: '99px', fontSize: '0.8rem', fontWeight: 700 }}>
                    {activeReel.handle}
                  </span>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      style={{ background: 'rgba(0,0,0,0.6)', border: 'none', color: '#FFF', padding: '8px', borderRadius: '50%', cursor: 'pointer' }}
                    >
                      {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                    </button>
                    <button
                      onClick={() => setActiveReel(null)}
                      style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: '#FFF', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', fontSize: '1.1rem' }}
                    >
                      ✕
                    </button>
                  </div>
                </div>

                {/* Bottom Caption Overlay */}
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px', background: 'linear-gradient(to top, rgba(0,0,0,0.95), transparent)' }}>
                  <p style={{ fontSize: '0.85rem', color: '#E2E8F0', lineHeight: 1.4, marginBottom: '12px' }}>
                    {activeReel.caption}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.82rem', color: '#CBD5E1' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Heart size={16} color="#FF5A5F" style={{ fill: '#FF5A5F' }} /> {activeReel.likes}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <MessageCircle size={16} /> {activeReel.comments}
                    </span>
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
