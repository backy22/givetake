import { usersRef } from "../config/firebase";
import { FETCH_USERS } from './types';

export const fetchUsers = () => dispatch => {
  const previousUsers = []
  usersRef.on('child_added', snap => {
    previousUsers.push({
      id: snap.key,
      uid: snap.val().uid,
      name: snap.val().name,
      profile_text: snap.val().profile_text,
      email: snap.val().email,
      photo_url: snap.val().photo_url,
      provider_id: snap.val().provider_id
    })

    dispatch({
      type: FETCH_USERS,
      users: previousUsers
    });
  });
};

