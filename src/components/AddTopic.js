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
      type: ''
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
      type: ''
    });
    var user = this.props.auth
  
    const topic = {
      title: this.state.title,
      text: this.state.text,
      type: this.state.type,
      uid: user.uid
    }
    this.props.addTopic(topic);
    this.props.history.push('/')
  }

  render() {
    return (
      <div className="AddTopic">
        <Select
          name="type"
          label="select type"
          value={this.state.type}
          onChange={this.handleChange}
        >
          <MenuItem value="give">GIVE</MenuItem>
          <MenuItem value="take">TAKE</MenuItem>
        </Select>
        <TextField
          name="title"
          type="text"
          id="outlined-disabled"
          label="Topic title"
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
