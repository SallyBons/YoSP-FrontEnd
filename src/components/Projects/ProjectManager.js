import React, { PureComponent } from 'react';
import 'uikit/dist/css/uikit.min.css';
import './styles.css';
import GLOBAL_CONFIG from '../../config';
import { Link } from 'react-router-dom';
import { selectUser } from '../../reducer/user';
import { addAlert } from '../../reducer/alerts';
import { setCurrentPage } from '../../reducer/ui';
import { connect } from 'react-redux';
import Project from './Creation/Project'

class ProjectManager extends PureComponent {
    state = {
        projects: [],
    }
    componentDidMount() {
        document.title = 'YoSP: Projects';
        this.handleInitialize();
        const { setCurrentPage } = this.props;
        setCurrentPage("projects")
    }

    handleInitialize() {
        setTimeout(() => {
            let { user } = this.props;
            this.getListOfProjects(user)//without this we have empty user at props on initialazing
        }, 1);
    }



    handleDeleteProject = () => {
        let { user, addAlert } = this.props;
        fetch(`${GLOBAL_CONFIG.backendUrl}/projects/remove?token=${user.token}`, {
            method: 'post',
            body: JSON.stringify({
                // "proxies": [`${login}:${password}@${ip}:${port}`],
            })
        })
            .then(result => result.text())
            .then(result => {
                let answer = JSON.parse(result);
                if (answer.status === 200) {
                    addAlert("success", "Projects are removed successfully");
                    this.getListOfProjects(user);
                } else {
                    addAlert("warning", answer.error);
                }

            }).catch(() => {
                addAlert("danger", "Server is not responding. Something went wrong");
            });
    }


    getListOfProjects = (user) => {
        let { addAlert } = this.props;
        fetch(`${GLOBAL_CONFIG.backendUrl}/projects/get-all?token=${user.token}`)
            .then(result => result.text())
            .then(result => {
                let answer = JSON.parse(result);
                if (answer.error) {
                    addAlert("warning", answer.error);
                } else {
                    this.setState({ projects: answer.projects })
                }
            });
    }


    render() {

        let { projects } = this.state;
        return (
            <div className="project-manager-wrapper">
                <div className="project-manager__header">
                    <h2 className="project-manager__header__headline"> Projects</h2>
                    <div className="project-manager__header__button-wrapper" >
                        <button className="project-manager__header__button uk-button uk-button-default"  >UPDATE</button>
                        <Link className="project-manager__header__button uk-button uk-button-default" to="/projects/add">ADD</Link>
                    </div>
                </div>
                <div className="project-manager__content">
                    {projects.map(project => (
                        <Project
                            key={Math.random()}
                            toggleDeleteButton={this.handleDeleteProject}
                            incomingProject={project}
                            {...project}
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
    setCurrentPage
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectManager);