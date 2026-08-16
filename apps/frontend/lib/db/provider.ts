import { DBProvider } from "./interface";
import { FirestoreProvider } from "./firestore";
import { LocalProvider } from "./localStore";

export function getProvider(): DBProvider {
  const providerType = process.env.NEXT_PUBLIC_DB_PROVIDER || "local";

  if (providerType === "firebase") {
    return new FirestoreProvider();
  }

  return new LocalProvider();
}
