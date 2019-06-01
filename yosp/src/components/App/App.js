import React, {PureComponent} from 'react';
import {
  BrowserRouter, Route, Switch, 
} from 'react-router-dom';
import RegistrationForm from '../RegistrationForm';
import MainPage from '../MainPage';
import 'uikit/dist/css/uikit.min.css';
import 'uikit/dist/js/uikit.min.js';
import LogIn from '../LogIn';
import UserAgent from '../UserAgents/UserAgent';
import AlertPanel from '../AlertPanel';

class App extends PureComponent {
  componentDidMount() {
    document.title = 'YoSP: Dashboard';
  }

  render() {
    return (
      <BrowserRouter>
      <div>
      <AlertPanel />
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
       </Switch>
       </div>
      </BrowserRouter>
      
      
    );
  }
}

export default App;
