import React from 'react';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { withRouter } from 'react-router';
import { connect } from 'react-redux'
import { fetchTopics, updateTopic } from '../actions/topicActions';
import { fetchUser } from '../actions/authActions';
import { fetchUsers } from '../actions/userActions';
import PropTypes from 'prop-types';
import Comment from './Comment';
import CommentForm from './CommentForm';
import { getUserImg, getUserName } from '../utility.js';
import { Edit, Check } from '@material-ui/icons';
import Input from '@material-ui/core/Input';

class Topic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      text: '',
      editing: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    this.props.fetchTopics();
    this.props.fetchUsers();
    this.props.fetchUser();
  }

  startEditing = (e,topic) => {
    this.setState({
      title: topic.title,
      text: topic.text,
      editing: true
    });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = (e,topic) => {
    this.setState({
      editing: false
    });
    topic['title'] = this.state.title
    topic['text'] = this.state.text
    this.props.updateTopic(topic) 
  }

  render(){
    const params = this.props.match
    let topic_id = params.params.id
    let topics = this.props.topics.topics
    let topic = topics.filter(e => e.id === topic_id)[0];
    let editButton;
    let topicTitle;
    let topicText;
    let user = this.props.auth
    const link_class_name = user ? null : "disabled-link"

    if (topic){
      if (this.state.editing){
        topicTitle = (
          <div className="topic-title">
            <div className="title-input">
              <Input
                name="title"
                fullWidth
                type="text"
                onChange={this.handleChange}
                defaultValue={topic.title}
                value={this.state.title}
              />
            </div>
            <span className={topic.type+"-type type-icon"}>{topic.type}</span>
          </div>
        );
        topicText = (
          <div className="topic-body">
            <Input
              name="text"
              fullWidth
              type="text"
              onChange={this.handleChange}
              defaultValue={topic.text}
              value={this.state.text}
            />
          </div>
        );
        editButton = (<Check onClick={(e) => this.handleSubmit(e,topic)} />);
      }else{
        topicTitle = (
          <div className="topic-title">
            {topic.title}
            <span className={topic.type+"-type type-icon"}>{topic.type}</span>
          </div>
        );
        topicText = (<div className="topic-body">{topic.text}</div>);
        editButton = (<Edit onClick={(e) => this.startEditing(e,topic)} />);
      }
    }

    return (
      <div>
        {topic && (
          <div>
            <div className="topic-page">
              <div className="topic">
                <div className="user-img">
                  <Link className={link_class_name} to={"/user/" + topic.uid} >
                    <img src={getUserImg(this.props.users.users.filter(e => e.id === topic.uid)[0])} />
                    <div className="user-name">
                      {getUserName(this.props.users.users.filter(e => e.id === topic.uid)[0])}
                    </div>
                  </Link>
                </div>
                {topicTitle}
              </div>
              {user && (user.uid == topic.uid) && editButton}
              {topicText}
              <div className="comments"><Comment topic={topic} /></div>
            </div>
            {user && (
              <footer>
                <CommentForm topic={topic} />
              </footer>
            )}
          </div>
        )}
      </div>
    );
  }
}

Topic.propTypes = {
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

export default withRouter(connect(mapStateToProps, {fetchTopics, fetchUsers, fetchUser, updateTopic})(Topic));

