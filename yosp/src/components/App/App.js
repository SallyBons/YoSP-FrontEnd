import React, {PureComponent} from 'react';
import {
  BrowserRouter, Route, Switch, 
} from 'react-router-dom';
import RegistrationForm from '../RegistrationForm';
import MainPage from '../MainPage';
import 'uikit/dist/css/uikit.min.css';

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
       </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
