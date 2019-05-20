import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import 'uikit/dist/css/uikit.min.css';

class MainPage extends PureComponent {
  componentDidMount() {
    document.title = 'YoSP: Dashboard';
  }

  render() {
    return (

      <div>
        <Link to="/registration">Registration</Link>
        <Link to="/login">Login</Link>
      </div>

    );
  }
}

export default MainPage;
