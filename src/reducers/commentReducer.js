import { FETCH_COMMENTS, ADD_COMMENT } from '../actions/types';

const initialState = {
  comments: [],
  comment: {},
}

export default function(state = initialState, action) {
  switch(action.type) {
    case 'FETCH_COMMENTS':
      return {
        ...state,
        comments: action.comments
      };
    default:
      return state
  }
}
