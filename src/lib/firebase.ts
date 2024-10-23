import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyB4tGKGroNRH5K3SwFjwBPVS5O8sJGlHS8",
  authDomain: "codementor-ai-fa650.firebaseapp.com",
  projectId: "codementor-ai-fa650",
  storageBucket: "codementor-ai-fa650.appspot.com",
  messagingSenderId: "625953840205",
  appId: "1:625953840205:web:e48afa0697419c6e311004",
  measurementId: "G-0GTDXV7HBW"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Initialize Analytics only if supported (not in SSR/development)
export const analytics = await isSupported().then(yes => yes ? getAnalytics(app) : null);