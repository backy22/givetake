import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { withRouter } from 'react-router';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import TopicList from '../components/TopicList'

const getTopics = (topics) => {
  return topics
}

const mapStateToProps = state => {
  return {
    topics: getTopics(state.topics)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    add_user: () => dispatch({ type: 'ADD_USER' }),
    add_topic: () => dispatch({ type: 'ADD_TOPIC' })
  }
}

const Home = connect(
  mapStateToProps,
  mapDispatchToProps
)(TopicList)

export default Home

