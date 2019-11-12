/**
 * Projects Page
*/
/* eslint-disable */
import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Progress } from 'reactstrap';

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// rct card box
import { RctCard, RctCardContent } from 'Components/RctCard';

// intl messages
import IntlMessages from 'Util/IntlMessages';

// rct collapsible card
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

// widgets data
import { projectData } from './data';

// helpers
import { getAppLayout } from "Helpers/helpers";

//component
import ProjectListing from './component/ProjectListing';

export default class Projects extends Component {

   state = {
      gridlayout: true
   };

   // show grid layout
   listLayout = () => {
      this.setState({ gridlayout: false });
   };

   // show list layout
   gridLayout = () => {
      this.setState({ gridlayout: true });
   };

   render() {
      return (
         <div className="projects-wrapper">
            <Helmet>
               <title>Projects</title>
               <meta name="description" content="Reactify Blank Page" />
            </Helmet>
            <PageTitleBar title={<IntlMessages id="sidebar.projects" />} match={this.props.match} />
            <div className="search-bar-wrap">
               <RctCard >
                  <RctCardContent>
                     <div className="row">
                        <div className="col-sm-12 col-md-3 col-lg-3 align-items-center mb-10 mb-sm-0">
                           <h2 className="mb-0 text-capitalize">search</h2>
                        </div>
                        <div className="col-sm-12 col-md-9 col-lg-9">
                           <div className="d-sm-flex">
                              <div className="search-bar">
                                 <TextField
                                    id="standard-with-placeholder"
                                    placeholder="Search Projects"
                                 />
                                 <Button variant="contained" color="primary" className="mx-sm-15">
                                    Search
                                 </Button>
                              </div>
                              <div className="add-project-wrap">
                                 <Button variant="contained" color="primary">
                                    Add
                                    <i className="material-icons pl-10">add</i>
                                 </Button>
                              </div>
                           </div>
                        </div>
                     </div>
                  </RctCardContent>
               </RctCard>
            </div>
            <div>
               <div className="d-flex justify-content-between align-items-center mt-15 mb-30">
                  <h2 className="text-capitalize mb-0">
                     {this.state.gridlayout === true ?
                        'project grid'
                        :
                        'project list'
                     }
                  </h2>
                  <div className="projects-icon">
                     <Button className="btn-icon" onClick={() => this.gridLayout()}>
                        <i className="material-icons">apps</i>
                     </Button>
                     <Button className="btn-icon" onClick={() => this.listLayout()}>
                        <i className="material-icons">list</i>
                     </Button>
                  </div>
               </div>
               {this.state.gridlayout && this.state.gridlayout === true ?
                  <div className="row">
                     {projectData.map((dataItem, index) => {
                        return (
                           <RctCollapsibleCard
                              key={index}
                              customClasses=""
                              colClasses="col-sm-12 col-md-6 col-lg-4 w-xs-full"
                              heading={<a href={`/${getAppLayout(location)}/crm/Project-detail/${dataItem.id}`}>{dataItem.title}</a>}
                              collapsible
                              reloadable
                              closeable
                              fullBlock
                           >
                              <RctCardContent>
                                 <div className="desc-wrap">
                                    <h5>Description :</h5>
                                    <p>{dataItem.desc}</p>
                                 </div>
                                 {dataItem.team_image && dataItem.team_image !== null ?
                                    <div className="project-team mb-15">
                                       <h5 className="mb-15">Team Members : </h5>
                                       <div className="team-img-wrap">
                                          {dataItem.team_image.map((image, index) => {
                                             return (
                                                <img
                                                   key={index}
                                                   src={require(`Assets/avatars/${image}`)}
                                                   alt="team"
                                                   className="mr-2"
                                                   width="30"
                                                   height="30"
                                                />
                                             )
                                          })}
                                       </div>
                                    </div>
                                    :
                                    null
                                 }
                                 <div className="deadline-info mrgn-b-md">
                                    <h5>Deadline : </h5>
                                    <p>{dataItem.deadline}</p>
                                 </div>
                                 <div className="progress-wrap mb-15">
                                    <div className="d-flex justify-content-between align-items-center">
                                       <h4 className="mb-0">Progress : <span className="text-primary">{dataItem.progress}%</span></h4>
                                    </div>
                                    <Progress color="primary" className="my-15 progress-xs" value={dataItem.progress} />
                                 </div>
                                 <div className="text-right">
                                    <a href={`/${getAppLayout(location)}/crm/Project-detail/${dataItem.id}`} className="text-primary text-capitalize fs-14">learn more</a>
                                 </div>
                              </RctCardContent>
                           </RctCollapsibleCard>
                        )
                     })}
                  </div>
                  :
                  <div className="row">
                     <div className="col-sm-12 col-md-12 col-lg-12">
                        <ProjectListing data={projectData} />
                     </div>
                  </div>
               }
            </div>
         </div>
      );
   }
}