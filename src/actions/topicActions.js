import { topicsRef, authRef } from "../config/firebase";
import { FETCH_TOPICS, ADD_TOPIC } from './types';

export const fetchTopics = () => dispatch => {
  let previousTopics = []
  topicsRef.onSnapshot(snap => {
    if (snap.size > 0){
      snap.docs.map(doc => {
        previousTopics.push({
          id: doc.id,
          title: doc.data().title,
          text: doc.data().text,
          uid: doc.data().uid,
          comments: doc.data().comments
        });
      })
    }

    dispatch({
      type: FETCH_TOPICS,
      topics: previousTopics
    });

  });
};

export const addTopic = (newTopic) => dispatch => {
  topicsRef.add(newTopic);
};

