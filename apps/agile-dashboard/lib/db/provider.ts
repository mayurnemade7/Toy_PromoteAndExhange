import { isFirebaseConfigured } from "@/lib/firebase";
import { FirestoreProvider } from "@/lib/firestore";
import { LocalProvider } from "@/lib/localStore";
import type { DatabaseProvider } from "./interface";

export function getProvider(): DatabaseProvider {
  // If the env specifically requests local, or if firebase is not configured, use local
  if (process.env.NEXT_PUBLIC_DB_PROVIDER === "local" || !isFirebaseConfigured) {
    return LocalProvider;
  }
  return FirestoreProvider;
}
