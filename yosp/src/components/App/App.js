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
import ProxyManager from '../Proxies/ProxyManager'
import Sidebars from '../../components/Special/Sidebars';
import AlertPanel from '../Alerts/AlertPanel'
import './styles.css';
import AddProxy from '../Proxies/AddProxy';
import EditProxy from '../Proxies/EditProxy';
import { selectUser } from '../../reducer/user';
import Projects from '../Projects/ProjectManager'
import Users from '../Users/UserManager';
import AddProject from '../Projects/Creation/AddProject';
import EditProject from '../Projects/Creation/EditProject';
import ProjectCard from '../Projects/Creation/ProjectCard';
import NotFound from '../Special/NotFound';
import Keywords from '../Projects/Creation/Keywords';
import ProjectProxies from '../Projects/Creation/ProjectProxies';
import Chart from '../Projects/Creation/Chart';

class App extends PureComponent {

  checkBack = () => {
    let { addAlert } = this.props;
    fetch(`${GLOBAL_CONFIG.backendUrl}/ping`)//request for status
      .catch(() => {
        addAlert("danger", "BackEnd is not responding");
      })
  }

  componentDidMount() {
    // document.title = 'YoSP: Dashboard';
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

          <div className="alert-panel-container">
            <AlertPanel />
          </div>

          <Sidebars />

          <Route exact path="/404" render={() => (
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
              />
              <Route exact
                path="/registration"
                render={() => <RegistrationForm />}
              />
              <Route exact
                path="/logout"
                render={() => <Logout />}
              />
              <Route exact
                path="/useragents"
                render={() => <UserAgent />}
              />
              <Route exact
                path="/proxies"
                render={() => <ProxyManager />}
              />
              <Route exact
                path="/proxies/add"
                component={AddProxy}
              />
              <Route exact
                path="/proxies/edit"
                component={EditProxy}
              />
              <Route exact
                path="/dashboard"
                render={() => <Dashboard />}
              />
               <Route exact
                path="/projects"
                render={() => <Projects />}
              />
              <Route exact
                path="/users"
                render={() => <Users />}
              />
              <Route exact
                path="/projects/add"
                component={AddProject}
              />
              <Route exact path="/projects/:id" component={ProjectCard} />
              <Route exact
                path="/projects/:id/keywords"
                component={Keywords}
              />
              <Route exact
                path="/projects/:id/proxies"
                component={ProjectProxies}
              />
              <Route exact
                path="/projects/:id/edit"
                component={EditProject}
              />
              <Route exact
                path="/projects/:id/keywords/charts"
                component={Chart}
              />
              <Route
              path="/404"
              component={NotFound}
            />
            <Redirect to="/404" />
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
