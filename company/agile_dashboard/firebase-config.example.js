// firebase-config.example.js
// ─────────────────────────────────────────────────────────────
// TEMPLATE — commit this file.  DO NOT commit firebase-config.js
// ─────────────────────────────────────────────────────────────
// Local dev:  copy this file to firebase-config.js and fill values
// Pipeline:   generate firebase-config.js from Vault / GitHub Secrets
// ─────────────────────────────────────────────────────────────

const firebaseConfig = {
  apiKey:            "__FIREBASE_API_KEY__",
  authDomain:        "__FIREBASE_AUTH_DOMAIN__",
  projectId:         "__FIREBASE_PROJECT_ID__",
  storageBucket:     "__FIREBASE_STORAGE_BUCKET__",
  messagingSenderId: "__FIREBASE_MESSAGING_SENDER_ID__",
  appId:             "__FIREBASE_APP_ID__"
};

export default firebaseConfig;
