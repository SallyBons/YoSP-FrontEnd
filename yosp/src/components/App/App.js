import React, { PureComponent } from 'react';
import {
  BrowserRouter, Route, Switch,
} from 'react-router-dom';
import RegistrationForm from '../RegistrationForm';
import MainPage from '../MainPage';
import 'uikit/dist/css/uikit.min.css';
import 'uikit/dist/js/uikit.min.js';
import LogIn from '../LogIn';
import UserAgent from '../UserAgents/UserAgent';
import GLOBAL_CONFIG from '../../config';
import Sidebars from '../Sidebars';
import Dashboard from '../Dashboard/Dashboard'
import Cookies from 'universal-cookie';
import { loadUser } from '../../reducer/user';
import { addAlert } from '../../reducer/alerts';
import { connect } from 'react-redux';

class App extends PureComponent {
  componentDidMount() {
    let { loadUser,addAlert } = this.props;
    const cookies = new Cookies();
    document.title = 'YoSP: Dashboard';
    cookies.get('user');
    console.log(cookies.get('user'));
    loadUser(cookies.get('user'));
    fetch(`${GLOBAL_CONFIG.backendUrl}/user/add?name=&surname=&email=&password=`)//request for status
            .then(result => result.text())
            .then(result => {
                let answer = JSON.parse(result);
                if (answer.error) {
                    addAlert("ganger", "BackEnd is not responding");
                } 
            });
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          {/* <AlertPanel /> */}
           <Sidebars />
          <Switch>
            <Route path="/" component={MainPage} exact />
            <Route
              path="/registration"
              render={() => <RegistrationForm />}
            />
            <Route
              path="/login"
              render={() => <LogIn />}
            />
            <Route
              path="/dashboard/useragents"
              render={() => <UserAgent />}
            />
            <Route
              path="/dashboard/"
              render={() => <Dashboard />}
            />
          </Switch>
        </div>
      </BrowserRouter>


    );
  }
}
const mapDispatchToProps = {
  loadUser,
  addAlert,
};

export default connect(null, mapDispatchToProps)(App)
