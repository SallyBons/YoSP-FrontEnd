import React, {PureComponent} from 'react';

// import UIkit from 'uikit';
import 'uikit/dist/css/uikit.min.css';

class App extends PureComponent {
  componentDidMount() {
    document.title = 'YoSP: Dashboard';
  }

  render() {
    return (
      <div>
        <button className="uk-button uk-button-default" type="button">Button</button>
      </div>
    );
  }
}

export default App;
