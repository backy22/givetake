import React from 'react';
import ReactDOM from 'react-dom';
//import { Provider } from 'react-redux'
//import { createStore } from 'redux'
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { withRouter } from 'react-router';
import AddTopic from './AddTopic';
import User from './User';
//import * as serviceWorker from './serviceWorker';
import Button from '@material-ui/core/Button';
import { topicsRef, usersRef, authRef } from "../config/firebase";

class TopicList extends React.Component {
  constructor(props) {
    super(props);
    this.addTopic = this.addTopic.bind(this);

    this.state = {
      topics: [],
      users: []
    };
  }

  handleToSignInPage = () => {
    this.props.history.push('/signin')
  }

  componentWillMount(){
    const previousTopics = this.state.topics;

    topicsRef.on('child_added', snap => {
      previousTopics.push({
        id: snap.key,
        title: snap.val().title,
        text: snap.val().text,
        uid: snap.val().uid,
        comments: snap.val().comments
      })

      this.setState({
        topics: previousTopics
      })
    })

    const previousUsers = this.state.users;

    usersRef.on('child_added', snap => {
      previousUsers.push({
        id: snap.key,
        uid: snap.val().uid,
      })

      this.setState({
        users: previousUsers
      })
    })

  }

  addTopic = fields => {
    var user = authRef.currentUser;
    fields['uid'] = user.uid
    topicsRef.push().set(fields);
  }

  render() {
    return (
    <div>
      <Button onClick={this.handleToSignInPage}>
        Sign In
      </Button>
      <BrowserRouter>
        <div>
          {this.state.topics.map((topic) => 
            <div>
              <Link to={"/topic/" + topic.id}>{topic.title}</Link>
              <Link to={"/user/" + topic.uid}>{topic.uid}</Link>
            </div>
          )}
        <AddTopic addTopic={fields => this.addTopic(fields)} />
        <Route path={'/topic/:id'} render={props => <Topic topics={this.state.topics} {...props} />} />
        <Route path={'/user/:uid'} render={props => <User topics={this.state.topics} users={this.state.users} {...props} />} />
        <Route path={'/add-topic'} component={AddTopic}/>
        </div>
      </BrowserRouter>
    </div>
    );
  }
}

class Topic extends React.Component {

  render(){
    const params = this.props.match
    let topic_id = params.params.id
    let topics = this.props.topics
    let topic = topics.filter(e => e.id == topic_id)[0]

    return (
      <div>
      <h1>{topic.title}</h1>
      <div>{topic.text}</div>
      <div><Comment comments={topic.comments} /></div>
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

export default TopicList;
