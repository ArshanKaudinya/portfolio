import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const keyJson = Buffer.from(
  process.env.FIREBASE_SERVICE_KEY_B64!,
  'base64'
).toString('utf8');

if (!getApps().length) {
  initializeApp({ credential: cert(JSON.parse(keyJson)) });
}
export const db = getFirestore();

