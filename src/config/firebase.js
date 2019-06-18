import * as firebase from "firebase";

if (process.env.NODE_ENV === 'production'){
  var DB_CONFIG = {
    apiKey: process.env.REACT_APP_PROD_API_KEY,
    authDomain: process.env.REACT_APP_PROD_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_PROD_DATABASE_URL,
    projectId: process.env.REACT_APP_PROD_PROJECT_ID,
    storageBucket: process.env.REACT_APP_PROD_STORAGE_BUCKET,
  };
}else{
  var DB_CONFIG = {
    apiKey: process.env.REACT_APP_DEV_API_KEY,
    authDomain: process.env.REACT_APP_DEV_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DEV_DATABASE_URL,
    projectId: process.env.REACT_APP_DEV_PROJECT_ID,
    storageBucket: process.env.REACT_DEV_APP_STORAGE_BUCKET,
  };
}

firebase.initializeApp(DB_CONFIG);

export const firebaseDb = firebase.firestore();
export const topicsRef = firebaseDb.collection("topics");
export const usersRef = firebaseDb.collection("users");
export const authRef = firebase.auth();
