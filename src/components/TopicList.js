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

class TopicList extends React.Component {
  constructor(props) {
    super(props);

    this.handleToSignInPage = this.handleToSignInPage.bind(this);
    this.handleToAddTopicPage = this.handleToAddTopicPage.bind(this);
    this.handleToMyPage = this.handleToMyPage.bind(this);
  }

  componentWillMount(){
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

  handleToMyPage = () => {
    var user = this.props.current_user;
    this.props.history.push('/user/'+ user.uid)
  }

  getUserImg(topic){
    let user = this.props.users.users.filter(e => e.uid === topic.uid)[0]
    if (user && user.photo_url){
      return user.photo_url
    }else{
      return null
    }
  }

  render(){
    const topics = this.props.topics.topics.map(topic =>(
      <div className="topic">
        <div className="user-img">
          <img src={this.getUserImg(topic)} />
        </div>
        <div className="topic-title">
          <Link to={"/topic/" + topic.id}>{topic.title}</Link>
          <Link to={"/user/" + topic.uid}>{topic.uid}</Link>
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

export default connect(mapStateToProps, mapDispatchToProps)(TopicList);

