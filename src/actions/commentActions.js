import { firebaseDb } from "../config/firebase";
import { ADD_COMMENT } from './types';

export const addComment = (newComment) => dispatch => {
  firebaseDb.ref(`topics/${newComment.topic_id}/comments`).push(newComment);
};

