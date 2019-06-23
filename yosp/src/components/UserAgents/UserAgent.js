import React, { PureComponent } from 'react';
import UserAgentsDesktop from './UserAgentsDesktop';
import UserAgentsMobile from './UserAgentsMobile';
import './styles.css';



class UserAgent extends PureComponent {
  state = {
    statisticsCountD: 0,
    statisticsCountM: 0,
  }

  setStatistics = (count, type) => {
    switch (type) {
      case 'desktop':
        this.setState({
          statisticsCountD: count
        })
        break;
      case 'mobile':
        this.setState({
          statisticsCountM: count
        })
        break;

      default:
        break;
    }
  }

  render() {
    const { statisticsCountD, statisticsCountM } = this.state;
    return (
      <div className="user-agent-wrapper">
        <h1 className="user-agent__headline">Useragents</h1>
        <h2>Statistics</h2>
        <div className="user-agent__statistic-windows">
          <div className="user-agent__statistic-windows__statistics-panel desktop">
            <h3 className="user-agent__statistic-windows__statistics-panel__headline">Desktop useragents</h3>
            <p className="user-agent__statistic-windows__statistics-panel__count" >{statisticsCountD}</p>
          </div>
          {/* <div className="user-agent__statistic-windows__statistics-panel mobile">
            <h3 className="user-agent__statistic-windows__statistics-panel__headline">Mobile useragents</h3>
            <p className="user-agent__statistic-windows__statistics-panel__count">{statisticsCountM}</p>
          </div> */}
        </div>
        <UserAgentsDesktop setStatistics={this.setStatistics} />
        {/* <UserAgentsMobile setStatistics={this.setStatistics} /> */}
      </div>


    );
  }
}



export default (UserAgent);