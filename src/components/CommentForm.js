import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment, fetchComments } from '../actions/commentActions';
import { fetchUser } from '../actions/authActions';
import { fetchTopics } from '../actions/topicActions';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { withRouter } from 'react-router';
import { Send } from '@material-ui/icons';
import TextField from '@material-ui/core/TextField';

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      uid: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    this.setState({
      comment: '',
      uid: ''
    });
    var user = this.props.auth;

    const comment = {
      comment: this.state.comment,
      uid: user.uid
    };

    this.props.addComment(comment,this.props.topic);
    this.props.fetchComments(this.props.topic);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div className="comment-form">
            <TextField
              type="text"
              fullWidth
              name="comment"
              variant="outlined"
              onChange={this.onChange}
              value={this.state.comment}
            />
          </div>
          <Send type="submit" />
        </form>
      </div>
    );
  }
}

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
  fetchComments: PropTypes.func.isRequired,
  fetchUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return state;
};

export default withRouter(connect(mapStateToProps, {addComment, fetchUser, fetchComments})(CommentForm));
