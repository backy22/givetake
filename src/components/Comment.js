import React from 'react';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { withRouter } from 'react-router';
import { connect } from 'react-redux'
import { fetchUser } from '../actions/authActions';
import { fetchUsers } from '../actions/userActions';
import { fetchComments } from '../actions/commentActions';
import PropTypes from 'prop-types';
import { getUserImg, getUserName, formatDate } from '../utility.js';

class Comment extends React.Component {

  componentDidMount(){
    this.props.fetchComments(this.props.topic);
  }

  render() {
    const topic = this.props.topic;
    const comments = this.props.comments.comments;
    if (comments == null){
      return null
    }
    return (
      <div>
        {Object.keys(comments).map((key) => (
          <div key={key} className={(this.props.auth && comments[key].uid === this.props.auth.uid) ? "my-comment comment" : "comment"}> 
            {this.props.auth && (comments[key].uid !== this.props.auth.uid) &&
              <div className="user-img my-user-img">
                <Link to={"/user/" + comments[key].uid}>
                    <img src={getUserImg(this.props.users.users.filter(e => e.id === comments[key].uid)[0])} />
                    <div className="user-name">
                      {getUserName(this.props.users.users.filter(e => e.id === comments[key].uid)[0])}
                    </div>
                </Link>
              </div>
            }
            <div className="comment-body">{comments[key].comment}</div>
            <div className="date">{formatDate(comments[key].date.toDate())}</div>
          </div>
        ))}
      </div>
    );
  }
}

Comment.propTypes = {
  fetchComments: PropTypes.func.isRequired,
  fetchUsers: PropTypes.func.isRequired,
  fetchUser: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired
};

const mapStateToProps = (state) => {
    return state;
}

export default connect(mapStateToProps, {fetchComments, fetchUsers, fetchUser})(Comment);

