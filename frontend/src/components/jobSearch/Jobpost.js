/* author Arpreet*/

import Jobdata from './Jobdata';
import React, { Component } from 'react'

const Jobpost = (props) =>{

    //console.log(props);
    const location = props.location.toLowerCase();
    const title = props.title.toLowerCase();
    
        const filteredjobpost = props.posts.filter((jobpost) => {
               // console.log("enteredfunc");
                const companylocation = jobpost.addLocation.toLowerCase();
                const jobtitle = jobpost.jobTitle.toLowerCase();
                if(location == "" && title == "")
                {
                   // console.log(jobpost);
                    return jobpost;
                }
                else if(location != "" && title == "")
                {
                    if(companylocation.search(location) != -1)
                        return jobpost;
                }
                else if(location == "" && title != "")
                {
                    if(jobtitle.search(title) != -1)
                        return jobpost;
                }
                else if(location != "" && title != "")
                {
                    if(jobtitle.search(title) != -1 && companylocation.search(location) != -1)
                        return jobpost;
                }
        } );



        return (
            <div>
                {
                    filteredjobpost.map(job => (
                        <Jobdata 
                            key = {job._id}
                            jobid = {job._id}
                            compimage={job.companyLogoUrl} 
                            jobtitle={job.jobTitle}
                            companyname={job.companyName}
                            dateposted={job.jobPostDate}
                            jobdesc={job.jobShortDescription}
                            companylocation={job.addLocation}  jobdata={props.jobdata}></Jobdata>)
                    )}   
            </div>
            
        )
}

export default Jobpost;