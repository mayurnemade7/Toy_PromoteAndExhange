import React from 'react';
import { Ticket, X, CheckCircle2, Clock, ShieldCheck, MapPin, Trash2, ArrowRight } from 'lucide-react';

const statusSteps = ['Requested', 'Owner Accepted', 'UV Sanitizing', 'Ready for Pickup', 'Completed'];

export default function MyExchangesModal({ onClose, tickets, onUpdateTicketStatus, onDeleteTicket }) {
  
  const getStepIndex = (status) => {
    switch (status) {
      case 'Requested': return 0;
      case 'Owner Accepted': return 1;
      case 'UV Sanitizing': return 2;
      case 'Ready for Pickup': return 3;
      case 'Completed': return 4;
      default: return 0;
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '640px' }}>
        
        {/* Header */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#FFF' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '12px', background: 'var(--purple-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF' }}>
              <Ticket size={20} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.25rem', color: '#0F172A' }}>My Exchange Tickets Tracker</h2>
              <p style={{ fontSize: '0.78rem', color: '#64748B' }}>Track real-time status of your Ravet toy swap requests</p>
            </div>
          </div>
          <button onClick={onClose} style={{ background: '#F1F5F9', border: 'none', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <X size={18} color="#64748B" />
          </button>
        </div>

        {/* Body Content */}
        <div style={{ padding: '24px' }}>
          
          {tickets.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', background: '#F8FAFC', borderRadius: '20px', border: '1.5px dashed #CBD5E1' }}>
              <div style={{ fontSize: '42px', marginBottom: '8px' }}>🎟️</div>
              <h3 style={{ fontSize: '1.1rem', color: '#334155', marginBottom: '6px' }}>No Active Exchange Tickets</h3>
              <p style={{ fontSize: '0.85rem', color: '#64748B', maxWidth: '360px', margin: '0 auto 16px' }}>
                Explore the toy catalog or use the AI Matchmaker to submit your first toy exchange request!
              </p>
              <button onClick={onClose} className="btn-primary" style={{ padding: '10px 20px', fontSize: '0.85rem' }}>
                Browse Toys Catalog
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {tickets.map((t) => {
                const currentStepIdx = getStepIndex(t.status);

                return (
                  <div
                    key={t.id}
                    style={{
                      background: '#FFFFFF',
                      borderRadius: '20px',
                      border: '1px solid #E2E8F0',
                      padding: '20px',
                      boxShadow: '0 4px 14px rgba(0,0,0,0.03)'
                    }}
                  >
                    {/* Top Ticket Header */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
                      <div>
                        <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#8B5CF6', background: '#F3E8FF', padding: '2px 8px', borderRadius: '99px', marginRight: '8px' }}>
                          TICKET #{t.id}
                        </span>
                        <span style={{ fontSize: '0.75rem', color: '#64748B' }}>{t.createdTime}</span>
                      </div>

                      <button
                        onClick={() => onDeleteTicket(t.id)}
                        style={{ background: '#FEF2F2', border: 'none', color: '#EF4444', padding: '4px 10px', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                      >
                        <Trash2 size={12} /> Cancel Ticket
                      </button>
                    </div>

                    {/* Toy Thumbnail & Details */}
                    <div style={{ display: 'flex', gap: '14px', marginBottom: '16px', alignItems: 'center' }}>
                      <img src={t.toyImage} alt={t.toyTitle} style={{ width: '64px', height: '64px', borderRadius: '14px', objectFit: 'cover' }} />
                      <div>
                        <h4 style={{ fontSize: '0.95rem', color: '#0F172A', fontWeight: 700 }}>{t.toyTitle}</h4>
                        <div style={{ fontSize: '0.78rem', color: '#475569', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <MapPin size={12} color="#2563EB" /> {t.societyName} (Owner: {t.ownerName})
                        </div>
                        <div style={{ fontSize: '0.76rem', color: '#059669', fontWeight: 600, marginTop: '2px' }}>
                          Offer: {t.offerSummary}
                        </div>
                      </div>
                    </div>

                    {/* Step Timeline Indicator */}
                    <div style={{ background: '#F8FAFC', padding: '14px', borderRadius: '16px', marginBottom: '14px' }}>
                      <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '10px' }}>
                        Live Progress Status:
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
                        {statusSteps.map((step, idx) => {
                          const isDone = idx <= currentStepIdx;
                          const isCurrent = idx === currentStepIdx;

                          return (
                            <div key={idx} style={{ textAlign: 'center', flex: 1, position: 'relative', zIndex: 1 }}>
                              <div style={{
                                width: '26px',
                                height: '26px',
                                borderRadius: '50%',
                                background: isDone ? '#10B981' : '#E2E8F0',
                                color: isDone ? '#FFF' : '#94A3B8',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 4px',
                                fontSize: '0.72rem',
                                fontWeight: 700,
                                boxShadow: isCurrent ? '0 0 0 4px rgba(16, 185, 129, 0.2)' : 'none'
                              }}>
                                {isDone ? '✓' : idx + 1}
                              </div>
                              <span style={{ fontSize: '0.68rem', fontWeight: isCurrent ? 700 : 500, color: isCurrent ? '#047857' : '#64748B', display: 'block' }}>
                                {step}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Action Step Simulation Bar */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '10px', borderTop: '1px dashed #E2E8F0' }}>
                      <span style={{ fontSize: '0.78rem', color: '#64748B' }}>
                        Pickup Slot: <strong>{t.pickupSlot}</strong>
                      </span>

                      {currentStepIdx < statusSteps.length - 1 && (
                        <button
                          onClick={() => onUpdateTicketStatus(t.id, statusSteps[currentStepIdx + 1])}
                          style={{
                            background: '#EFF6FF',
                            border: '1px solid #BFDBFE',
                            color: '#1D4ED8',
                            padding: '6px 12px',
                            borderRadius: '99px',
                            fontSize: '0.76rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <span>Advance Status</span>
                          <ArrowRight size={12} />
                        </button>
                      )}
                    </div>

                  </div>
                );
              })}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
