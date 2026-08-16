import React, { useState, useRef, useEffect } from 'react';
import { instagramReelsData } from '../data/instagramReels';
import {
  Play, Heart, MessageCircle, Eye, ExternalLink,
  Instagram, Sparkles, Volume2, VolumeX, Bookmark,
  ChevronUp, ChevronDown, Share2, Check
} from 'lucide-react';

export default function IGReelSection() {
  const [activeReelIndex, setActiveReelIndex] = useState(null);
  const [isMuted, setIsMuted] = useState(true);
  const [likedReels, setLikedReels] = useState({});
  const [savedReels, setSavedReels] = useState({});
  const [copiedLink, setCopiedLink] = useState(false);

  // Swipe gesture tracking state
  const touchStartY = useRef(0);
  const touchEndY = useRef(0);

  const activeReel = activeReelIndex !== null ? instagramReelsData[activeReelIndex] : null;

  const toggleLike = (id, e) => {
    if (e) e.stopPropagation();
    setLikedReels((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleSave = (id, e) => {
    if (e) e.stopPropagation();
    setSavedReels((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleNextReel = () => {
    if (activeReelIndex !== null && activeReelIndex < instagramReelsData.length - 1) {
      setActiveReelIndex(activeReelIndex + 1);
    }
  };

  const handlePrevReel = () => {
    if (activeReelIndex !== null && activeReelIndex > 0) {
      setActiveReelIndex(activeReelIndex - 1);
    }
  };

  // Keyboard navigation (ArrowUp / ArrowDown)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeReelIndex === null) return;
      if (e.key === 'ArrowDown') handleNextReel();
      if (e.key === 'ArrowUp') handlePrevReel();
      if (e.key === 'Escape') setActiveReelIndex(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeReelIndex]);

  // Touch Swipe Handlers for vertical video reel navigation
  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e) => {
    touchEndY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = () => {
    const diffY = touchStartY.current - touchEndY.current;
    if (Math.abs(diffY) > 50) {
      if (diffY > 0) {
        handleNextReel(); // Swiped up -> next reel
      } else {
        handlePrevReel(); // Swiped down -> prev reel
      }
    }
  };

  const handleShare = (reel) => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <section style={{ padding: '24px 0 36px' }}>
      <div className="app-container">

        {/* Section Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <Instagram size={20} color="#E1306C" />
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#E1306C', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Instagram Reel Feed & Sanitization
              </span>
            </div>
            <h2 style={{ fontSize: '1.75rem', color: '#0F172A' }}>
              Ravet Kids in Action & Interactive Video Feed
            </h2>
          </div>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#E1306C',
              fontWeight: 700, textDecoration: 'none', fontSize: '0.9rem', background: '#FDF2F8',
              padding: '8px 16px', borderRadius: '99px', border: '1px solid #FBCFE8'
            }}
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
          {instagramReelsData.map((reel, idx) => {
            const isLiked = likedReels[reel.id];
            const isSaved = savedReels[reel.id];
            return (
              <div
                key={reel.id}
                className="reel-card-shadow"
                onClick={() => setActiveReelIndex(idx)}
                style={{
                  borderRadius: '24px',
                  overflow: 'hidden',
                  position: 'relative',
                  height: '380px',
                  cursor: 'pointer',
                  background: '#0F172A',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease'
                }}
              >
                {/* Thumbnail Image */}
                <img
                  src={reel.thumbnail}
                  alt={reel.title}
                  loading="lazy"
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

                  {/* Stats Bar with Interactive Heart / Save */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '0.78rem', color: '#CBD5E1' }}>
                    <button
                      onClick={(e) => toggleLike(reel.id, e)}
                      style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: '#CBD5E1', display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                      <Heart size={15} color={isLiked ? '#FF5A5F' : '#CBD5E1'} style={{ fill: isLiked ? '#FF5A5F' : 'none' }} />
                      <span>{isLiked ? '1.5K' : reel.likes}</span>
                    </button>

                    <button
                      onClick={(e) => toggleSave(reel.id, e)}
                      style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: '#CBD5E1', display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                      <Bookmark size={15} color={isSaved ? '#67E8F9' : '#CBD5E1'} style={{ fill: isSaved ? '#67E8F9' : 'none' }} />
                    </button>

                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', marginLeft: 'auto' }}>
                      <Eye size={14} />
                      {reel.views}
                    </span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Vertical Swipe Video Reel Modal */}
        {activeReel && (
          <div
            className="modal-overlay"
            onClick={() => setActiveReelIndex(null)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: '440px', background: '#0F172A', color: '#FFF',
                borderRadius: '24px', overflow: 'hidden', position: 'relative'
              }}
            >

              <div style={{ position: 'relative', height: '540px', background: '#000' }}>
                <video
                  key={activeReel.id}
                  src={activeReel.videoUrl}
                  poster={activeReel.thumbnail}
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  preload="metadata"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />

                {/* Vertical Swipe Hint Overlay */}
                <div style={{
                  position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
                  display: 'flex', flexDirection: 'column', gap: '8px', zIndex: 10
                }}>
                  <button
                    onClick={handlePrevReel}
                    disabled={activeReelIndex === 0}
                    style={{
                      background: 'rgba(0,0,0,0.6)', border: 'none', color: '#FFF',
                      width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: activeReelIndex === 0 ? 0.3 : 1
                    }}
                  >
                    <ChevronUp size={20} />
                  </button>
                  <button
                    onClick={handleNextReel}
                    disabled={activeReelIndex === instagramReelsData.length - 1}
                    style={{
                      background: 'rgba(0,0,0,0.6)', border: 'none', color: '#FFF',
                      width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: activeReelIndex === instagramReelsData.length - 1 ? 0.3 : 1
                    }}
                  >
                    <ChevronDown size={20} />
                  </button>
                </div>

                {/* Top Overlay Controls */}
                <div style={{ position: 'absolute', top: '16px', left: '16px', right: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10 }}>
                  <span style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', color: '#FFF', padding: '6px 12px', borderRadius: '99px', fontSize: '0.8rem', fontWeight: 700 }}>
                    {activeReel.handle}
                  </span>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      style={{ background: 'rgba(0,0,0,0.6)', border: 'none', color: '#FFF', padding: '8px', borderRadius: '50%', cursor: 'pointer' }}
                      aria-label="Toggle Sound"
                    >
                      {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                    </button>
                    <button
                      onClick={() => setActiveReelIndex(null)}
                      style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: '#FFF', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', fontSize: '1.1rem' }}
                    >
                      ✕
                    </button>
                  </div>
                </div>

                {/* Bottom Caption & Action Buttons */}
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px', background: 'linear-gradient(to top, rgba(0,0,0,0.95), transparent)', zIndex: 10 }}>
                  <p style={{ fontSize: '0.85rem', color: '#E2E8F0', lineHeight: 1.4, marginBottom: '12px' }}>
                    {activeReel.caption}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.85rem', color: '#CBD5E1' }}>
                    <button
                      onClick={() => toggleLike(activeReel.id)}
                      style={{ background: 'none', border: 'none', color: '#FFF', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}
                    >
                      <Heart size={18} color={likedReels[activeReel.id] ? '#FF5A5F' : '#FFF'} style={{ fill: likedReels[activeReel.id] ? '#FF5A5F' : 'none' }} />
                      <span>{likedReels[activeReel.id] ? 'Liked!' : activeReel.likes}</span>
                    </button>

                    <button
                      onClick={() => toggleSave(activeReel.id)}
                      style={{ background: 'none', border: 'none', color: '#FFF', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}
                    >
                      <Bookmark size={18} color={savedReels[activeReel.id] ? '#67E8F9' : '#FFF'} style={{ fill: savedReels[activeReel.id] ? '#67E8F9' : 'none' }} />
                      <span>{savedReels[activeReel.id] ? 'Saved' : 'Save'}</span>
                    </button>

                    <button
                      onClick={() => handleShare(activeReel)}
                      style={{ background: 'none', border: 'none', color: '#FFF', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', marginLeft: 'auto', fontWeight: 600 }}
                    >
                      {copiedLink ? <Check size={16} color="#4ADE80" /> : <Share2 size={16} />}
                      <span>{copiedLink ? 'Link Copied' : 'Share'}</span>
                    </button>
                  </div>

                  <div style={{ fontSize: '0.72rem', color: '#94A3B8', textAlign: 'center', marginTop: '12px' }}>
                    💡 Swipe Up / Down or use ↑ ↓ keys to view next video reel
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
