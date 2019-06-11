import React from 'react';
import ReactDOM from 'react-dom';
//import { Provider } from 'react-redux'
//import { createStore } from 'redux'
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { withRouter } from 'react-router';
import User from './User';
//import * as serviceWorker from './serviceWorker';
import Button from '@material-ui/core/button';
import { topicsRef, usersRef, authRef } from "../config/firebase";

class Topic extends React.Component {
  handleToTopicListPage = () => {
    this.props.history.push('/')
  }

  render(){
    const params = this.props.match
    let topic_id = params.params.id
    let topics = this.props.topics
    let filtered_topics = topics.filter(e => e.id === topic_id);

    return (
      <div>
        <Button onClick={this.handleToTopicListPage}>
          Home
        </Button>
        {filtered_topics.map((topic) =>
          <div>
            <h1>{topic.title}</h1>
            <div>{topic.text}</div>
            <div><Comment comments={topic.comments} /></div>
          </div>
        )}
      </div>
    );
  }
}

class Comment extends React.Component {
  render() {
    const comments = this.props.comments;
    if (comments == null){
      return(null);
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
