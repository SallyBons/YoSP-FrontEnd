import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';



class ProjectCard extends PureComponent {

  render() {
    const { incomingProject } = this.props;
    return (
      <div className="project-card-wrapper">
        <div className="project-card__heading-wrapper">
          <span className="project-card__heading__headline">Project name</span>
          <div className="project-card__heading__button-wrapper">
            <Link className="project-card__heading__button uk-button uk-button-default" to="/projects/496a5bcb1a0e2762c7c72aa8dcd9002e/proxies">Add Proxies</Link>
            <Link to="/projects/496a5bcb1a0e2762c7c72aa8dcd9002e/keywords" className="project-card__heading__button uk-button uk-button-default">Add new group</Link>
            {/* <Link className="project-card__heading__button uk-button uk-button-default" to={{ pathname: "/projects/496a5bcb1a0e2762c7c72aa8dcd9002e/edit", incomingProject: incomingProject }}>Edit</Link> */}
            <Link className="project-card__heading__button uk-button uk-button-default" to={{ pathname: "/projects/496a5bcb1a0e2762c7c72aa8dcd9002e/edit"}}>Edit</Link>

            <button className=" project-card__heading__button uk-button uk-button-default">Delete</button>

          </div>
        </div>



        {/* onClick={()=>getDataFromBackEnd(user)} */}

      </div>
    );
  }
}



export default (ProjectCard);