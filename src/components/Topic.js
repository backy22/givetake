import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { withRouter } from 'react-router';
import Button from '@material-ui/core/button';
import { connect } from 'react-redux'
import { topicsRef, usersRef, authRef } from "../config/firebase";
import { fetchTopics, updateTopic } from '../actions/topicActions';
import { fetchUser } from '../actions/authActions';
import { fetchUsers } from '../actions/userActions';
import PropTypes from 'prop-types';
import Comment from './Comment';
import {getUserImg, getUserName} from '../utility.js';
import {Edit, Trash, Check} from '@material-ui/icons';

class Topic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      text: '',
      editing: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleToTopicListPage = () => {
    this.props.history.push('/')
  }

  componentDidMount(){
    this.props.fetchTopics();
    this.props.fetchUsers();
    this.props.fetchUser();
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

  handleSubmit = (e,topic) => {
    this.setState({
      editing: false
    });
    topic['title'] = this.state.title
    topic['text'] = this.state.text
    console.log(topic)
    this.props.updateTopic(topic) 
  }

  render(){
    const params = this.props.match
    let topic_id = params.params.id
    let topics = this.props.topics.topics
    let topic = topics.filter(e => e.id === topic_id)[0];
    let editButton;
    let topicTitle;
    let topicText;
    if (topic){
      if (this.state.editing){
        topicTitle = (
          <input
            name="title"
            type="text"
            onChange={this.handleChange}
            defaultValue={topic.title}
            value={this.state.title}
          />
        );
        topicText = (
          <input
            name="text"
            type="text"
            onChange={this.handleChange}
            defaultValue={topic.text}
            value={this.state.text}
          />
        );
        editButton = (<Check onClick={(e) => this.handleSubmit(e,topic)} />);
      }else{
        topicTitle = (<div className="topic-title">{topic.title}</div>);
        topicText = (<div className="topic-body">{topic.text}</div>);
        editButton = (<Edit onClick={() => this.startEditing()} />);
      }
    }

    return (
      <div>
        <Button onClick={this.handleToTopicListPage}>
          Home
        </Button>
          {topic && (
          <div>
            <div className="topic">
              <Link to={"/user/" + topic.uid} >
                <div className="user-img">
                  <img src={getUserImg(this.props.users.users.filter(e => e.uid === topic.uid)[0])} />
                  <div className="user-name">
                    {getUserName(this.props.users.users.filter(e => e.uid === topic.uid)[0])}
                  </div>
                </div>
              </Link>
              {topicTitle}
              {topicText}
              {editButton}
            </div>
            <div><Comment topic={topic} /></div>
          </div>
          )}
      </div>
    );
  }
}

Topic.propTypes = {
  fetchTopics: PropTypes.func.isRequired,
  fetchUsers: PropTypes.func.isRequired,
  fetchUser: PropTypes.func.isRequired,
  topics: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired,
  newTopic: PropTypes.object
};

const mapStateToProps = (state) => {
  return state;
}

export default withRouter(connect(mapStateToProps, {fetchTopics, fetchUsers, fetchUser, updateTopic})(Topic));

