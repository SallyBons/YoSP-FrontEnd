import React, { PureComponent } from 'react';
import UserAgentsDesktop from './UserAgentsDesktop';
// import UserAgentsMobile from './UserAgentsMobile';
import './styles.css';
import { connect } from 'react-redux';
import { setCurrentPage } from '../../reducer/ui';



class UserAgent extends PureComponent {
  state = {
    statisticsCountD: 0,
    statisticsCountM: 0,
  }
  componentDidMount() {
    document.title = 'YoSP: User agents';
    const { setCurrentPage } = this.props;
    setCurrentPage("useragents")
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
    // const { statisticsCountD, statisticsCountM } = this.state;
       return (
      <div className="user-agent-wrapper">
        <h2 className="user-agent__headline">Useragents</h2>
        <p className="user-agent__headline-statistic" >Statistics</p>
        <div className="user-agent__statistic-windows">
          {/* <div className="user-agent__statistic-windows__statistics-panel desktop">
            <h3 className="user-agent__statistic-windows__statistics-panel__headline">Desktop useragents</h3>
            <p className="user-agent__statistic-windows__statistics-panel__count" >{statisticsCountD}</p>
          </div> */}
          {/* <div className="user-agent__statistic-windows__statistics-panel mobile">
            <h3 className="user-agent__statistic-windows__statistics-panel__headline">Mobile useragents</h3>
            <p className="user-agent__statistic-windows__statistics-panel__count">{statisticsCountM}</p>
          </div> */}
        </div>
        <div className = "user-agent-desktop__content" >
        <UserAgentsDesktop setStatistics={this.setStatistics} />
        </div>
       
        {/* <UserAgentsMobile setStatistics={this.setStatistics} /> */}
      </div>


    );
  }
}
const mapDispatchToProps = {
  setCurrentPage,
};



export default connect(null, mapDispatchToProps)(UserAgent);