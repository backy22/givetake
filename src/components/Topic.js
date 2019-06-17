import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { withRouter } from 'react-router';
import Button from '@material-ui/core/button';
import { connect } from 'react-redux'
import { topicsRef, usersRef, authRef } from "../config/firebase";
import { fetchTopics } from '../actions/topicActions';
import { fetchUser } from '../actions/authActions';
import { fetchUsers } from '../actions/userActions';
import PropTypes from 'prop-types';
import Comment from './Comment';
import {getUserImg, getUserName} from '../utility.js';

class Topic extends React.Component {
  handleToTopicListPage = () => {
    this.props.history.push('/')
  }

  componentDidMount(){
    this.props.fetchTopics();
    this.props.fetchUsers();
    this.props.fetchUser();
  }

  render(){
    const params = this.props.match
    let topic_id = params.params.id
    let topics = this.props.topics.topics
    let filtered_topics = topics.filter(e => e.id === topic_id);

    return (
      <div>
        <Button onClick={this.handleToTopicListPage}>
          Home
        </Button>
        {filtered_topics.map((topic) =>
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
              <div className="topic-title">{topic.title}</div>
              <div className="topic-body">{topic.text}</div>
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

const mapDispatchToProps = dispatch => {
  return {
    fetchTopics: () => { dispatch(fetchTopics()) },
    fetchUsers: () => { dispatch(fetchUsers()) },
    fetchUser: () => { dispatch(fetchUser()) }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Topic));

