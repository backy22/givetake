import React from 'react';
import ReactDOM from 'react-dom';
//import { Provider } from 'react-redux'
//import { createStore } from 'redux'
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { withRouter } from 'react-router';
import './index.css';
import * as firebase from 'firebase';
//import Topic from './Topic';
import AddTopic from './AddTopic';
import User from './User';
import * as serviceWorker from './serviceWorker';
import Button from '@material-ui/core/Button';

var DB_CONFIG = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
};

console.log(DB_CONFIG);

class TopicList extends React.Component {
  constructor(props) {
    super(props);
    this.addTopic = this.addTopic.bind(this);
    
    this.app = firebase.initializeApp(DB_CONFIG);
    this.database = this.app.database().ref().child('topics');

    this.state = {
      topics: []
    };
  }

  handleToSignInPage = () => {
    this.props.history.push('/signin')
  }

  componentWillMount(){
    const previousTopics = this.state.topics;

    this.database.on('child_added', snap => {
      previousTopics.push({
        id: snap.key,
        title: snap.val().title,
        text: snap.val().text,
        comments: snap.val().comments
      })

      this.setState({
        topics: previousTopics
      })
    })

  }

  addTopic = fields => {
    this.database.push().set(fields);
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
              <Link to={"/user/" + topic.user_id}>{topic.user_id}</Link>
            </div>
          )}
        <AddTopic addTopic={fields => this.addTopic(fields)} />
        <Route path={'/topic/:id'} render={props => <Topic topics={this.state.topics} {...props} />} />
        <Route path={'/user/:user_id'} component={User}/>
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
