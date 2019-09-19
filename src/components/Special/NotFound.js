import React, { PureComponent } from 'react';

import './styles.css';

class NotFound extends PureComponent {
  render() {
    console.log("fired")
    return (
      <div className="not-found-container">
        <p className="not-found-heading">404</p>
        <p className="not-found-text">Page not found</p>
      </div>
    )
  }
}
export default NotFound;