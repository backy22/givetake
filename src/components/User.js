import React from 'react';
import ReactDOM from 'react-dom';
//import { Provider } from 'react-redux'
//import { createStore } from 'redux'
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { withRouter } from 'react-router';
import AddTopic from './AddTopic';
import { topicsRef, usersRef, authRef } from "../config/firebase";

class User extends React.Component {
  
  render(){
    const params = this.props.match
    let uid = params.params.uid
    let topics = this.props.topics
    let users = this.props.users
    let user = users.filter(e => e.uid === uid)[0]
    let filtered_topics = topics.filter(e => e.uid === uid)
  
    return (
      <div>
        {filtered_topics.map((topic) =>
          <div>{topic.title}</div>
        )}
      </div>
    );
  }
}

export default User;
