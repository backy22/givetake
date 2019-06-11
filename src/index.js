import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { withRouter } from 'react-router';
import './index.css';
import User from './components/User';
import AddTopic from './components/AddTopic';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase';
import SignIn from './components/SignIn';
import TopicList from './components/TopicList';
import Topic from './components/Topic';
import Home from './containers/Home';
import reducer from './reducers/reducer';
import Button from '@material-ui/core/button';
import { topicsRef, usersRef, authRef } from "./config/firebase";

const store = createStore(reducer)

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      topics: [],
      users: [],
      current_user: ''
    };

  }

  componentWillMount(){
    const previousTopics = this.state.topics;

    topicsRef.on('child_added', snap => {
      previousTopics.push({
        id: snap.key,
        title: snap.val().title,
        text: snap.val().text,
        uid: snap.val().uid,
        comments: snap.val().comments
      })

      this.setState({
        topics: previousTopics
      })
    })

    const previousUsers = this.state.users;

    usersRef.on('child_added', snap => {
      previousUsers.push({
        id: snap.key,
        uid: snap.val().uid,
        name: snap.val().name,
        profile_text: snap.val().profile_text,
        email: snap.val().email,
        photo_url: snap.val().photo_url,
        provider_id: snap.val().provider_id
      })

      this.setState({
        users: previousUsers
      })
    })

    this.setState({
      current_user: authRef.currentUser
    })

  }

  render() {
    return(
      <div>
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path={'/'} render={props => <TopicList topics={this.state.topics} users={this.state.users} {...props} />} />
            <Route path={'/topic/:id'} render={props => <Topic topics={this.state.topics} users={this.state.users} {...props} />} />
            <Route exact path={'/user/:uid'} render={props => <User topics={this.state.topics} users={this.state.users} {...props} />} />
            <Route path= {'/signin'} component={SignIn} />
            <Route path= {'/add-topic'} component={AddTopic} />
          </Switch>
        </div>
      </BrowserRouter>
      </div>
    );
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
