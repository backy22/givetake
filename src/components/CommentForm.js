import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment, fetchComments } from '../actions/commentActions';
import { fetchUser } from '../actions/authActions';
import { fetchTopics } from '../actions/topicActions';
import { withRouter } from 'react-router';
import { Send } from '@material-ui/icons';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      uid: '',
      date: ''
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
      uid: '',
      date: ''
    });
    var user = this.props.auth;

    const comment = {
      comment: this.state.comment,
      uid: user.uid,
      date: new Date()
    };

    this.props.addComment(comment,this.props.topic);
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
          <Button type="submit"><Send /></Button>
        </form>
      </div>
    );
  }
}

CommentForm.propTypes = {
  fetchTopics: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired,
  fetchComments: PropTypes.func.isRequired,
  fetchUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return state;
};

export default withRouter(connect(mapStateToProps, {fetchTopics, addComment, fetchUser, fetchComments})(CommentForm));
