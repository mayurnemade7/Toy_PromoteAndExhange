/**
 * Ojas Toy Exchange - Gemini AI Matchmaker & Vision Audit Service
 * SDK Target: @google/genai (Gemini 2.5 Flash / Pro)
 */

import { GoogleGenAI, Type, Schema } from '@google/genai';
import { ParentUser, Toy, ChildProfile } from '../types/schema';

const ai = new GoogleGenAI({});

export interface MatchmakerResult {
  toyId: string;
  overallMatchScore: number; // 0 to 100
  subScores: {
    ageAppropriatenessScore: number;
    developmentalSynergyScore: number;
    proximityScore: number;
    hygieneTrustScore: number;
  };
  matchedMilestones: string[];
  parentPitchText: string;
  fairnessRating: 'EXCELLENT_EQUIVALENT' | 'FAIR_SWAP' | 'ASYMMETRIC_NEEDS_KARMA_TOPUP';
}

export interface MatchmakerResponse {
  recommendations: MatchmakerResult[];
  aiCuratorTip: string;
}

const matchmakerResponseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    recommendations: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          toyId: { type: Type.STRING },
          overallMatchScore: { type: Type.NUMBER },
          subScores: {
            type: Type.OBJECT,
            properties: {
              ageAppropriatenessScore: { type: Type.NUMBER },
              developmentalSynergyScore: { type: Type.NUMBER },
              proximityScore: { type: Type.NUMBER },
              hygieneTrustScore: { type: Type.NUMBER },
            },
            required: [
              'ageAppropriatenessScore',
              'developmentalSynergyScore',
              'proximityScore',
              'hygieneTrustScore',
            ],
          },
          matchedMilestones: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
          },
          parentPitchText: { type: Type.STRING },
          fairnessRating: {
            type: Type.STRING,
            enum: [
              'EXCELLENT_EQUIVALENT',
              'FAIR_SWAP',
              'ASYMMETRIC_NEEDS_KARMA_TOPUP',
            ],
          },
        },
        required: [
          'toyId',
          'overallMatchScore',
          'subScores',
          'matchedMilestones',
          'parentPitchText',
          'fairnessRating',
        ],
      },
    },
    aiCuratorTip: { type: Type.STRING },
  },
  required: ['recommendations', 'aiCuratorTip'],
};

/**
 * Generate developmental toy swap recommendations using Gemini 2.5 Flash
 */
export async function getGeminiToyMatches(
  parent: ParentUser,
  child: ChildProfile,
  candidateToys: Toy[]
): Promise<MatchmakerResponse> {
  const promptText = `
You are the Ojas AI Toy Matchmaker for parents in Ravet, Pune.

Target Child Profile:
- Name: ${child.firstName}
- Age (Months): ${calculateAgeInMonths(child.birthYearMonth)}
- Active Developmental Goals: ${child.developmentalGoals.join(', ')}
- Preferred Categories: ${child.favoriteCategories.join(', ')}

Parent Location: ${parent.location.societyName}, Sub-locality: ${parent.location.subLocality}

Available Candidate Toys in Ravet:
${JSON.stringify(
  candidateToys.map((t) => ({
    toyId: t.toyId,
    title: t.title,
    category: t.category,
    materialType: t.materialType,
    targetAgeMinMonths: t.targetAgeMinMonths,
    targetAgeMaxMonths: t.targetAgeMaxMonths,
    conditionGrade: t.conditionGrade,
    societyName: t.societyName,
    hasBattery: t.hasBattery,
  })),
  null,
  2
)}

Evaluate candidates, score them (0-100), and write a concise, compelling pitch for the parent explaining why this toy benefits their child's developmental goals.
`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: promptText,
    config: {
      systemInstruction:
        'You are a pediatric developmental toy matchmaker for parents in Ravet, Pune. Evaluate toys with high precision.',
      responseMimeType: 'application/json',
      responseSchema: matchmakerResponseSchema,
      temperature: 0.2,
    },
  });

  return JSON.parse(response.text!) as MatchmakerResponse;
}

const hygieneAuditResponseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    isToyVisible: { type: Type.BOOLEAN },
    cleanlinessPass: { type: Type.BOOLEAN },
    safetyInspectionPass: { type: Type.BOOLEAN },
    confidenceScore: { type: Type.NUMBER },
    detectedIssues: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
    },
    auditSummary: { type: Type.STRING },
  },
  required: [
    'isToyVisible',
    'cleanlinessPass',
    'safetyInspectionPass',
    'confidenceScore',
    'detectedIssues',
    'auditSummary',
  ],
};

/**
 * Inspect uploaded sanitization photo using Gemini Vision API
 */
export async function auditSanitizationPhoto(
  base64Image: string,
  mimeType: string = 'image/jpeg'
) {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: [
      {
        inlineData: {
          data: base64Image,
          mimeType: mimeType,
        },
      },
      `Analyze this image submitted as proof of toy sanitization.
1. Check if a toy is clearly presented.
2. Check for visible food residue, mud/dirt, or dark spots.
3. Check for obvious sharp broken parts or battery corrosion leaks.
Provide strict output according to the schema.`,
    ],
    config: {
      responseMimeType: 'application/json',
      responseSchema: hygieneAuditResponseSchema,
      temperature: 0.1,
    },
  });

  return JSON.parse(response.text!);
}

function calculateAgeInMonths(birthYearMonth: string): number {
  const [yearStr, monthStr] = birthYearMonth.split('-');
  const birthDate = new Date(parseInt(yearStr, 10), parseInt(monthStr, 10) - 1, 1);
  const now = new Date();
  const months = (now.getFullYear() - birthDate.getFullYear()) * 12 + (now.getMonth() - birthDate.getMonth());
  return Math.max(0, months);
}
