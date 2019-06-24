import { usersRef } from "../config/firebase";
import { FETCH_USERS, UPDATE_USER } from './types';

export const fetchUsers = () => dispatch => {
  let previousUsers = []
  usersRef.onSnapshot(snap => {
    if (snap.size > 0) {
      snap.docs.map(doc => {
        previousUsers.push({
          id: doc.id,
          name: doc.data().name,
          nickname: doc.data().nickname,
          profile_text: doc.data().profile_text,
          email: doc.data().email,
          photo_url: doc.data().photo_url,
          provider_id: doc.data().provider_id
        });
      });
    }

    dispatch({
      type: FETCH_USERS,
      users: previousUsers
    });

  });
};

export const updateUser = (user) => dispatch => {
  usersRef.doc(user.id).set(user)
}
