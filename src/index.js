import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { withRouter } from 'react-router';
import './index.css';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase';
import SignIn from './components/SignIn';
import TopicList from './components/TopicList';
import Topic from './components/Topic';
import AddTopic from './components/AddTopic';
import User from './components/User';
import Button from '@material-ui/core/button';
import store from './store';
import logo from './logo-white.png';

class App extends React.Component {
  render() {
    return(
      <div>
        <header>
        <Link to={'/'}>
          <img className="logo" src={logo} />
        </Link>
        <Link to={'/signin'}>
          <div className="signin">Sign In | Login </div>
        </Link>
        </header>
        <Switch>
          <Route exact path={'/'} component={TopicList} />
          <Route path={'/topic/:id'} component={Topic} />
          <Route path={'/user/:uid'} component={User} />
          <Route path= {'/signin'} component={SignIn} />
          <Route path= {'/add-topic'} component={AddTopic} />
        </Switch>
      </div>
    );
  }
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)

serviceWorker.unregister();
