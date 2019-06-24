import React from 'react';
import * as firebase from 'firebase';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux'
import { fetchTopics, addTopic } from '../actions/topicActions';
import { fetchUser } from '../actions/authActions';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';

class AddTopic extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      text: '',
      type: '',
      date: ''
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
      text: '',
      type: '',
      date: ''
    });
    var user = this.props.auth
  
    const topic = {
      title: this.state.title,
      text: this.state.text,
      type: this.state.type,
      uid: user.uid,
      date: new Date(),
      active: true
    }
    this.props.addTopic(topic);
    this.props.history.push('/')
  }

  render() {
    return (
      <div className="add-topic-page">
        <div className="type-select">
          <Select
            name="type"
            fullWidth
            label="select type"
            value={this.state.type}
            onChange={this.handleChange}
          >
            <MenuItem value="give">GIVE</MenuItem>
            <MenuItem value="take">TAKE</MenuItem>
          </Select>
        </div>
        <div className="topic-title">
          <TextField
            name="title"
            fullWidth
            id="outlined-disabled"
            type="text"
            label="Topic title"
            margin="normal"
            onChange={ this.handleChange }
            value={ this.state.title }
          />
        </div>
        <div className="topic-body">
          <TextField
            name="text"
            type="text"
            fullWidth
            id="outlined-disabled"
            label="Explain"
            margin="normal"
            onChange={ this.handleChange }
            value={ this.state.text }
          />
        </div>
        <Button
          type="submit"
          onClick={ this.handleSubmit }
        >
          Submit
        </Button>
      </div>
    );
  }
 }

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, {addTopic, fetchUser})(AddTopic);
