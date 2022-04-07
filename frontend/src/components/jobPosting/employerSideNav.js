 /* Author Sai Sandeep Mutyala */
import React from "react";
import './employerSideNav.css'
import { Link } from "react-router-dom";
import dashboard from '../../assets/dashboard.png';
import create from '../../assets/create.png';
import application from '../../assets/application.png';

function EmployerSideNav() {

  return (
    <div className="sidenavbar">
        <div className="rows">
            <div className="icon">
                <img src={application} alt="dashboard" />
            </div>
            <div  className="sideNavItems">
            <Link className='navbarLink' to="/ViewJobPosts">
                Application Managment
            </Link>
            </div>
        </div>
        <div className="rows">
            <div className="icon">
                <img src={dashboard} alt="create" />
            </div>
            <div  className="sideNavItems">
            <Link className='navbarLink' to="/employerDashboard">
                Job Post Management
            </Link>
            </div>
        </div>
        <div className="rows">
            <div className="icon">
                <img src={create} alt="edit" />  
            </div>
            <div  className="sideNavItems">
            <Link className='navbarLink' to="/JobPostForm">
                Create Job Post
            </Link>
            </div>
        </div>
    </div>
  );
}

export default EmployerSideNav;