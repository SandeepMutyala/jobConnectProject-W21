/* author Arpreet*/
import '../../styles/Searchbar.css'
import React, { Component , useState} from 'react'

const Searchbar = (props) => {

    const [initialTitleValue,updateTitleValue] = useState("");
    const [initialLocationValue, updateLocationValue] = useState("");

    const updatingValue = (event) => {

        if(props.inside == "Job Location")
            updateLocationValue(event.target.value);
        else
            updateTitleValue(event.target.value);

    }

    const updateOriginalValue = () => {

        if(props.inside == "Job Location")
            props.jobLocationHandler(initialLocationValue);
        else
            props.jobTitleHandler(initialTitleValue);
    }

    return (

        <div className="input-group">
            <div className="form-outline">
                <input type="search" id="form1" className="form-control" placeholder={props.inside} onChange={updatingValue}/>
            </div>
            <button type="button" className="btn btn btn-primary" onClick={updateOriginalValue}>search</button>
        </div>
    )
}

export default Searchbar;