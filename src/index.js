import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import './index.css';
import User from './components/User';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase';
import SignIn from './components/SignIn';
//import TopicList from './components/TopicList';
import Home from './containers/Home';
import Button from '@material-ui/core/Button';
import reducer from './reducers/reducer';

const store = createStore(reducer)

class App extends React.Component {
  render() {
    return(
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path={'/'} component={Home} />
            <Route path= {'/signin'} component={SignIn} />
          </Switch>
        </div>
      </BrowserRouter>
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
