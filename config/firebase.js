// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyC6IIxppbswtptTUnTDVUP7uv4efaLSeMY",
  authDomain: "dealsout-35f76.firebaseapp.com",
  projectId: "dealsout-35f76",
  storageBucket: "dealsout-35f76.appspot.com",
  messagingSenderId: "962461258247",
  appId: "1:962461258247:web:c4bd33f9d4f9c4860590a2",
  measurementId: "G-MLE4G4FLL5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

export { storage };
