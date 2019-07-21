import React, { PureComponent } from 'react';
import ProxyCard from './ProxyCard';
import { connect } from 'react-redux';
import '../styles.css';
import 'uikit/dist/css/uikit.min.css';
import GLOBAL_CONFIG from '../../../config';
import { selectUser } from '../../../reducer/user';
import { addAlert } from '../../../reducer/alerts';
import { setCurrentPage } from '../../../reducer/ui';


class ProjectProxies extends PureComponent {
    state = {
        proxies: [],
    }
    componentDidMount() {
        this.handleInitialize();
        document.title = 'YoSP: Project Proxies';
        const { setCurrentPage } = this.props;
        setCurrentPage("projects")
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
                    this.setState({ proxies: answer.proxies })
                }
            }).catch(() => {
                addAlert("danger", "Server is not responding. Something went wrong");
            });;
    }



    render() {
        let { proxies } = this.state;
        return (
            <div className="project-proxies-wrapper">
                <div className="project-proxies__header">
                    <h2 className="project-proxies__header__headline"> Proxies</h2>
                </div>
                <div className="project-proxies__content">
                    {proxies.map(proxy => (
                        <ProxyCard
                            key={Math.random()}
                            incomingProxy={proxy}
                            {...proxy}
                        />
                    ))}
                </div>
            </div>


        );
    }
}
const mapStateToProps = state => ({
    user: selectUser(state),
});
const mapDispatchToProps = {
    addAlert,
    setCurrentPage,
};





export default connect(mapStateToProps, mapDispatchToProps)(ProjectProxies)