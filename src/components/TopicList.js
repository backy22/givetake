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
import { getUserImg, getUserName } from '../utility.js';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';

class TopicList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search: ''
    };

    this.handleToAddTopicPage = this.handleToAddTopicPage.bind(this);
    this.handleToTopicPage = this.handleToTopicPage.bind(this);
    this.handleToUserPage = this.handleToUserPage.bind(this);
    this.handleToMyPage = this.handleToMyPage.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(){
    this.props.fetchTopics();
    this.props.fetchUsers();
    this.props.fetchUser();
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
    var user = this.props.auth;
    this.props.history.push('/user/'+ user.uid)
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render(){
    const topics = this.props.topics.topics.filter(
      (topic) => {
        return topic.title.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
      }
    );
    var user = this.props.auth
    const link_class_name = user ? null : "disabled-link"
    const topics_screen = topics.map(topic =>(
      <div className="topic">
        <div className="user-img">
          <Link className={link_class_name} onClick={this.handleToUserPage.bind(this, topic)}>
            <img src={getUserImg(this.props.users.users.filter(e => e.id === topic.uid)[0])} />
            <div className="user-name">
              {getUserName(this.props.users.users.filter(e => e.id === topic.uid)[0])}
            </div>
          </Link>
        </div>
        <div className="topic-title">
          <div onClick={this.handleToTopicPage.bind(this, topic)}>
            {topic.title}
          </div>
          <span className={topic.type+"-type type-icon"}>{topic.type}</span>
        </div>
        <div className="date">{topic.date.toDate().toString()}</div>
      </div>
    ));

    return (
    <div>
      <BrowserRouter>
        <div className="search">
          <div>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            name="search"
            value={this.state.search}
            onChange={this.handleChange}
          />
        </div>
        <div className="topic-list">
          {topics_screen}
        </div>
      </BrowserRouter>
      {user &&     
      <footer>
        <Button onClick={this.handleToAddTopicPage}>
          Add Topic
        </Button>
        <Button onClick={this.handleToMyPage} >
          My Page
        </Button>
      </footer>
      }
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
