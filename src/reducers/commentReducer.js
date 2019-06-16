import { ADD_COMMENT } from '../actions/types';

const initialState = {
  comments: [],
  comment: {},
}

export default function(state = initialState, action) {
  switch(action.type) {
    default:
      return state
  }
}
