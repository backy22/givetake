import { FETCH_TOPICS, ADD_TOPIC } from '../actions/types';

const initialState = {
  topics: [],
  topic: {},
}

export default function(state = initialState, action) {
  switch(action.type) {
    case 'FETCH_TOPICS':
      return {
        ...state,
        topics: action.topics
      };
    default:
      return state
  }
}
