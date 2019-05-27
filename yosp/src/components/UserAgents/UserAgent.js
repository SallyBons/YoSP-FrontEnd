import React, { PureComponent } from 'react';
import UserAgentsDesktop from './UserAgentsDesktop';
import UserAgentsMobile from './UserAgentsMobile';



class UserAgent extends PureComponent {

  render() {
      return (
      <div  className="user-agent-wrapper">
        <UserAgentsDesktop />
        <UserAgentsMobile />
      </div>


    );
  }
}



export default (UserAgent);