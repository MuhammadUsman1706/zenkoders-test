import { initializeApp, getApps, cert } from "firebase-admin/app";

// var serviceAccount = require("../../zenkoders-test-firebase-adminsdk-4j2tw-2f5a9673c3.json");

const firebaseAdminConfig = {
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY
      ? JSON.parse(process.env.FIREBASE_PRIVATE_KEY)
      : undefined,
  }),
};

export function customInitApp() {
  if (getApps().length <= 0) {
    initializeApp(firebaseAdminConfig);
  }
}
