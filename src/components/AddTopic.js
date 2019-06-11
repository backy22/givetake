import React from 'react';
import * as firebase from 'firebase';
import { topicsRef, usersRef, authRef } from "../config/firebase";
import Button from '@material-ui/core/Button';

class AddTopic extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      text: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = e => {
    this.setState({
      title: '',
      text: ''
    });
    var field = this.state;
    var user = authRef.currentUser;
    field['uid'] = user.uid
    topicsRef.push().set(field);
  }

  handleToTopicListPage = () => {
    this.props.history.push('/')
  }

  render() {
    return (
      <div className="AddTopic">
        <Button onClick={this.handleToTopicListPage}>
          Topic List
        </Button>
        <input
          name="title"
          type="text"
          placeholder="Write the title of your title"
          onChange={ this.handleChange }
          value={ this.state.title }
        />
        <input
          name="text"
          type="text"
          placeholder="Write the title of your text"
          onChange={ this.handleChange }
          value={ this.state.text }
        />
        <button
          type="submit"
          onClick={ this.handleSubmit }
        >
          Submit
        </button>
      </div>
    );
  }
 }

export default AddTopic;
