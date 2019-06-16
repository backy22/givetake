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

class Topic extends React.Component {
  handleToTopicListPage = () => {
    this.props.history.push('/')
  }

  componentWillMount(){
    this.props.fetchTopics();
    this.props.fetchUsers();
    this.props.fetchUser();
  }

  getUserImg(topic){
    let user = this.props.users.users.filter(e => e.uid === topic.uid)[0]
    if (user && user.photo_url){
      return user.photo_url
    }else{
      return null
    }
  }

  getUserName(topic){
    let user = this.props.users.users.filter(e => e.uid === topic.uid)[0]
    if (user && user.name){
      return user.name
    }else{
      return null
    }
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
                  <img src={this.getUserImg(topic)} />
                  <div className="user-name">
                    {this.getUserName(topic)}
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

export default connect(mapStateToProps, mapDispatchToProps)(Topic);

