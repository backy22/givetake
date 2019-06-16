import { topicsRef, authRef, firebaseDb, usersRef } from "../config/firebase";
import { FETCH_USER } from './types';

export const fetchUser = () => dispatch => {

  authRef.onAuthStateChanged(user => {
    if (user) {
      dispatch({
        type: FETCH_USER,
        payload: user
      });

      usersRef.orderByChild('uid').startAt(user.uid).endAt(user.uid).limitToFirst(1).on('value', snap => { 
        if (snap.val()){
          const key = Object.keys(snap.val())[0];
          let exist_user = snap.val()[key];
          firebaseDb.ref(`users/${key}`).update({name: user.displayName, email: user.email, photo_url: user.photoURL, provider_id: user.providerData[0].providerId});
        }else{
          usersRef.push().set({uid: user.uid, name: user.displayName, email: user.email, photo_url: user.photoURL, provider_id: user.providerData[0].providerId});
        }
      });
    } else {
      dispatch({
        type: FETCH_USER,
        payload: null
      });
    }
  });
}

