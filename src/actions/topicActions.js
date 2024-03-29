import { topicsRef, authRef } from "../config/firebase";
import { FETCH_TOPICS, ADD_TOPIC, UPDATE_TOPIC } from './types';

export const fetchTopics = () => dispatch => {
  let previousTopics = []
  topicsRef.orderBy("date", "desc").onSnapshot(snap => {
    previousTopics = []
    if (snap.size > 0){
      snap.docs.map(doc => {
        previousTopics.push({
          id: doc.id,
          title: doc.data().title,
          text: doc.data().text,
          type: doc.data().type,
          active: doc.data().active,
          uid: doc.data().uid,
          date: doc.data().date,
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

export const updateTopic = (topic) => dispatch => {
  topicsRef.doc(topic.id).update({title: topic.title, text: topic.text, active: topic.active, date: new Date()})
};
