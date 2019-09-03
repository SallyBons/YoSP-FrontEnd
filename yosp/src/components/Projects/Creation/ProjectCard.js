import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getId } from '../../../utils';
import GLOBAL_CONFIG from '../../../config';
import { selectUser } from '../../../reducer/user';
import { loadProject, selectProject } from '../../../reducer/projects';
import { connect } from 'react-redux';
import { setCurrentPage } from '../../../reducer/ui';
import { addAlert } from '../../../reducer/alerts';



class ProjectCard extends Component {
  state = {
    projectKeywords: [],
    pageFullyLoaded: false,
  }

  componentDidMount() {
    const { setCurrentPage} = this.props;
    const { pathname } = this.props.location;

     this.getProjectById(getId(pathname));
     this.checkPageLoad();

     // Sidebar
    setCurrentPage("projects");
  }

  componentDidUpdate() {
    const { pathname } = this.props.location;
    const { project } = this.props;

    if (Object.keys(project).length === 0) {
      this.getProjectById(getId(pathname));
    }

    // Check if page is fully loaded
    this.checkPageLoad()
  }

  checkPageLoad = () => {
    const { pageFullyLoaded } = this.state;
    const { project } = this.props;

    if (Object.keys(project).length !== 0 && !pageFullyLoaded) {
      this.getKeywordGroups();
    }
  }

  getKeywordGroups = () => {
    let { addAlert, user } = this.props;
    const { pageFullyLoaded } = this.state;
    const { pathname } = this.props.location;
    fetch(`${GLOBAL_CONFIG.backendUrl}/keyword-groups/get-all?token=${user.token}&project_id=${getId(pathname)}`)
      .then(result => result.text())
      .then(result => {
        let answer = JSON.parse(result);
        if (answer.error) {
          addAlert("warning", answer.error);
        } else {
         this.setState({
            projectKeywords: answer.keyword_groups,
            pageFullyLoaded: !pageFullyLoaded,
          })
         }
      }).catch(() => {
        addAlert("danger", "Server is not responding. Something went wrong");
      });
  }

  getProjectById = (id) => {
    const { loadProject, history, addAlert, user} = this.props;
    if (Object.keys(user).length !== 0 && id) {
      fetch(`${GLOBAL_CONFIG.backendUrl}/projects/get-single?token=${user.token}&id=${id}`)
        .then(result => result.text())
        .then(result => {
          let answer = JSON.parse(result);
          if (answer.error) {
            history.push('/projects');
          }
          loadProject(answer);
        }).catch(() => {
          history.push('/projects');
          addAlert("danger", "Project with such id does not exist");
        });
    }
  }

  render() {
    const { projectKeywords, pageFullyLoaded } = this.state;
    const { project } = this.props;
    console.log( projectKeywords);
    if (pageFullyLoaded === true) {
      return (
        <div className="project-card-wrapper">

          <div className="project-card__heading-wrapper">
            <h2 className="project-card__heading__headline">{project.name}</h2>
            <div className="project-card__heading__button-wrapper">
              <Link className="project-card__heading__button uk-button uk-button-default" to={{ pathname: `/projects/${project.id}/proxies` }} uk-toggle="target: #toggle-proxies">Proxies</Link>
              <Link to={{ pathname: `/projects/${project.id}/keywords` }} className="project-card__heading__button uk-button uk-button-default" uk-toggle="target: #toggle-keywords">Keywords</Link>
              <Link className="project-card__heading__button uk-button uk-button-default" to={{ pathname: `/projects/${project.id}/edit` }}>Settings</Link>
              <button className=" project-card__heading__button uk-button uk-button-default">Update</button>
              <button className=" project-card__heading__button uk-button uk-button-default">Delete</button>
            </div>
          </div>

          <div className="project-card__toggle-wrapper">
            {project.proxies !== undefined && project.proxies.length === 0 ? <p id="toggle-proxies" className="project-card__toggle uk-alert-primary">Proxies are empty! Click here to add it! </p> : <p id="toggle-proxies"></p>}
            {projectKeywords.length === 0 ? <p id="toggle-keywords" className="project-card__toggle uk-alert-primary">Keyword groups are empty! Click here to add it! </p> : <p id="toggle-keywords"></p>}
          </div>

           <div className="project-card__content-wrapper">
              {projectKeywords.map(keyword => (
                <div>
                  <Link className="project-card__heading__button uk-button uk-button-default" to={{ pathname: `/keyword_group/${keyword.id}` }}> {keyword.title}</Link>
                </div>
              ))}
            </div>
          </div> 
      );
    } else {
      return (
        <div></div>
      );
    }
  }
}
const mapStateToProps = state => ({
  user: selectUser(state),
  project: selectProject(state)
});
const mapDispatchToProps = {
  loadProject,
  setCurrentPage,
  addAlert,
};



export default connect(mapStateToProps, mapDispatchToProps)(ProjectCard);