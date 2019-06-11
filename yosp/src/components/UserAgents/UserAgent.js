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
        <h1 className="statistic-text">Useragents</h1>
        <h2 className="statistic-text">
          Statistics
        </h2>
        <div className="statistic-windows">
          <div className="statistics-panel desktop">
            <h3 className="headerd">Desktop useragents</h3>
            <p>{statisticsCountD}</p>
          </div>
          <div className="statistics-panel mobile">
            <h3 className="headerm">Mobile useragents</h3>
            <p>{statisticsCountM}</p>
          </div>
        </div>
        <UserAgentsDesktop setStatistics={this.setStatistics} />
        <UserAgentsMobile setStatistics={this.setStatistics} />
      </div>


    );
  }
}



export default (UserAgent);