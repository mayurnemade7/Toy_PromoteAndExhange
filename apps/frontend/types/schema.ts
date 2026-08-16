/**
 * Ojas Toy Exchange - Core Data Schemas
 * Location: Ravet, PCMC, Pune
 */

export type Gender = 'M' | 'F' | 'OTHER' | 'PREFER_NOT_TO_SAY';

export type DevelopmentalGoal = 
  | 'FINE_MOTOR' 
  | 'GROSS_MOTOR' 
  | 'STEM' 
  | 'MONTESSORI' 
  | 'SENSORY' 
  | 'LANGUAGE' 
  | 'CREATIVE' 
  | 'SOCIAL';

export interface ChildProfile {
  childId: string;
  firstName: string;
  birthYearMonth: string; // Format: "YYYY-MM" (e.g. "2024-03")
  gender?: Gender;
  developmentalGoals: DevelopmentalGoal[];
  favoriteCategories: string[];
}

export type RavetSubLocality = 
  | 'RAVET_BRTS' 
  | 'SHINDE_VASTI' 
  | 'KIWALE' 
  | 'SB_PATIL_VICINITY' 
  | 'BHONDE_GOAN';

export interface ParentUser {
  userId: string; // Auth provider ID
  fullName: string;
  phone: string; // E.164 (+91...)
  email: string;
  isPhoneVerified: boolean;
  
  location: {
    societyName: string; // e.g., "Celestial City Phase 2", "Urban Skyline"
    subLocality: RavetSubLocality;
    city: 'PUNE';
    postalCode: '411044' | '412101';
    geohash: string; // 7-char geohash
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };

  children: ChildProfile[];

  trustMetrics: {
    karmaPoints: number;
    trustScore: number; // 0.00 to 5.00
    completedExchanges: number;
    canceledExchanges: number;
    hygieneRating: number; // 0 to 5
    isVerifiedParent: boolean;
  };

  activeToyIds: string[];
  wishlistToyIds: string[];
  
  createdAt: string;
  updatedAt: string;
}

export type ToyConditionGrade = 'MINT' | 'LIKE_NEW' | 'GOOD' | 'FAIR';

export type ToyCategory = 
  | 'MONTESSORI_WOODEN' 
  | 'STEM_PUZZLES' 
  | 'SENSORY_BABY' 
  | 'FINE_MOTOR_BUILDING' 
  | 'ACTIVE_OUTDOOR' 
  | 'PRETEND_PLAY' 
  | 'BOARD_GAMES' 
  | 'BOOKS_INTERACTIVE';

export type ToyMaterialType = 
  | 'PLASTIC' 
  | 'WOODEN' 
  | 'FABRIC_PLUSH' 
  | 'ELECTRONIC' 
  | 'RUBBER_SILICONE';

export type ExchangePreference = 
  | 'TEMPORARY_SWAP' 
  | 'PERMANENT_TRADE' 
  | 'KARMA_BORROW';

export type ToyAvailabilityState = 
  | 'AVAILABLE' 
  | 'RESERVED' 
  | 'IN_EXCHANGE' 
  | 'UNDER_SANITIZATION' 
  | 'RETIRED';

export interface Toy {
  toyId: string;
  ownerId: string;
  title: string;
  brand: string;
  description: string;
  category: ToyCategory;
  materialType: ToyMaterialType;
  
  targetAgeMinMonths: number;
  targetAgeMaxMonths: number;

  conditionGrade: ToyConditionGrade;
  missingPartsDescription?: string;
  hasBattery: boolean;
  batteryWorking: boolean;
  
  images: string[];
  reelId?: string;

  exchangeType: ExchangePreference;
  maxSwapDurationDays?: number;
  depositKarmaValue: number;

  currentGeohash: string;
  societyName: string;
  status: ToyAvailabilityState;

  lastSanitizedAt?: string;
  sanitizationProofUrl?: string;

  createdAt: string;
  updatedAt: string;
}

export type ExchangeState = 
  | 'REQUESTED'
  | 'ACCEPTED'
  | 'SANITIZATION_IN_PROGRESS'
  | 'HYGIENE_VERIFIED'
  | 'HANDOFF_SCHEDULED'
  | 'ACTIVE_SWAP'
  | 'RETURN_INITIATED'
  | 'RETURN_VERIFIED'
  | 'COMPLETED'
  | 'REJECTED'
  | 'CANCELLED'
  | 'DISPUTED';

export type SterilizationMethod = 
  | 'UVC_CABINET' 
  | 'ALCOHOL_WIPE_70' 
  | 'STEAM_STERILIZATION' 
  | 'NON_TOXIC_SPRAY';

export interface HygieneProof {
  proofId: string;
  step1VisualCheckPassed: boolean;
  step2CleanWipePassed: boolean;
  step3SterilizationMethod: SterilizationMethod;
  step4PhotoUrl: string;
  step5TamperBagSealedTimestamp: string;
  verifierNotes?: string;
  aiHygieneScore?: number; // 0 to 1.0
}

export interface ExchangeRequest {
  requestId: string;
  requestedToyId: string;
  offeredToyId?: string;
  
  requesterId: string;
  ownerId: string;
  
  currentState: ExchangeState;

  timeline: {
    requestedAt: string;
    acceptedAt?: string;
    hygieneVerifiedAt?: string;
    handoffAt?: string;
    returnInitiatedAt?: string;
    completedAt?: string;
    cancelledAt?: string;
  };

  handoffDetails: {
    meetingType: 'SOCIETY_GATE_LEAVE' | 'CLUBHOUSE_SWAP' | 'DIRECT_DOORSTEP';
    locationName: string;
    scheduledTime: string;
    otpCode: string;
  };

  outboundHygieneProof?: HygieneProof;
  inboundHygieneProof?: HygieneProof;

  feedback?: {
    ownerRatingByRequester?: number;
    requesterRatingByOwner?: number;
    hygieneComplianceScore?: number;
    reviewText?: string;
  };

  createdAt: string;
  updatedAt: string;
}

export interface ReelMap {
  reelId: string;
  toyId: string;
  creatorUserId: string;
  
  videoUrl: string;
  thumbnailUrl: string;
  aspectRatio: '9:16' | '16:9';
  durationSeconds: number;

  aiMetadata: {
    detectedObjectCategory: string;
    isSoundWorkingDetected: boolean;
    detectedConditionScore: number; // 0 to 10
    detectedChokingHazards: boolean;
    aiGeneratedCaption: string;
    extractedKeywords: string[];
  };

  metrics: {
    viewCount: number;
    swapRequestsTriggered: number;
    likeCount: number;
  };

  status: 'PROCESSING' | 'ACTIVE' | 'FLAGGED_UNSAFE';
  createdAt: string;
}
