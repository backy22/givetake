import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../actions/commentActions';
import { fetchUser } from '../actions/authActions';

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      uid: '',
      topic_id: ''
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
      topic_id: ''
    });
    var user = this.props.auth;

    const comment = {
      comment: this.state.comment,
      uid: user.uid,
      topic_id: this.props.topic.id
    };

    this.props.addComment(comment);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div>
            <label>Comment: </label>
            <br />
            <input
              type="text"
              name="comment"
              onChange={this.onChange}
              value={this.state.comment}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, {addComment, fetchUser})(CommentForm);

