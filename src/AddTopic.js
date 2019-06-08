import React from 'react';
import './App.css';
import * as firebase from 'firebase';

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
    this.props.addTopic(this.state);

    this.setState({
      title: '',
      text: ''
    });
  }

  render() {
    return (
      <div className="AddTopic">
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
