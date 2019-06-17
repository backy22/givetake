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
import CommentForm from './CommentForm';
import {getUserImg, getUserName} from '../utility.js';

class Comment extends React.Component {

  render() {
    const comments = this.props.topic.comments;
    if (comments == null){
      return (
        <CommentForm topic={this.props.topic} />
      );
    }
    return (
      <div>
        {Object.keys(comments).map((key) => (
          <div className="comment">
            <Link to={"/user/" + comments[key].uid}>
              <div className="user-img">
                <img src={getUserImg(this.props.users.users.filter(e => e.uid === comments[key].uid)[0])} />
                <div className="user-name">
                  {getUserName(this.props.users.users.filter(e => e.uid === comments[key].uid)[0])}
                </div>
              </div>
            </Link>
            <div className="comment-body">{comments[key].comment}</div>
          </div>
        ))}
        <CommentForm topic={this.props.topic}/>
      </div>
    );
  }
}

Comment.propTypes = {
  fetchUsers: PropTypes.func.isRequired,
  fetchUser: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
    return state;
}

const mapDispatchToProps = dispatch => {
  return {
    fetchUsers: () => { dispatch(fetchUsers()) },
    fetchUser: () => { dispatch(fetchUser()) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment);

