import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { withRouter } from 'react-router';
import { connect } from 'react-redux'
import { fetchUser } from '../actions/authActions';
import logo from '../logo-white.png';

class Header extends React.Component {

  componentDidMount(){
    this.props.fetchUser();
  }

  render(){
    return (
      <header>
        <Link to={'/'}>
          <img className="logo" src={logo} />
        </Link>
        <Link to={'/signin'}>
          <div className="signin">{this.props.auth ? "Logout" : "Sign In | Login"}</div>
        </Link>
      </header>
    );
  }

}

const mapStateToProps = (state) => {
  return state;
}

export default withRouter(connect(mapStateToProps, {fetchUser})(Header));
