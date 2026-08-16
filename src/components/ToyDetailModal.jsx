import React, { useState } from 'react';
import { ShieldCheck, MapPin, User, HeartHandshake, X, Sparkles, Check, Clock, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ToyDetailModal({ toy, onClose, onSubmitExchangeTicket, userListedToys }) {
  const [parentName, setParentName] = useState('');
  const [selectedOfferToyId, setSelectedOfferToyId] = useState('points');
  const [pickupSlot, setPickupSlot] = useState('Weekend Morning (10 AM - 12 PM)');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!toy) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!parentName.trim()) return;

    setIsSubmitting(true);

    // Fire confetti micro-interaction
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    const offerToyName = selectedOfferToyId === 'points' 
      ? `${toy.points} Eco Points`
      : userListedToys.find(t => t.id === selectedOfferToyId)?.title || 'Direct Exchange Toy';

    onSubmitExchangeTicket({
      toyId: toy.id,
      toyTitle: toy.title,
      toyImage: toy.image,
      ownerName: toy.ownerName,
      societyName: toy.societyName,
      requesterName: parentName,
      offerSummary: offerToyName,
      pickupSlot: pickupSlot,
      notes: notes,
      status: 'Requested',
      createdTime: 'Just Now'
    });

    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '640px' }}>
        
        {/* Header Bar */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, background: '#FFF', zIndex: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge-eco">
              <ShieldCheck size={14} color="#059669" /> Disinfected Guarantee
            </span>
            <span className="badge-pts">{toy.points} Pts</span>
          </div>
          <button onClick={onClose} style={{ background: '#F1F5F9', border: 'none', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <X size={18} color="#64748B" />
          </button>
        </div>

        {/* Content Body */}
        <div style={{ padding: '24px' }}>
          
          {/* Main Toy Image Showcase */}
          <div style={{ borderRadius: '20px', overflow: 'hidden', height: '260px', marginBottom: '20px', background: '#F8FAFC' }}>
            <img src={toy.image} alt={toy.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          {/* Title & Age / Location Tags */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
              <span style={{ background: '#F3E8FF', color: '#7E22CE', padding: '3px 12px', borderRadius: '99px', fontSize: '0.8rem', fontWeight: 700 }}>
                Age {toy.ageGroup} Years
              </span>
              <span className="badge-society">
                <MapPin size={12} /> {toy.societyName}
              </span>
              <span style={{ background: '#F1F5F9', color: '#475569', padding: '3px 10px', borderRadius: '99px', fontSize: '0.78rem', fontWeight: 600 }}>
                Condition: {toy.condition}
              </span>
            </div>
            <h2 style={{ fontSize: '1.5rem', color: '#0F172A', lineHeight: 1.25 }}>
              {toy.title}
            </h2>
          </div>

          {/* Description */}
          <p style={{ fontSize: '0.92rem', color: '#475569', lineHeight: 1.6, marginBottom: '20px' }}>
            {toy.description}
          </p>

          {/* Hygiene & Sanitization Guarantee Box */}
          <div style={{ background: '#ECFDF5', padding: '16px', borderRadius: '16px', border: '1px solid #A7F3D0', marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <ShieldCheck size={18} color="#059669" />
              <h4 style={{ fontSize: '0.9rem', color: '#065F46', fontWeight: 700 }}>
                Ojas 4-Step Sanitization Status
              </h4>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '0.8rem', color: '#047857' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Check size={14} color="#059669" /> Botanical Organic Bio-Wash
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Check size={14} color="#059669" /> UV-C Deep Sterilized
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Check size={14} color="#059669" /> Safety & Parts Checked
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Check size={14} color="#059669" /> Hygienically Eco-Sealed
              </div>
            </div>
          </div>

          {/* Owner Info Box */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', background: '#F8FAFC', borderRadius: '16px', border: '1px solid #E2E8F0', marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <img src={toy.ownerAvatar} alt={toy.ownerName} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
              <div>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#1E293B' }}>{toy.ownerName}</div>
                <div style={{ fontSize: '0.78rem', color: '#64748B' }}>Verified Resident • {toy.societyName}</div>
              </div>
            </div>
            <span style={{ fontSize: '0.75rem', background: '#DBEAFE', color: '#1E40AF', padding: '4px 10px', borderRadius: '99px', fontWeight: 700 }}>
              Trust Score 99%
            </span>
          </div>

          {/* Swap Ticket Request Form */}
          <form onSubmit={handleSubmit} style={{ borderTop: '1px solid #E2E8F0', paddingTop: '20px' }}>
            <h3 style={{ fontSize: '1.1rem', color: '#0F172A', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <HeartHandshake size={18} color="#FF5A5F" /> Submit Exchange Ticket Request
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>
                  Your Name (Parent Name in Ravet):
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Pooja Sharma / Sameer Kulkarni"
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1px solid #CBD5E1', fontSize: '0.88rem', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>
                  Choose Exchange Offer Mode:
                </label>
                <select
                  value={selectedOfferToyId}
                  onChange={(e) => setSelectedOfferToyId(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1px solid #CBD5E1', fontSize: '0.88rem', outline: 'none', background: '#FFF' }}
                >
                  <option value="points">Redeem Eco Points ({toy.points} Points)</option>
                  {userListedToys.map((t) => (
                    <option key={t.id} value={t.id}>
                      Direct Toy Swap: {t.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>
                  Preferred Pickup Slot in Ravet:
                </label>
                <select
                  value={pickupSlot}
                  onChange={(e) => setPickupSlot(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1px solid #CBD5E1', fontSize: '0.88rem', outline: 'none', background: '#FFF' }}
                >
                  <option value="Weekend Morning (10 AM - 12 PM)">Weekend Morning (10 AM - 12 PM)</option>
                  <option value="Weekday Evening (6 PM - 8 PM)">Weekday Evening (6 PM - 8 PM)</option>
                  <option value="Society Clubhouse Dropbox">Society Clubhouse Dropbox</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>
                  Friendly Note for {toy.ownerName}:
                </label>
                <textarea
                  rows="2"
                  placeholder="Hi! My kid would love this puzzle. Happy to swap anytime..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1px solid #CBD5E1', fontSize: '0.88rem', outline: 'none' }}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary"
                style={{ width: '100%', padding: '14px', marginTop: '10px', fontSize: '1rem' }}
              >
                <HeartHandshake size={18} />
                <span>Confirm & Send Swap Ticket</span>
              </button>

            </div>
          </form>

        </div>

      </div>
    </div>
  );
}
