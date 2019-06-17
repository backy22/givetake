import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { withRouter } from 'react-router';
import AddTopic from './AddTopic';
import { firebaseDb, topicsRef, usersRef, authRef } from "../config/firebase";
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux'
import { fetchTopics } from '../actions/topicActions';
import { fetchUser } from '../actions/authActions';
import { fetchUsers } from '../actions/userActions';
import PropTypes from 'prop-types';

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      profile_text: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    this.props.fetchTopics();
    this.props.fetchUsers();
    this.props.fetchUser();
  }
 
  handleToTopicListPage = () => {
    this.props.history.push('/')
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = (e,key) => {
    this.setState({
      name: '',
      profile_text: ''
    });
    firebaseDb.ref(`users/${key}`).update({
      name: this.state.name,
      profile_text: this.state.profile_text
    });
  }

  render(){
    const params = this.props.match
    let uid = params.params.uid
    let topics = this.props.topics.topics
    let users = this.props.users.users
    let user = users.filter(e => e.uid === uid)[0]
    let current_user = this.props.auth
    let filtered_topics = topics.filter(e => e.uid === uid)
  
    return (

      <div className="user-page">
        <Button className="button" onClick={this.handleToTopicListPage}>
          Topic List
        </ Button>
       {user && (
        <div className="profile">
          <div className="user-img">
            <div>
              <img src={user.photo_url} />
            <div className="user-name">
              {user.name}
            </div>
              </div>
          </div>
          <div className="likes">
            ❤
          </div>
          <input
            name="profile_text"
            type="text"
            onChange={ this.handleChange }
            placeholder={user.profile_text}
            value={this.state.profile_text}
          />
        </div>
       )}
        <button type="submit" onClick={e => this.handleSubmit(e,user.id)}>Submit</button>
        {filtered_topics.map((topic) =>
          <Link to={"/topic/" + topic.id}>
            <div className="topic-title">{topic.title}</div>
          </Link>
        )}
      </div>
    );
  }
}

User.propTypes = {
  fetchTopics: PropTypes.func.isRequired,
  fetchUsers: PropTypes.func.isRequired,
  fetchUser: PropTypes.func.isRequired,
  topics: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired,
  user: PropTypes.object,
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

export default connect(mapStateToProps, mapDispatchToProps)(User);
