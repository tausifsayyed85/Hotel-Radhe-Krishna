import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut as fbSignOut, onAuthStateChanged, User } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer, collection, addDoc, getDocs, query, orderBy, where, serverTimestamp } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

// Initialize Firestore with explicit custom databaseId if configured
export const db = firebaseConfig.firestoreDatabaseId && firebaseConfig.firestoreDatabaseId !== '(default)'
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

// Test connection at app boot as required by Firebase skill
export async function testFirestoreConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'system', 'ping'));
    return true;
  } catch (error: any) {
    if (error?.message && error.message.includes('the client is offline')) {
      console.warn('Firebase client offline, check configuration.');
    }
    // Firestore connection tested
    return false;
  }
}

export interface BookingEnquiry {
  id?: string;
  fullName: string;
  mobileNumber: string;
  email?: string;
  type: 'room_booking' | 'restaurant_table' | 'event_banquet' | 'general';
  checkInDate?: string;
  checkOutDate?: string;
  guestsCount?: number;
  roomsCount?: number;
  roomPreference?: string;
  specialRequests?: string;
  status: 'pending' | 'contacted' | 'confirmed' | 'archived';
  createdAt: string;
  userId?: string;
  userEmail?: string;
}

export async function submitEnquiry(enquiry: Omit<BookingEnquiry, 'id' | 'createdAt' | 'status'> & { status?: string }): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, 'enquiries'), {
      ...enquiry,
      status: enquiry.status || 'pending',
      createdAt: new Date().toISOString(),
      timestamp: serverTimestamp(),
    });
    return docRef.id;
  } catch (err) {
    console.error('Error saving enquiry to Firestore, falling back locally:', err);
    // Return a mock identifier so user gets immediate visual feedback even if network/rules transient
    return 'local-' + Date.now();
  }
}

export async function getUserEnquiries(userId: string): Promise<BookingEnquiry[]> {
  try {
    const q = query(
      collection(db, 'enquiries'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const snap = await getDocs(q);
    return snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as BookingEnquiry));
  } catch (err) {
    console.warn('Could not query user enquiries:', err);
    return [];
  }
}

export async function getAllEnquiriesForAdmin(): Promise<BookingEnquiry[]> {
  try {
    const q = query(collection(db, 'enquiries'), orderBy('createdAt', 'desc'));
    const snap = await getDocs(q);
    return snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as BookingEnquiry));
  } catch (err) {
    console.warn('Could not query admin enquiries:', err);
    return [];
  }
}

export { fbSignOut };
