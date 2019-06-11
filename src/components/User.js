import React from 'react';
import ReactDOM from 'react-dom';
//import { Provider } from 'react-redux'
//import { createStore } from 'redux'
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { withRouter } from 'react-router';
import AddTopic from './AddTopic';
import { firebaseDb, topicsRef, usersRef, authRef } from "../config/firebase";
import Button from '@material-ui/core/Button';

class User extends React.Component {
   constructor(props) {
    super(props);

    this.state = {
      name: '',
      profile_text: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

 
  handleToTopicListPage = () => {
    this.props.history.push('/')
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = (e,key) => {
    this.setState({
      name: '',
      profile_text: ''
    });
    firebaseDb.ref(`users/${key}`).update({
      name: this.state.name,
      profile_text: this.state.profile_text
    });
  }

  render(){
    const params = this.props.match
    let uid = params.params.uid
    let topics = this.props.topics
    let users = this.props.users
    let user = users.filter(e => e.uid === uid)[0]
    let filtered_topics = topics.filter(e => e.uid === uid)
  
    return (
      <div className="user-page">
        <Button className="button" onClick={this.handleToTopicListPage}>
          Topic List
        </ Button>
        <div className="profile">
          <div className="profile-img">
            <img src={user.photo_url} />
          </div>
          <div className="likes">
            ❤
          </div>
          <input
            name="profile_text"
            type="text"
            onChange={ this.handleChange }
            placeholder={user.profile_text}
            value={this.state.profile_text}
          />
        </div>
        <button type="submit" onClick={e => this.handleSubmit(e,user.id)}>Submit</button>
        {filtered_topics.map((topic) =>
          <div className="topic">{topic.title}</div>
        )}
      </div>
    );
  }
}

export default User;
