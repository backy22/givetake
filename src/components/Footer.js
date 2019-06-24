import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux'
import { fetchUser } from '../actions/authActions';
import Button from '@material-ui/core/button';
import Add from '@material-ui/icons/Add';
import Home from '@material-ui/icons/Home';
import Chat from '@material-ui/icons/Chat';

class Footer extends React.Component {

  componentDidMount(){
    this.props.fetchUser();
  }

  handleToAddTopicPage = () => {
    this.props.history.push('/add-topic')
  }

  handleToMyPage = () => {
    var user = this.props.auth;
    this.props.history.push('/user/'+ user.uid)
  }
 
  render(){
    return (
      <div>
        {this.props.auth && (
          <footer>
            <div className="footer-icons">
              <Button>
                <Chat />
              </Button>
              <Button onClick={this.handleToAddTopicPage}>
                <Add />
              </Button>
              <Button onClick={this.handleToMyPage} >
                <Home />
              </Button>
            </div>
          </footer>
        )}
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return state;
}

export default withRouter(connect(mapStateToProps, {fetchUser})(Footer));
