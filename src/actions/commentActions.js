import { firebaseDb } from "../config/firebase";
import { FETCH_COMMENTS, ADD_COMMENT } from './types';

export const fetchComments = (topic) => dispatch => {
  let previousComments = []
  firebaseDb.collection(`topics/${topic.id}/comments`).orderBy("date", "desc").onSnapshot(snap => {
    previousComments = []  // これないとpreviousCommentsが空になっていない
    if (snap.size > 0){
      snap.docs.map(doc => {
        previousComments.push({
          id: doc.id,
          comment: doc.data().comment,
          uid: doc.data().uid,
          date: doc.data().date
        });
      })
    }

    dispatch({
      type: FETCH_COMMENTS,
      comments: previousComments
    });

  });
};

export const addComment = (newComment,topic) => dispatch => {
  firebaseDb.collection(`topics/${topic.id}/comments`).add(newComment);
};

