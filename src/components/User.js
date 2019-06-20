import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link } from "react-router-dom";
import { withRouter } from 'react-router';
import AddTopic from './AddTopic';
import { firebaseDb, topicsRef, usersRef, authRef } from "../config/firebase";
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux'
import { fetchTopics, updateTopic } from '../actions/topicActions';
import { fetchUser } from '../actions/authActions';
import { fetchUsers, updateUser } from '../actions/userActions';
import PropTypes from 'prop-types';
import {Edit, Check} from '@material-ui/icons';
import Switch from '@material-ui/core/Switch';

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      profile_text: '',
      editing: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCheckChange = this.handleCheckChange.bind(this);
  }

  componentDidMount(){
    this.props.fetchTopics();
    this.props.fetchUsers();
    this.props.fetchUser();
  }
 
  handleToTopicListPage = () => {
    this.props.history.push('/')
  }

  startEditing = () => {
    this.setState({
      editing: true
    });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = (e,user) => {
    this.setState({
      editing: false
    });
    user['name'] = this.state.name
    user['profile_text'] = this.state.profile_text
    this.props.updateUser(user) 
  }

  handleCheckChange = (e,topic) => {
    topic['active'] = e.target.checked
    this.props.updateTopic(topic)
    this.props.fetchTopics();
  };

  render(){
    const params = this.props.match
    let uid = params.params.uid
    let topics = this.props.topics.topics
    let users = this.props.users.users
    let user = users.filter(e => e.uid === uid)[0]
    let current_user = this.props.auth
    let filtered_topics = topics.filter(e => e.uid === uid)
    let give_topics = filtered_topics.filter(e => e.type === "give")  
    let take_topics = filtered_topics.filter(e => e.type == "take")
    let userName;
    let profileText;
    let editButton;

    if (user){
      if (this.state.editing){
        userName = (
          <input
            name="name"
            type="text"
            onChange={this.handleChange}
            defaultValue={user.name}
            value={this.state.name}
          />
        );
        profileText = (
          <input
            name="profile_text"
            type="text"
            onChange={this.handleChange}
            defaultValue={user.profile_text}
            value={this.state.profile_text}
          />
        );
        editButton = (<Check onClick={(e) => this.handleSubmit(e,user)} />);
      }else{
        userName = (<div className="user-name">{user.name}</div>);
        profileText = (<div>{user.profile_text}</div>);
        editButton = (<Edit onClick={() => this.startEditing()} />);
      }
    }
  
    return (
      <div className="user-page">
        <Button className="button" onClick={this.handleToTopicListPage}>
          Topic List
        </ Button>
        {user && (
          <div>
            <div>GIVE{give_topics.length}</div>
            <div className="profile">
              <div className="user-img">
                <img src={user.photo_url} />
                {userName}
              </div>
            </div>
            <div className="likes">❤</div>
            <div>
              {profileText}
              {editButton}
            </div>
            <div>TAKE{take_topics.length}</div>
          </div>
        )}
        {filtered_topics.map((topic) =>
          <div>
            <Link to={"/topic/" + topic.id}>
              <div className="topic-title">{topic.title} {topic.type}</div>
            </Link>
            <Switch
              checked={topic.active ? true : false}
              onChange={(e) => this.handleCheckChange(e,topic)}
            />
          </div>
        )}
      </div>
    );
  }
}

User.propTypes = {
  fetchTopics: PropTypes.func.isRequired,
  fetchUsers: PropTypes.func.isRequired,
  fetchUser: PropTypes.func.isRequired,
  topics: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired,
  user: PropTypes.object,
  newTopic: PropTypes.object
};

const mapStateToProps = (state) => {
    return state;
}

export default connect(mapStateToProps, {fetchTopics, updateTopic, fetchUsers, fetchUser, updateUser})(User);
