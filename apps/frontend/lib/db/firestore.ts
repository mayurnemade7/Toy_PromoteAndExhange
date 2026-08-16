import { DBProvider, Toy } from "./interface";
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, doc, setDoc, query, orderBy } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

function getFirebaseClient() {
  if (!getApps().length) {
    return initializeApp(firebaseConfig);
  }
  return getApp();
}

export class FirestoreProvider implements DBProvider {
  private db;

  constructor() {
    this.db = getFirestore(getFirebaseClient());
  }

  async getAllToys(): Promise<Toy[]> {
    const toysRef = collection(this.db, "toys");
    const q = query(toysRef, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
      } as Toy;
    });
  }

  async addToy(toy: Omit<Toy, "id" | "createdAt">): Promise<Toy> {
    const toysRef = collection(this.db, "toys");
    const newDocRef = doc(toysRef);
    
    const newToy: Toy = {
      ...toy,
      id: newDocRef.id,
      createdAt: new Date().toISOString(),
    };
    
    await setDoc(newDocRef, newToy);
    return newToy;
  }
}
