import React from 'react';
import * as firebase from 'firebase';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux'
import { fetchTopics, addTopic } from '../actions/topicActions';
import { fetchUser } from '../actions/authActions';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';


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
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = e => {
    this.setState({
      title: '',
      text: ''
    });
    var user = this.props.auth
  
    const topic = {
      title: this.state.title,
      text: this.state.text,
      uid: user.uid
    }
    this.props.addTopic(topic);
    this.props.history.push('/')
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
      <TextField
        name="title"
        type="text"
        id="outlined-disabled"
        label="Topic title"
        defaultValue="Hello World"
        margin="normal"
        variant="outlined"
        onChange={ this.handleChange }
        value={ this.state.title }
      />
      <TextField
        name="text"
        type="text"
        id="outlined-disabled"
        label="Explain"
        defaultValue="Hello World"
        margin="normal"
        variant="outlined"
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

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, {addTopic, fetchUser})(AddTopic);
