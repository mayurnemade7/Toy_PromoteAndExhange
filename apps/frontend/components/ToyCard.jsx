import React from 'react';
import { MapPin, ShieldCheck, HeartHandshake, Eye, Sparkles, User, Tag } from 'lucide-react';

export default function ToyCard({ toy, onSelectToy, onRequestSwap }) {
  return (
    <div style={{
      background: '#FFFFFF',
      borderRadius: '24px',
      border: '1px solid #E2E8F0',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
      position: 'relative'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-6px)';
      e.currentTarget.style.boxShadow = '0 18px 30px rgba(0, 0, 0, 0.08)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.04)';
    }}
    >
      {/* Image Header Container */}
      <div style={{ position: 'relative', height: '210px', overflow: 'hidden', background: '#F1F5F9', cursor: 'pointer' }} onClick={() => onSelectToy(toy)}>
        <img
          src={toy.image}
          alt={toy.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1.0)'}
        />
        
        {/* Top Badges */}
        <div style={{ position: 'absolute', top: '12px', left: '12px', right: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="badge-eco" style={{ backdropFilter: 'blur(8px)', background: 'rgba(236, 253, 245, 0.95)' }}>
            <ShieldCheck size={13} color="#059669" />
            {toy.sanitizationStatus || 'UV-Disinfected'}
          </span>
          <span className="badge-pts">
            {toy.points} Pts
          </span>
        </div>

        {/* Condition Tag */}
        <div style={{ position: 'absolute', bottom: '12px', left: '12px' }}>
          <span style={{ background: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(6px)', color: '#FFF', padding: '3px 10px', borderRadius: '99px', fontSize: '0.72rem', fontWeight: 600 }}>
            {toy.condition}
          </span>
        </div>
      </div>

      {/* Card Content Body */}
      <div style={{ padding: '18px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
        
        <div>
          {/* Age Tag & Society Tag */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
            <span style={{ background: '#F3E8FF', color: '#7E22CE', padding: '2px 10px', borderRadius: '99px', fontSize: '0.74rem', fontWeight: 700 }}>
              Age {toy.ageGroup} Yrs
            </span>
            <span className="badge-society">
              <MapPin size={11} />
              {toy.societyName}
            </span>
          </div>

          {/* Title */}
          <h3
            onClick={() => onSelectToy(toy)}
            style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0F172A', lineHeight: 1.35, marginBottom: '8px', cursor: 'pointer' }}
          >
            {toy.title}
          </h3>

          {/* Short Description */}
          <p style={{ fontSize: '0.82rem', color: '#64748B', lineHeight: 1.45, marginBottom: '14px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {toy.description}
          </p>
        </div>

        {/* Card Footer: Owner Info & Action Buttons */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid #F1F5F9', marginBottom: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <img
                src={toy.ownerAvatar}
                alt={toy.ownerName}
                style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover', border: '1.5px solid #E2E8F0' }}
              />
              <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#475569' }}>
                {toy.ownerName}
              </span>
            </div>
            <span style={{ fontSize: '0.74rem', color: '#94A3B8' }}>
              {toy.viewsCount || 45} views
            </span>
          </div>

          {/* Buttons */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <button
              onClick={() => onSelectToy(toy)}
              className="btn-secondary"
              style={{ padding: '8px 12px', fontSize: '0.8rem', width: '100%' }}
            >
              <Eye size={14} />
              <span>Details</span>
            </button>
            <button
              onClick={() => onRequestSwap(toy)}
              className="btn-primary"
              style={{ padding: '8px 12px', fontSize: '0.8rem', width: '100%' }}
            >
              <HeartHandshake size={14} />
              <span>Swap</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
