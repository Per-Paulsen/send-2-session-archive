import app from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// Archive note (2026): original Firebase config redacted.
// Replace with your own Firebase project config to run locally.
var firebaseConfig = {
  apiKey: "<YOUR_FIREBASE_API_KEY>",
  authDomain: "<your-project-id>.firebaseapp.com",
  projectId: "<your-project-id>",
  storageBucket: "<your-project-id>.appspot.com",
  messagingSenderId: "<YOUR_SENDER_ID>",
  appId: "<YOUR_APP_ID>"
};

const firebase = app.initializeApp(firebaseConfig);
const firestore = app.firestore();
const auth = app.auth();

// Uncomment the following if you want to use emulator
if (process.env.NODE_ENV === "development") {
  firestore.useEmulator("localhost", 8080);
  auth.useEmulator("http://localhost:9099");
}

export { firebase, firestore, auth, app };
