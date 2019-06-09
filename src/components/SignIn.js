import React from 'react';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import Button from '@material-ui/core/Button';
import { topicsRef, usersRef, authRef} from "../config/firebase";

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
    authRef.onAuthStateChanged(user => {
      this.setState({
        loading: false,
        user: user
      });
      
      //uidで照合してupdateなのかnewなのか判定する必要
      //usersRef.push().set({uid: user.uid, name: user.displayName, email: user.email, photo_url: user.photoURL, provider_id: user.providerData[0].providerId});
    });
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
        Username: {this.state.user && this.state.user.displayName}
        <br />
        {this.state.user ?
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

export default SignIn;


