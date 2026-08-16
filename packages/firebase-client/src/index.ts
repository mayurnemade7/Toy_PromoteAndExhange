// @toy-exchange/firebase-client
// Shared Firebase initialization — used by all Next.js apps.
// Each app passes its own NEXT_PUBLIC_FIREBASE_* env vars.

import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";

export interface FirebaseClientConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

let app: FirebaseApp;
let db: Firestore;

export function initFirebase(config: FirebaseClientConfig) {
  if (!getApps().length) {
    app = initializeApp(config);
  } else {
    app = getApp();
  }
  db = getFirestore(app);
  return { app, db };
}

export function getDb(): Firestore {
  if (!db) throw new Error("Firebase not initialized. Call initFirebase() first.");
  return db;
}

export { getFirestore };
export * from "firebase/firestore";
