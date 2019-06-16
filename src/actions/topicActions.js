import { topicsRef, authRef } from "../config/firebase";
import { FETCH_TOPICS, ADD_TOPIC } from './types';

export const fetchTopics = () => dispatch => {
  const previousTopics = []
  topicsRef.on('child_added', snap => {
    previousTopics.push({
      id: snap.key,
      title: snap.val().title,
      text: snap.val().text,
      uid: snap.val().uid,
      comments: snap.val().comments
    })

    dispatch({
      type: FETCH_TOPICS,
      topics: previousTopics
    });

  });
};

export const addTopic = (newTopic) => dispatch => {
  topicsRef.push().set(newTopic);
};

