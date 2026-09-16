declare module '@env' {
  export const FIREBASE_API_KEY: string;
  export const FIREBASE_AUTH_DOMAIN: string;
  export const FIREBASE_PROJECT_ID: string;
  export const FIREBASE_STORAGE_BUCKET: string;
  export const FIREBASE_MESSAGING_SENDER_ID: string;
  export const FIREBASE_APP_ID: string;
}

declare module 'firebase/app' {
  const app: any;
  export default app;
  export function initializeApp(config: any): any;
}

declare module 'firebase/auth' {
  export function getAuth(app?: any): any;
  export function signInWithEmailAndPassword(auth: any, email: string, password: string): Promise<any>;
  export function createUserWithEmailAndPassword(auth: any, email: string, password: string): Promise<any>;
  export function signOut(auth: any): Promise<void>;
  export function onAuthStateChanged(auth: any, callback: (user: any) => void): () => void;
}

declare module 'firebase/firestore' {
  export function getFirestore(app?: any): any;
  export function collection(db: any, path: string): any;
  export function doc(db: any, path: string, ...pathSegments: string[]): any;
  export function addDoc(reference: any, data: any): Promise<any>;
  export function setDoc(reference: any, data: any): Promise<any>;
  export function deleteDoc(reference: any): Promise<void>;
  export function updateDoc(reference: any, data: any): Promise<void>;
  export function query(reference: any, ...constraints: any[]): any;
  export function orderBy(field: string, direction?: string): any;
  export function onSnapshot(query: any, callback: (snapshot: any) => void): () => void;
}
