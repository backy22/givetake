import * as firebase from "firebase";

var DB_CONFIG = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
};

firebase.initializeApp(DB_CONFIG);

const databaseRef = firebase.database().ref();
export const topicsRef = databaseRef.child("topics");
export const usersRef = databaseRef.child("users");
export const authRef = firebase.auth();
