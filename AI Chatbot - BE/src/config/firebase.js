const { initializeApp } = require('firebase/app');
const { getAuth } = require('firebase/auth');
const admin = require('firebase-admin');
require('dotenv').config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || "AIzaSyAkOyLYQvkiVq9pYs6FxCyZdY_FXIxTQAw",
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || "edubot-47b75.firebaseapp.com",
  projectId: process.env.FIREBASE_PROJECT_ID || "edubot-47b75",
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "edubot-47b75.appspot.com",
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "1015516542202",
  appId: process.env.FIREBASE_APP_ID || "1:1015516542202:web:8c3a9c9a7c0e8f9f3a1b3c"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);


const serviceAccountConfig = process.env.FIREBASE_SERVICE_ACCOUNT ? 
  JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT) : 
  null;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountConfig)
});

module.exports = { auth, admin };