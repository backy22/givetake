import React from 'react';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import Button from '@material-ui/core/Button';
import { topicsRef, usersRef, authRef} from "../config/firebase";
import { connect } from 'react-redux'
import { fetchUser } from '../actions/authActions';

const uiConfig = {
  signInFlow: 'popup',
  signInSuccessUrl: '/',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ]
};

class SignIn extends React.Component {
  state = {
    loading: true,
    user: null
  };

  componentDidMount() {
    this.setState({
      loading: false
    });
    this.props.fetchUser(this.state.user)
  }

  logout() {
    authRef.signOut();
  }

  handleToTopicListPage = () => {
    this.props.history.push('/')
  }

   render() {
    if (this.state.loading) return <div>loading</div>;
    return ( 
      <div>
        <Button onClick={this.handleToTopicListPage}>
          Home
        </Button>
        Username: {this.props.auth && this.props.auth.displayName}
        <br />
        {this.props.auth ?
          (<button onClick={this.logout}>Logout</button>) :
          (<SignInScreen />)
        }
      </div>
    );
  }
}
 
const SignInScreen = (props) => {
  return (
    <div>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={authRef} />
    </div>
  );
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, {fetchUser})(SignIn);

