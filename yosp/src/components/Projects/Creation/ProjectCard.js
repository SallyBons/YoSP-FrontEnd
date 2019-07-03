import React, { PureComponent } from 'react';




class ProjectCard extends PureComponent {
  
  render() {
       return (
      <div className="project-card-wrapper">
           <div className="project-card__heading-wrapper">
         <span className="project-card__heading__headline">Project name</span>
         <div className="project-card__heading__button-wrapper">
            <button className="project-card__heading__button uk-button uk-button-default">Add Proxies</button>
            <button type="submit" className="project-card__heading__button uk-button uk-button-default">Add new group</button>
          </div>
          </div>
         
          

          {/* onClick={()=>getDataFromBackEnd(user)} */}

      </div>
    );
  }
}



export default (ProjectCard);