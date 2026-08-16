/**
 * Ojas Toy Exchange - 5-Step Sanitization Protocol Constants
 * Location: Ravet, PCMC, Pune
 */

export interface SanitizationStepDefinition {
  stepNumber: number;
  name: string;
  description: string;
  mandatoryChecklist: string[];
}

export const OJAS_5_STEP_SANITIZATION_PROTOCOL: SanitizationStepDefinition[] = [
  {
    stepNumber: 1,
    name: 'Inspection & Safety Audit',
    description: 'Structural integrity, sharp edge check, and small part choke hazard evaluation.',
    mandatoryChecklist: [
      'Verify no broken plastic shards or sharp exposed edges',
      'Perform Choke Test Cylinder audit for parts <31.7mm if listed for under 36 months',
      'Inspect battery compartment: check for battery leakage or corroded terminals',
      'Ensure battery door screw is tightly fastened',
    ],
  },
  {
    stepNumber: 2,
    name: 'Surface Decontamination & Pre-Wipe',
    description: 'Removal of surface organic residue, food stains, and dust using non-toxic solutions.',
    mandatoryChecklist: [
      'Pre-wipe all touch surfaces using microfiber cloth with plant-based organic soap water',
      'Remove visible organic residue, grease, or dirt from crevices',
    ],
  },
  {
    stepNumber: 3,
    name: 'Material-Specific Deep Sterilization',
    description: 'Targeted pathogen elimination based on material composition.',
    mandatoryChecklist: [
      'Plastic/Silicone: Wipe with 70% Isopropyl Alcohol spray OR 10-minute UV-C box cycle',
      'Wooden Toys: Rapid-evaporating 70% Isopropyl sanitizing wipe; dry immediately (no water soaking)',
      'Fabric/Plush: 100°C steam sterilizer wand treatment OR 60°C hypoallergenic wash cycle',
      'Electronic Toys: Surface alcohol wipe, zero water immersion, clean metal contacts',
    ],
  },
  {
    stepNumber: 4,
    name: 'Dual-Photo Verification & Gemini AI Audit',
    description: 'Visual evidence submission and automated AI cleanliness inspection.',
    mandatoryChecklist: [
      'Upload Photo 1: Cleaned toy next to Ojas Sanitization Checklist Card with today date & OTP',
      'Upload Photo 2: Close-up of battery compartment / primary touch surface',
      'Pass automated Gemini Vision API cleanliness & safety check (Confidence >= 0.85)',
    ],
  },
  {
    stepNumber: 5,
    name: 'Tamper-Evident Eco-Bag Sealing',
    description: 'Sealing in reusable hygiene bag prior to gate handoff.',
    mandatoryChecklist: [
      'Place sanitized toy into clean Ojas reusable eco-bag',
      'Apply single-use green Ojas Hygiene Sticker with written OTP code',
      'Hand over at designated society gate or clubhouse micro-hub',
    ],
  },
];

export const HYGIENE_GUARANTEE_DISPUTE_RULES = {
  reportingWindowHours: 4,
  firstViolationAction: 'Warning + 25% Karma Score Penalty',
  secondViolationAction: '14-Day Exchange Suspension',
  thirdViolationAction: 'Permanent Ban from Ojas Network',
};
