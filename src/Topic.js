import React from 'react';
import './App.css';
import * as firebase from 'firebase';

const Topic = ({ match }) => {

  let topic_id = parseInt(match.params.topic_id, 10)
  let topic = this.state.topics.filter(e => e.id === topic_id)[0]
  
  return (
    <div>
      <h3>topic ID: {match.params.topic_id}</h3>
      <h1>{topic.title}</h1>
      <div>{topic.text}</div>
      <div><Comment comments={topic.comments} /></div>
    </div>
  );
}

class Comment extends React.Component {
  render() {
    const comments = this.props.comments;
    if (comments == null){
      return;
    }
    return (
      <div>
        {comments.map((comment) =>
          <div>
            <div>{comment.name}</div>
            <div>{comment.comment}</div>
          </div>
        )}
      </div>
    );
  }
}

export default Topic;
