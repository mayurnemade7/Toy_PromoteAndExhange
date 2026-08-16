import React from 'react';
import { sanitizationSteps } from '../data/sanitizationSteps';
import { ShieldCheck, Sparkles, CheckCircle2, PackageCheck, Heart, Award } from 'lucide-react';

export default function SanitizationSection() {
  return (
    <section id="sanitization-section" style={{ padding: '50px 0', background: 'linear-gradient(180deg, rgba(240, 253, 244, 0.6) 0%, rgba(248, 250, 252, 1) 100%)' }}>
      <div className="app-container">
        
        {/* Section Header */}
        <div style={{ maxWidth: '720px', margin: '0 auto 36px', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#ECFDF5', border: '1px solid #A7F3D0', padding: '4px 14px', borderRadius: '99px', color: '#059669', fontSize: '0.8rem', fontWeight: 700, marginBottom: '12px' }}>
            <ShieldCheck size={16} /> Medical-Grade Safety Guarantee
          </div>
          <h2 style={{ fontSize: '2.1rem', color: '#0F172A', lineHeight: 1.2, marginBottom: '12px' }}>
            Our 4-Step Toy Hygiene & UV Disinfection Standard
          </h2>
          <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: 1.6 }}>
            Every toy exchanged in Ravet passes through our certified hygiene protocol before reaching your child's hands. Clean, germ-free & 100% safe.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '20px'
        }}>
          {sanitizationSteps.map((step) => (
            <div
              key={step.stepNumber}
              style={{
                background: '#FFFFFF',
                borderRadius: '24px',
                padding: '24px',
                border: '1px solid #E2E8F0',
                position: 'relative',
                boxShadow: '0 4px 14px rgba(0,0,0,0.03)',
                transition: 'transform 0.25s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              {/* Step Number Pill */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#10B981', fontFamily: 'var(--font-heading)' }}>
                  {step.stepNumber}
                </span>
                <span style={{ background: '#ECFDF5', color: '#047857', padding: '2px 10px', borderRadius: '99px', fontSize: '0.72rem', fontWeight: 700 }}>
                  {step.badge}
                </span>
              </div>

              {/* Step Title */}
              <h3 style={{ fontSize: '1.05rem', color: '#0F172A', fontWeight: 700, marginBottom: '8px' }}>
                {step.title}
              </h3>

              {/* Step Description */}
              <p style={{ fontSize: '0.84rem', color: '#64748B', lineHeight: 1.5 }}>
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Trust Seal Banner */}
        <div style={{
          marginTop: '36px',
          background: '#FFFFFF',
          padding: '20px 28px',
          borderRadius: '20px',
          border: '1px solid #D1FAE5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <Award size={36} color="#10B981" />
            <div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: '#065F46' }}>
                Tested & Approved by Pediatricians & Ravet Parents Association
              </div>
              <div style={{ fontSize: '0.8rem', color: '#047857' }}>
                Zero harsh chemical residues • Allergen-free bio detergent • UV-C germicidal light wavelength 254nm
              </div>
            </div>
          </div>
          <span style={{ background: '#10B981', color: '#FFF', fontWeight: 700, padding: '8px 18px', borderRadius: '99px', fontSize: '0.82rem' }}>
            100% Hygiene Assured
          </span>
        </div>

      </div>
    </section>
  );
}
