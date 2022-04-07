import React, { Component , useState } from 'react';
import { useHistory } from "react-router-dom";
import '../../styles/ApplicationSubmit.css'

const ApplicationSubmit = () => {

    const history = useHistory();

    const handleJobSearch = () => {
        history.push({pathname: '/JobSearch'});

    }

    return (

        <div>
            <h1 className='Applicationfont'>Congratulations your application has been submitted</h1>
            <br></br>
            <button
                        type="button"
                        class="btn btn-primary , buttonStyle, ApplicationButton"
                        onClick={handleJobSearch}
                        >
                        <span>Click here to go back to Job Search</span>
        </button>
        </div>
    )
}

export default ApplicationSubmit;