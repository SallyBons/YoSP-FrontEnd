import React, { PureComponent } from 'react';
import {
  BrowserRouter, Route, Switch, Redirect
} from 'react-router-dom';
import RegistrationForm from '../Identification/RegistrationForm';
import 'uikit/dist/css/uikit.min.css';
import 'uikit/dist/js/uikit.min.js';
import LogIn from '../Identification/LogIn';
import UserAgent from '../UserAgents/UserAgent';
import GLOBAL_CONFIG from '../../config';
import Dashboard from '../Dashboard/Dashboard'
import Cookies from 'universal-cookie';
import { loadUser } from '../../reducer/user';
import { addAlert } from '../../reducer/alerts';
import { connect } from 'react-redux';
import Logout from '../Identification/Logout';
import Proxies from '../Proxies/Proxies'
import Sidebars from '../../components/Special/Sidebars';
import AlertPanel from '../Alerts/AlertPanel'
import './styles.css';
import AddProxy from '../Proxies/AddProxy';
// import EditProxy from '../Proxies/EditProxy';
import { selectUser } from '../../reducer/user';

class App extends PureComponent {

  checkBack = () => {
    let { addAlert } = this.props;
    fetch(`${GLOBAL_CONFIG.backendUrl}/ping`)//request for status
      .catch(() => {
        addAlert("danger", "BackEnd is not responding");
      })
  }

  componentDidMount() {
    document.title = 'YoSP: Dashboard';
    this.checkBack();

    let { loadUser } = this.props;

    loadUser(this.checkExistingCookies());

  }

  checkExistingCookies = () => {
    const cookies = new Cookies();
    return cookies.get('user');
  }

  render() {

    return (

      <BrowserRouter>
        <div className="app-content">

          <div className="alert-panel">
            <AlertPanel />
          </div>
          
          <Sidebars />

          <Route exact path="/" render={() => (
            this.checkExistingCookies() ? (
              <Redirect to="/dashboard" />
            ) : (
                <Redirect to="/login" />
              )
          )} />

          <div className="page-content">
            <Switch>
              <Route exact
                path="/login"
                render={() => <LogIn />}
              // render={() => <Sidebars />}
              />
              <Route
                path="/registration"
                render={() => <RegistrationForm />}
              />
              <Route
                path="/logout"
                render={() => <Logout />}
              />
              <Route
                path="/useragents"
                render={() => <UserAgent />}
              />
              <Route exact
                path="/proxies"
                render={() => <Proxies />}
              />
              <Route exact
                path="/proxies/add"
                component={AddProxy}
              />
              {/* <Route exact
                path="/proxies/edit"
                component={EditProxy}
              /> */}
              <Route
                path="/dashboard"
                render={() => <Dashboard />}
              />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
const mapStateToProps = state => ({
  user: selectUser(state)
});
const mapDispatchToProps = {
  loadUser,
  addAlert,
};

export default connect(mapStateToProps, mapDispatchToProps)(App)
