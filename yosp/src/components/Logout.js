import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {selectUser, loadUser} from '../reducer/user';

class LogOut extends Component {
    
    componentDidMount() {
      const {loadUser} = this.props;
      loadUser({});
    }

    render() {
      const {history} = this.props;
      history.goBack();
      return (
        <div />
      );
    }
}

const mapStateToProps = state => ({
  user: selectUser(state)
});

export default connect(null, {mapStateToProps, loadUser})(withRouter(LogOut));