import React from 'react';
import ReactDOM from 'react-dom';
//import { Provider } from 'react-redux'
//import { createStore } from 'redux'
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import './index.css';
import User from './User';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase';
import SignIn from './SignIn';
import TopicList from './TopicList';
import Button from '@material-ui/core/Button';

class App extends React.Component {
  render() {
    return(
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path={'/'} component={TopicList} />
            <Route path= {'/signin'} component={SignIn} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
