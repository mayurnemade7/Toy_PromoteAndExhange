import React, { useState } from 'react';
import { X, PlusCircle, Sparkles, Upload, Check, Image as ImageIcon } from 'lucide-react';
import { ravetSocieties, categoriesList, ageGroupsList } from '../data/ravetSocieties';
import confetti from 'canvas-confetti';

const presetImages = [
  { label: 'LEGO & Bricks', url: 'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?auto=format&fit=crop&w=800&q=80' },
  { label: 'Wooden Montessori', url: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&q=80' },
  { label: 'Action & Diecast Cars', url: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=800&q=80' },
  { label: 'Pretend Kitchen', url: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80' },
  { label: 'Board Games & Cards', url: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=800&q=80' },
  { label: 'Outdoor & Scooter', url: 'https://images.unsplash.com/photo-1511994298241-608e28f14fde?auto=format&fit=crop&w=800&q=80' }
];

export default function ListToyModal({ onClose, onAddToy }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('stem');
  const [ageGroup, setAgeGroup] = useState('3-5');
  const [society, setSociety] = useState('celestial_city');
  const [ownerName, setOwnerName] = useState('');
  const [condition, setCondition] = useState('Like New');
  const [points, setPoints] = useState(100);
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState(presetImages[0].url);
  const [customUrl, setCustomUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !ownerName.trim()) return;

    const selectedSocietyObj = ravetSocieties.find(s => s.id === society);
    const finalImage = customUrl.trim() ? customUrl : imageUrl;

    const newToy = {
      id: `toy-${Date.now()}`,
      title: title.trim(),
      category: category,
      ageGroup: ageGroup,
      society: society,
      societyName: selectedSocietyObj ? `${selectedSocietyObj.name}, Ravet` : 'Ravet, Pune',
      ownerName: ownerName.trim(),
      ownerAvatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(ownerName)}`,
      condition: condition,
      description: description.trim() || 'A great pre-loved toy in clean condition ready for neighbor exchange in Ravet.',
      points: Number(points) || 100,
      image: finalImage,
      tags: ['Listed By Parent', category.toUpperCase(), 'Ravet Swapper'],
      sanitizationStatus: 'Pending UV Inspection',
      viewsCount: 1,
      createdDate: new Date().toISOString().split('T')[0]
    };

    // Confetti animation
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.5 }
    });

    onAddToy(newToy);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '620px' }}>
        
        {/* Header */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', sticky: 'top', background: '#FFF' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '12px', background: 'var(--primary-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF' }}>
              <PlusCircle size={20} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.25rem', color: '#0F172A' }}>List a Toy for Swap</h2>
              <p style={{ fontSize: '0.78rem', color: '#64748B' }}>Share with Ravet parents & earn swap points</p>
            </div>
          </div>
          <button onClick={onClose} style={{ background: '#F1F5F9', border: 'none', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <X size={18} color="#64748B" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} style={{ padding: '24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            {/* Toy Title */}
            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>
                Toy Title / Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. LEGO City Fire Truck Set / Wooden Blocks"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1px solid #CBD5E1', fontSize: '0.88rem', outline: 'none' }}
              />
            </div>

            {/* Parent Name & Society */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>
                  Your Name (Owner) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sneha Joshi"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1px solid #CBD5E1', fontSize: '0.88rem', outline: 'none' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>
                  Your Ravet Society *
                </label>
                <select
                  value={society}
                  onChange={(e) => setSociety(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1px solid #CBD5E1', fontSize: '0.88rem', outline: 'none', background: '#FFF' }}
                >
                  {ravetSocieties.filter(s => s.id !== 'all').map((s) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Category & Age Group */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1px solid #CBD5E1', fontSize: '0.88rem', outline: 'none', background: '#FFF' }}
                >
                  {categoriesList.filter(c => c.id !== 'all').map((c) => (
                    <option key={c.id} value={c.id}>{c.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>
                  Age Group *
                </label>
                <select
                  value={ageGroup}
                  onChange={(e) => setAgeGroup(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1px solid #CBD5E1', fontSize: '0.88rem', outline: 'none', background: '#FFF' }}
                >
                  {ageGroupsList.filter(a => a.id !== 'all').map((a) => (
                    <option key={a.id} value={a.id}>{a.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Condition & Points Value */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>
                  Condition *
                </label>
                <select
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1px solid #CBD5E1', fontSize: '0.88rem', outline: 'none', background: '#FFF' }}
                >
                  <option value="Mint Condition">Mint Condition (Unused / Boxed)</option>
                  <option value="Like New">Like New (Gently Played)</option>
                  <option value="Good Condition">Good Condition (Minor Scuffs)</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>
                  Swap Points Value (Pts)
                </label>
                <input
                  type="number"
                  min="20"
                  max="500"
                  value={points}
                  onChange={(e) => setPoints(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1px solid #CBD5E1', fontSize: '0.88rem', outline: 'none' }}
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>
                Toy Description & Included Parts
              </label>
              <textarea
                rows="3"
                placeholder="Mention piece count, battery status, or special instructions for other parents..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1px solid #CBD5E1', fontSize: '0.88rem', outline: 'none' }}
              />
            </div>

            {/* Image Selector Presets & Custom URL */}
            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '6px' }}>
                Select Toy Photo (Presets or Custom URL)
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '10px' }}>
                {presetImages.map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() => { setImageUrl(img.url); setCustomUrl(''); }}
                    style={{
                      border: imageUrl === img.url && !customUrl ? '2px solid #FF5A5F' : '1px solid #E2E8F0',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      position: 'relative',
                      height: '64px'
                    }}
                  >
                    <img src={img.url} alt={img.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <span style={{ position: 'absolute', bottom: 0, insetX: 0, background: 'rgba(0,0,0,0.7)', color: '#FFF', fontSize: '0.68rem', textAlign: 'center', padding: '2px' }}>
                      {img.label}
                    </span>
                  </div>
                ))}
              </div>

              <input
                type="url"
                placeholder="Or paste custom image URL (https://...)"
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                style={{ width: '100%', padding: '8px 12px', borderRadius: '10px', border: '1px solid #CBD5E1', fontSize: '0.82rem', outline: 'none' }}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn-primary"
              style={{ width: '100%', padding: '14px', fontSize: '1rem', marginTop: '10px' }}
            >
              <PlusCircle size={18} />
              <span>Publish Toy Listing</span>
            </button>

          </div>
        </form>

      </div>
    </div>
  );
}
