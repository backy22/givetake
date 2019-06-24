import { topicsRef, authRef, firebaseDb, usersRef } from "../config/firebase";
import { FETCH_USER } from './types';

export const fetchUser = () => dispatch => {

  authRef.onAuthStateChanged(user => {
    if (user) {
      dispatch({
        type: FETCH_USER,
        payload: user
      });

      usersRef.doc(user.uid).set({
        name: user.displayName,
        email: user.email, 
        photo_url: user.photoURL, 
        provider_id: user.providerData[0].providerId
      },{merge: true});

    } else {
      dispatch({
        type: FETCH_USER,
        payload: null
      });
    }
  });
}

