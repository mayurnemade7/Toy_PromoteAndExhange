import React from 'react';
import { Sparkles, ShieldCheck, HeartHandshake, Leaf, ArrowRight, Video, Users, CheckCircle2 } from 'lucide-react';

export default function HeroBanner({ onOpenListModal, onOpenAIMatchmaker, scrollToFeed, scrollToSanitization }) {
  return (
    <section style={{ padding: '36px 0 20px', position: 'relative' }}>
      <div className="app-container">
        <div style={{
          background: 'linear-gradient(135deg, #FFF5F5 0%, #F3E8FF 50%, #ECFDF5 100%)',
          borderRadius: '32px',
          padding: '40px 28px',
          border: '1px solid rgba(255, 255, 255, 0.8)',
          boxShadow: '0 12px 36px rgba(139, 92, 246, 0.08)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          
          {/* Decorative floating shapes */}
          <div style={{ position: 'absolute', top: '-20px', right: '-20px', fontSize: '80px', opacity: 0.15, userSelect: 'none' }}>🧸</div>
          <div style={{ position: 'absolute', bottom: '-20px', left: '10px', fontSize: '70px', opacity: 0.15, userSelect: 'none' }}>🚀</div>

          <div style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
            
            {/* Top Pill Badge */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#FFFFFF', padding: '6px 16px', borderRadius: '99px', boxShadow: '0 4px 14px rgba(0,0,0,0.06)', marginBottom: '20px', border: '1px solid #F1F5F9' }}>
              <span style={{ display: 'flex', position: 'relative' }}>
                <span className="animate-ping" style={{ position: 'absolute', width: '8px', height: '8px', borderRadius: '50%', background: '#10B981', opacity: 0.75 }}></span>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981' }}></span>
              </span>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#334155' }}>
                Hyper-Local Toy Exchange Hub in Ravet & Kiwale, PCMC Pune
              </span>
            </div>

            {/* Main Headline */}
            <h1 style={{ fontSize: '2.6rem', lineHeight: 1.15, color: '#0F172A', marginBottom: '16px', fontWeight: 700 }}>
              Swap Toys. <span style={{ background: 'var(--primary-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Share Joy.</span> <span style={{ background: 'var(--teal-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Save Planet.</span>
            </h1>

            {/* Subtext */}
            <p style={{ fontSize: '1.05rem', color: '#475569', marginBottom: '28px', maxWidth: '680px', margin: '0 auto 28px', lineHeight: 1.6 }}>
              Give your kids endless novelty without plastic waste or cluttered rooms! Exchange disinfected, pre-loved toys with verified neighborhood parents in <strong>Celestial City, Rohan Ananta, Urban Skyline</strong> and all Ravet housing societies.
            </p>

            {/* CTA Action Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', flexWrap: 'wrap', marginBottom: '36px' }}>
              
              <button onClick={scrollToFeed} className="btn-primary" style={{ padding: '14px 28px', fontSize: '1rem' }}>
                <span>Explore Ravet Catalog</span>
                <ArrowRight size={18} />
              </button>

              <button onClick={onOpenAIMatchmaker} className="btn-purple" style={{ padding: '14px 28px', fontSize: '1rem' }}>
                <Sparkles size={18} />
                <span>Try Gemini AI Matchmaker</span>
              </button>

              <button onClick={scrollToSanitization} className="btn-secondary" style={{ padding: '13px 22px', fontSize: '0.92rem' }}>
                <ShieldCheck size={18} color="#059669" />
                <span>Hygiene Guarantee</span>
              </button>
            </div>

            {/* Impact Metric Cards Bar */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: '12px',
              maxWidth: '760px',
              margin: '0 auto',
              paddingTop: '20px',
              borderTop: '1px dashed rgba(203, 213, 225, 0.8)'
            }}>
              <div style={{ background: '#FFFFFF', padding: '14px', borderRadius: '16px', border: '1px solid #F1F5F9', textAlign: 'center' }}>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FF5A5F', fontFamily: 'var(--font-heading)' }}>380+</div>
                <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>Toys Swapped</div>
              </div>

              <div style={{ background: '#FFFFFF', padding: '14px', borderRadius: '16px', border: '1px solid #F1F5F9', textAlign: 'center' }}>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#059669', fontFamily: 'var(--font-heading)' }}>1.4 Tons</div>
                <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>Plastic Waste Saved</div>
              </div>

              <div style={{ background: '#FFFFFF', padding: '14px', borderRadius: '16px', border: '1px solid #F1F5F9', textAlign: 'center' }}>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#8B5CF6', fontFamily: 'var(--font-heading)' }}>100%</div>
                <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>UV-C Disinfected</div>
              </div>

              <div style={{ background: '#FFFFFF', padding: '14px', borderRadius: '16px', border: '1px solid #F1F5F9', textAlign: 'center' }}>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#D97706', fontFamily: 'var(--font-heading)' }}>520+</div>
                <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>Happy Ravet Kids</div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
