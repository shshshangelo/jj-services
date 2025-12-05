// Firebase initialization for JJ Services
// Usage: import { app, auth, db, analytics } from './firebase';

import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAiO0ZadL4tyy1yVSBkKTHQneLnHbIEZos",
  authDomain: "jj-services-49aa1.firebaseapp.com",
  projectId: "jj-services-49aa1",
  storageBucket: "jj-services-49aa1.firebasestorage.app",
  messagingSenderId: "199515158884",
  appId: "1:199515158884:web:eaa2fbd439067327542271",
  measurementId: "G-F6YZF61FZN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Analytics is only available in browser contexts
let analytics = null;
try {
  if (typeof window !== 'undefined') {
    analytics = getAnalytics(app);
  }
} catch (e) {
  // Analytics may fail in non-browser environments or if not supported
  // Keep analytics as null and continue.
  // console.warn('Firebase analytics not initialized', e);
}

const auth = getAuth(app);
const db = getFirestore(app);

export { app, analytics, auth, db };
