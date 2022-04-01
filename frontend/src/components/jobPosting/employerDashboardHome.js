 /* Author Sai Sandeep Mutyala */
import React from 'react'
import "../jobPosting/employerDashboard.css"
import EmployerSideNav from './employerSideNav';

const employerDashboardHome = () => {
    
  return (
    <div className='rows'>
        <div className='left'>
            <EmployerSideNav/>  
        </div>
        <div className='right'>
            <h1 className='dashboardHomeHeading'>Welcome to the employer Dashboard</h1>
        </div>
    </div>
  )
}

export default employerDashboardHome