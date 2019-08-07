import React, { PureComponent } from 'react';
import ProxyCard from './ProxyCard';
import { connect } from 'react-redux';
import '../styles.css';
import 'uikit/dist/css/uikit.min.css';
import GLOBAL_CONFIG from '../../../config';
import { selectUser } from '../../../reducer/user';
import { selectProject } from '../../../reducer/projects';
import { addAlert } from '../../../reducer/alerts';
import { loadProxy, selectProxy, sendProxiesToServer } from '../../../reducer/proxies';
import { setCurrentPage } from '../../../reducer/ui';


class ProjectProxies extends PureComponent {
    state = {
        proxyList: [],
    }
    componentDidMount() {
        this.handleInitialize();
        document.title = 'YoSP: Project Proxies';
        const { setCurrentPage } = this.props;
        setCurrentPage("projects");
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.proxies === nextProps.proxies) {
            return true

        } else {
            return false
        }
    }

    handleInitialize() {
        setTimeout(() => {
            let { user } = this.props;
            this.getListOfProxies(user)//without this we have empty user at props on initialazing
        }, 1);
    }

    getListOfProxies = (user) => {
        let { addAlert } = this.props;
        fetch(`${GLOBAL_CONFIG.backendUrl}/proxies/get?token=${user.token}`)
            .then(result => result.text())
            .then(result => {
                let answer = JSON.parse(result);
                if (answer.error) {
                    addAlert("warning", answer.error);
                } else {
                    this.setState({ proxyList: answer.proxies })
                }
            }).catch(() => {
                addAlert("danger", "Server is not responding. Something went wrong");
            });;
    }

    updateSelectedProxies = (selectedProxy) => {
        let { loadProxy } = this.props;
        loadProxy(selectedProxy);
    }

    assignProxies=(user)=>{
        let {proxies,addAlert,project} = this.props;
        console.log(this.props);
        fetch(`${GLOBAL_CONFIG.backendUrl}/projects/assign-proxies?token=${user.token}&id=${project.id}`, {
            method: 'post',
            body: JSON.stringify({
              "proxies": [...proxies]
            })
          }).then(result => result.text())
            .then(result => {
              let answer = JSON.parse(result);
              if (answer.status === 200) {
               addAlert("success", "Proxies are added succesful")
              }
            }).catch(() => {
              addAlert("danger", "Server is not responding. Something went wrong");
            });;

    }


    render() {
        let { proxyList } = this.state;
        let { user } = this.props;
        return (
            <div className="project-proxies-wrapper">
                <div className="project-proxies__header">
                    <h2 className="project-proxies__header__headline"> Proxies</h2>
                </div>
                <div className="project-proxies__content">
                    {proxyList.map(proxy => (
                        <ProxyCard
                            key={proxy.id}
                            incomingProxy={proxy}
                            toggleUpdate={this.updateSelectedProxies}
                        />
                    ))}
                </div>
                <div className="project-proxies__button-wrapper">
                    <button className="project-proxies__button uk-button uk-button-default" onClick={()=>this.assignProxies(user)} >Save</button>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    user: selectUser(state),
    proxies: selectProxy(state),
    project:selectProject(state),
});

const mapDispatchToProps = {
    addAlert,
    setCurrentPage,
    loadProxy,
    sendProxiesToServer
    // selectProxy
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectProxies)