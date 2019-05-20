import React, {PureComponent} from 'react';
import {
  BrowserRouter, Route, Switch, 
} from 'react-router-dom';
import RegistrationForm from '../RegistrationForm';
import MainPage from '../MainPage';
import 'uikit/dist/css/uikit.min.css';
import LogIn from '../LogIn';

class App extends PureComponent {
  componentDidMount() {
    document.title = 'YoSP: Dashboard';
  }

  render() {
    return (
      <BrowserRouter>
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
       </Switch>
      </BrowserRouter>
    );
  }
}

export default App;