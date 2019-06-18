import { topicsRef, authRef, firebaseDb, usersRef } from "../config/firebase";
import { FETCH_USER } from './types';

export const fetchUser = () => dispatch => {

  authRef.onAuthStateChanged(user => {
    if (user) {
      dispatch({
        type: FETCH_USER,
        payload: user
      });

      usersRef.where('uid', '==', user.uid).get().then(snap => {
        if (snap.size > 0){
          //TODO update user data
          // snap.docs[0].set({
          //   uid: user.uid, 
          //   name: user.displayName,
          //   email: user.email, 
          //   photo_url: user.photoURL, 
          //   provider_id: user.providerData[0].providerId
          // },{merge: true})
        }else{
          usersRef.add({
            uid: user.uid, 
            name: user.displayName, 
            email: user.email, 
            photo_url: user.photoURL, 
            provider_id: user.providerData[0].providerId
          });
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

