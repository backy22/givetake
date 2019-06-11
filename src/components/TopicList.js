import React from 'react';
import ReactDOM from 'react-dom';
//import { Provider } from 'react-redux'
//import { createStore } from 'redux'
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { withRouter } from 'react-router';
import User from './User';
import Topic from './Topic';
//import * as serviceWorker from './serviceWorker';
import Button from '@material-ui/core/button';
import { topicsRef, usersRef, authRef } from "../config/firebase";

class TopicList extends React.Component {
  constructor(props) {
    super(props);

    this.handleToSignInPage = this.handleToSignInPage.bind(this);
    this.handleToAddTopicPage = this.handleToAddTopicPage.bind(this);
    this.handleToMyPage = this.handleToMyPage.bind(this);
  }

  handleToSignInPage = () => {
    this.props.history.push('/signin')
  }
  
  handleToAddTopicPage = () => {
    this.props.history.push('/add-topic')
  }

  handleToMyPage = () => {
    var user = authRef.currentUser;
    this.props.history.push('/user/'+ user.uid)
  }

  getUserImg(topic){
    let user = this.props.users.filter(e => e.uid === topic.uid)[0]
    console.log(user);
    if (user && user.photo_url){
      console.log(user.photo_url);
      return user.photo_url
    }else{
      return null
    }
  }

  render(){
    return (
    <div>
      <Button onClick={this.handleToSignInPage}>
        Sign In
      </Button>

      <BrowserRouter>
        <div className="topic-list">
          {this.props.topics.map((topic) =>
            <div className="topic">
              <div className="user-img">
                <img src={this.getUserImg(topic)} />
              </div>
              <div className="topic-title">
                <Link to={"/topic/" + topic.id}>{topic.title}</Link>
                <Link to={"/user/" + topic.uid}>{topic.uid}</Link>
              </div>
            </div>
          )}
        </div>
      </BrowserRouter>
      
      <footer>
        <Button onClick={this.handleToAddTopicPage}>
          Add Topic
        </Button>
        <Button onClick={this.handleToMyPage} >
          My Page
        </Button>
      </footer>

    </div>
    );
  }
}

export default TopicList;
