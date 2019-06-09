let nextTopicId = 0
export const addTopic = text => ({
  type: 'ADD_TOPIC',
  id: nextTopicId++,
  text
})
