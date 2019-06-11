import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import 'uikit/dist/css/uikit.min.css';
import './styles.css';

class MainPage extends PureComponent {
  componentDidMount() {
    document.title = 'YoSP: Dashboard';
  }

  render() {
    return (

      <div className="test">
        <div >
          <Link to="/registration">Registration</Link>
        </div>
        <div >
          <Link to="/login">Login</Link>
        </div>
        {/* <div className="useragets" >
          <Link to="/dashboard/useragents">User Agent</Link>
        </div> */}

      </div>

    );
  }
}

export default MainPage;
