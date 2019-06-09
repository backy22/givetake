const initialState = {
  topics: [],
  users: []
}

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case 'ADD_USER':
      return state
    case 'ADD_TOPIC':
      return Object.assign({}, state, {
        topics: [
          ...state.topics,
          {
            text: action.text,
          }
        ]
      })
    default:
      return state
  }
}
