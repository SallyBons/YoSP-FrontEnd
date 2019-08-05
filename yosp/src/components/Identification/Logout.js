import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { selectUser, loadUser } from '../../reducer/user';
import {
  Redirect
} from 'react-router-dom';
import Cookies from 'universal-cookie';

class LogOut extends Component {

  componentDidMount() {
    const { loadUser } = this.props;
    loadUser(undefined);
    const cookies = new Cookies();
    cookies.remove('user')
  }

  render() {
    // const {history} = this.props;
    // history.goBack();
    return (
      <Redirect to="/login" />
    );
  }
}

const mapStateToProps = state => ({
  user: selectUser(state)
});

export default connect(null, { mapStateToProps, loadUser })(withRouter(LogOut));