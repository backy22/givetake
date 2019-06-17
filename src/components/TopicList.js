import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { withRouter } from 'react-router';
import Button from '@material-ui/core/button';
import { connect } from 'react-redux'
import { fetchTopics } from '../actions/topicActions';
import { fetchUser } from '../actions/authActions';
import { fetchUsers } from '../actions/userActions';
import PropTypes from 'prop-types';
import {getUserImg, getUserName} from '../utility.js';

class TopicList extends React.Component {
  constructor(props) {
    super(props);
    this.handleToSignInPage = this.handleToSignInPage.bind(this);
    this.handleToAddTopicPage = this.handleToAddTopicPage.bind(this);
    this.handleToTopicPage = this.handleToTopicPage.bind(this);
    this.handleToUserPage = this.handleToUserPage.bind(this);
    this.handleToMyPage = this.handleToMyPage.bind(this);
  }

  componentDidMount(){
    this.props.fetchTopics();
    this.props.fetchUsers();
    this.props.fetchUser();
  }

  handleToSignInPage = () => {
    this.props.history.push('/signin')
  }
  
  handleToAddTopicPage = () => {
    this.props.history.push('/add-topic')
  }

  handleToTopicPage = (topic) => {
    this.props.history.push('/topic/'+topic.id)
  }

  handleToUserPage = (topic) => {
    this.props.history.push('/user/'+topic.uid)
  }

  handleToMyPage = () => {
    var user = this.props.current_user;
    this.props.history.push('/user/'+ user.uid)
  }

  render(){
    const topics = this.props.topics.topics.map(topic =>(
      <div className="topic">
        <Link onClick={this.handleToUserPage.bind(this, topic)}> 
          <div className="user-img">
            <img src={getUserImg(this.props.users.users.filter(e => e.uid === topic.uid)[0])} />
            <div className="user-name">
              {getUserName(this.props.users.users.filter(e => e.uid === topic.uid)[0])}
            </div>
          </div>
        </Link>
        <div className="topic-title">
          <div onClick={this.handleToTopicPage.bind(this, topic)}>
            {topic.title}
          </div>
        </div>
      </div>
    ));

    return (
    <div>
      <Button onClick={this.handleToSignInPage}>
        Sign In
      </Button>

      <BrowserRouter>
        <div className="topic-list">
          {topics}
        </div>
      </BrowserRouter>
      
      <footer>
        <Button onClick={this.handleToAddTopicPage}>
          Add Topic
        </Button>
        <Button onClick={this.handleToMyPage} >
          My Page
        </Button>
      </footer>

    </div>
    );
  }
}

TopicList.propTypes = {
  fetchTopics: PropTypes.func.isRequired,
  fetchUsers: PropTypes.func.isRequired,
  fetchUser: PropTypes.func.isRequired,
  topics: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired,
  newTopic: PropTypes.object
};

const mapStateToProps = (state) => {
    return state;
}

const mapDispatchToProps = dispatch => {
  return {
    fetchTopics: () => { dispatch(fetchTopics()) },
    fetchUsers: () => { dispatch(fetchUsers()) },
    fetchUser: () => { dispatch(fetchUser()) }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TopicList));

