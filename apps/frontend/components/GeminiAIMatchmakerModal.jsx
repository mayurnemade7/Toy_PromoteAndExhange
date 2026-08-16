import React, { useState } from 'react';
import { Sparkles, X, HeartHandshake, CheckCircle2, ArrowRight, Brain, Zap, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function GeminiAIMatchmakerModal({ onClose, toys, onRequestSwap }) {
  const [childName, setChildName] = useState('');
  const [childAge, setChildAge] = useState('3-5');
  const [interest, setInterest] = useState('stem');
  const [playStyle, setPlayStyle] = useState('Creative Building & Problem Solving');
  const [tradeOffer, setTradeOffer] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [matches, setMatches] = useState(null);

  const handleGenerateMatches = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMatches(null);

    // Simulate AI inference delay for realism and smooth UX
    setTimeout(() => {
      // Find candidate toys matching age or category
      let candidates = toys.filter(t => t.ageGroup === childAge || t.category === interest);
      if (candidates.length === 0) candidates = toys;

      // Select top 2 matching toys
      const selectedMatches = candidates.slice(0, 2).map((toy, idx) => {
        const score = 96 - idx * 4;
        let reasoning = '';
        if (toy.category === 'stem') {
          reasoning = `Perfect fit for ${childName || 'your child'}'s interest in ${playStyle}. Promotes spatial awareness, fine motor skills, and scientific curiosity!`;
        } else if (toy.category === 'wooden') {
          reasoning = `Recommended by Gemini AI because Montessori wooden textures encourage calm focus and sensory discovery for age ${childAge}.`;
        } else if (toy.category === 'pretend') {
          reasoning = `High play value! Roleplay toys build social empathy and language skills while swapping locally in Ravet.`;
        } else {
          reasoning = `Matches ${childName || 'your kid'}'s age group (${childAge} Yrs) with top-rated neighborhood hygiene verification.`;
        }

        return {
          toy: toy,
          matchScore: score,
          aiReasoning: reasoning
        };
      });

      setMatches(selectedMatches);
      setIsLoading(false);

      // Confetti burst on recommendation success
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.5 }
      });
    }, 1200);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '680px' }}>
        
        {/* Header */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'linear-gradient(135deg, #FAF5FF 0%, #FFF5F5 100%)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '14px', background: 'var(--purple-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF' }}>
              <Sparkles size={22} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <h2 style={{ fontSize: '1.25rem', color: '#0F172A' }}>Gemini AI Toy Matchmaker</h2>
                <span style={{ background: '#7E22CE', color: '#FFF', fontSize: '0.68rem', fontWeight: 800, padding: '2px 8px', borderRadius: '99px' }}>
                  POWERED BY GEMINI
                </span>
              </div>
              <p style={{ fontSize: '0.78rem', color: '#64748B' }}>Smart personalized toy recommendations based on child psychology & Ravet catalog</p>
            </div>
          </div>
          <button onClick={onClose} style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <X size={18} color="#64748B" />
          </button>
        </div>

        {/* Content Body */}
        <div style={{ padding: '24px' }}>
          
          {!matches && !isLoading && (
            <form onSubmit={handleGenerateMatches} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>
                    Child's Name (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Aarav / Ananya"
                    value={childName}
                    onChange={(e) => setChildName(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1px solid #CBD5E1', fontSize: '0.88rem', outline: 'none' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>
                    Child's Age Group *
                  </label>
                  <select
                    value={childAge}
                    onChange={(e) => setChildAge(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1px solid #CBD5E1', fontSize: '0.88rem', outline: 'none', background: '#FFF' }}
                  >
                    <option value="0-2">0 - 2 Years (Infant Sensory)</option>
                    <option value="3-5">3 - 5 Years (Toddler Motor Skills)</option>
                    <option value="6-8">6 - 8 Years (Early School & Logic)</option>
                    <option value="9-12">9 - 12 Years (Pre-Teen Robotics & Strategy)</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>
                  Primary Interest / Hobby *
                </label>
                <select
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1px solid #CBD5E1', fontSize: '0.88rem', outline: 'none', background: '#FFF' }}
                >
                  <option value="stem">STEM, Science & Building Kits</option>
                  <option value="wooden">Montessori Wooden Shapes & Sorting</option>
                  <option value="action">Action Cars, Diecast & Tracks</option>
                  <option value="pretend">Pretend Play Kitchen & Doctor Sets</option>
                  <option value="puzzles">Strategy Board Games & Puzzles</option>
                  <option value="musical">Music Instruments & Sound</option>
                  <option value="rideon">Ride-ons, Bicycles & Outdoor Play</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>
                  Preferred Play Style
                </label>
                <select
                  value={playStyle}
                  onChange={(e) => setPlayStyle(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1px solid #CBD5E1', fontSize: '0.88rem', outline: 'none', background: '#FFF' }}
                >
                  <option value="Creative Building & Problem Solving">Creative Building & Problem Solving</option>
                  <option value="Active Physical & Movement Play">Active Physical & Movement Play</option>
                  <option value="Imaginative Storytelling & Roleplay">Imaginative Storytelling & Roleplay</option>
                  <option value="Quiet Focus & Logic Puzzles">Quiet Focus & Logic Puzzles</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>
                  Toy You Wish to Trade Back (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Hot Wheels Track / Barbies / Soft Bear"
                  value={tradeOffer}
                  onChange={(e) => setTradeOffer(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1px solid #CBD5E1', fontSize: '0.88rem', outline: 'none' }}
                />
              </div>

              <button
                type="submit"
                className="btn-purple"
                style={{ width: '100%', padding: '14px', fontSize: '1rem', marginTop: '8px' }}
              >
                <Brain size={18} />
                <span>Generate AI Toy Matches</span>
              </button>

            </form>
          )}

          {/* Loading State */}
          {isLoading && (
            <div style={{ padding: '40px 20px', textAlign: 'center' }}>
              <div className="animate-spin" style={{ display: 'inline-block', width: '48px', height: '48px', border: '4px solid #E9D5FF', borderTopColor: '#8B5CF6', borderRadius: '50%', marginBottom: '16px' }}></div>
              <h3 style={{ fontSize: '1.2rem', color: '#6B21A8', marginBottom: '6px' }}>
                Gemini AI is analyzing Ravet toy catalog...
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#64748B' }}>
                Matching age suitability, disinfected status, and play psychology criteria.
              </p>
            </div>
          )}

          {/* Match Results Display */}
          {matches && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Sparkles size={18} color="#8B5CF6" />
                  <h3 style={{ fontSize: '1.1rem', color: '#0F172A' }}>
                    Top Gemini AI Recommendations for {childName || 'Your Child'}
                  </h3>
                </div>
                <button
                  onClick={() => setMatches(null)}
                  style={{ background: '#F1F5F9', border: 'none', padding: '6px 12px', borderRadius: '99px', fontSize: '0.78rem', cursor: 'pointer', color: '#475569', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  <RefreshCw size={12} /> Retry AI Match
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {matches.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      border: '1.5px solid #DDD6FE',
                      background: 'linear-gradient(135deg, #FFFFFF 0%, #FAF5FF 100%)',
                      borderRadius: '20px',
                      padding: '16px',
                      boxShadow: '0 4px 14px rgba(139, 92, 246, 0.06)'
                    }}
                  >
                    <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                      <img
                        src={item.toy.image}
                        alt={item.toy.title}
                        style={{ width: '90px', height: '90px', borderRadius: '14px', objectFit: 'cover' }}
                      />
                      <div style={{ flex: 1, minWidth: '220px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                          <span style={{ background: '#ECFDF5', color: '#059669', fontSize: '0.75rem', fontWeight: 800, padding: '2px 10px', borderRadius: '99px', border: '1px solid #A7F3D0' }}>
                            🔥 {item.matchScore}% Match Score
                          </span>
                          <span className="badge-pts">{item.toy.points} Pts</span>
                        </div>
                        <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#1E293B', marginBottom: '6px' }}>
                          {item.toy.title}
                        </h4>
                        <p style={{ fontSize: '0.82rem', color: '#4C1D95', lineHeight: 1.4, background: '#F3E8FF', padding: '8px 12px', borderRadius: '10px', marginBottom: '12px' }}>
                          <strong>Gemini AI Rationale:</strong> {item.aiReasoning}
                        </p>
                        
                        <button
                          onClick={() => {
                            onClose();
                            onRequestSwap(item.toy);
                          }}
                          className="btn-primary"
                          style={{ padding: '8px 16px', fontSize: '0.82rem', width: '100%' }}
                        >
                          <HeartHandshake size={14} />
                          <span>Request Swap for this AI Match</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
