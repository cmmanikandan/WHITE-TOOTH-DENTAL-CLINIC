import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getMessaging } from "firebase/messaging";
import { getAnalytics, isSupported as isAnalyticsSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCc6zSZcr9P36bW4NLHAT1Iom2msvFcnTk",
  authDomain: "nexdentiq.firebaseapp.com",
  projectId: "nexdentiq",
  storageBucket: "nexdentiq.firebasestorage.app",
  messagingSenderId: "424045855109",
  appId: "1:424045855109:web:e1b3c0f216b4008af204ec",
  measurementId: "G-Q9C80Y21DF"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const messaging = typeof window !== 'undefined' ? getMessaging(app) : null;

let analytics = null;
if (typeof window !== 'undefined') {
  isAnalyticsSupported()
    .then((supported) => {
      if (supported) {
        analytics = getAnalytics(app);
      }
    })
    .catch(() => {
      analytics = null;
    });
}

export { analytics };

export default app;
