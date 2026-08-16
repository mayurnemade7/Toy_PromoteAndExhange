import React from 'react';
import { Sparkles, PlusCircle, Ticket, Search, HeartHandshake, ShieldCheck, Compass } from 'lucide-react';

export default function Navbar({
  searchTerm,
  setSearchTerm,
  onOpenListModal,
  onOpenAIMatchmaker,
  onOpenTicketsModal,
  activeTicketsCount
}) {
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 1000, background: 'rgba(255, 255, 255, 0.92)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(226, 232, 240, 0.8)' }}>
      <div className="app-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 20px', gap: '16px', flexWrap: 'wrap' }}>
        
        {/* Brand Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '14px',
            background: 'var(--primary-gradient)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFF',
            fontSize: '22px',
            boxShadow: '0 4px 12px rgba(255, 90, 95, 0.3)'
          }}>
            🧩
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', fontFamily: 'var(--font-heading)' }}>
                Ojas Toy Exchange
              </span>
              <span style={{ background: '#FFF1F2', color: '#E11D48', border: '1px solid #FECDD3', padding: '2px 8px', borderRadius: '99px', fontSize: '0.7rem', fontWeight: 700 }}>
                RAVET, PUNE
              </span>
            </div>
            <p style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 500 }}>
              Swap Toys • Share Joy • Save Planet
            </p>
          </div>
        </div>

        {/* Global Search Bar */}
        <div style={{ flex: '1 1 240px', maxWidth: '380px', position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
          <input
            type="text"
            placeholder="Search toys by name, age, category or society..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 14px 10px 40px',
              borderRadius: '99px',
              border: '1px solid #E2E8F0',
              background: '#F8FAFC',
              fontSize: '0.88rem',
              outline: 'none',
              transition: 'all 0.2s ease'
            }}
          />
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          
          {/* AI Matchmaker Trigger */}
          <button
            onClick={onOpenAIMatchmaker}
            className="btn-purple"
            style={{ padding: '9px 18px', fontSize: '0.85rem' }}
          >
            <Sparkles size={16} />
            <span>AI Matchmaker</span>
          </button>

          {/* List a Toy Trigger */}
          <button
            onClick={onOpenListModal}
            className="btn-primary"
            style={{ padding: '9px 18px', fontSize: '0.85rem' }}
          >
            <PlusCircle size={16} />
            <span>List a Toy</span>
          </button>

          {/* Exchange Tickets Modal Trigger */}
          <button
            onClick={onOpenTicketsModal}
            className="btn-secondary"
            style={{ padding: '9px 16px', fontSize: '0.85rem', position: 'relative' }}
          >
            <Ticket size={16} color="#8B5CF6" />
            <span>My Tickets</span>
            {activeTicketsCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-6px',
                right: '-6px',
                background: '#EF4444',
                color: '#FFF',
                fontSize: '0.7rem',
                fontWeight: 800,
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 6px rgba(239, 68, 68, 0.4)'
              }}>
                {activeTicketsCount}
              </span>
            )}
          </button>

        </div>
      </div>
    </header>
  );
}
