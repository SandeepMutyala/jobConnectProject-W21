/* author Arpreet*/

var express = require('express');
const { readdirSync } = require('fs');
var app = express();
var jobSearchmodel = require("../models/JobSearchModel.js")
var PDmodel = require("../models/PersonalDetailsModel.js")
var EDmodel = require("../models/EducationDetailsModel.js")
var ExDmodel = require("../models/ExperienceDetailsModel.js")

let getJobPost = async (req,res) => {
    console.log("entered");

        //const cursor = client.db("jobconnect").collection("jobpostings").find();

      const result =  await jobSearchmodel.find();
                    
        res.json({result});
       //console.log(cursor);
        //const Jobs = await cursor.toArray(); 
        
};


let postPersonalDetails = async (req,res) => {

    const PersonalDetails = JSON.parse(JSON.stringify(req.body));
    console.log(PersonalDetails);
    //const result = PDmodel.create(PersonalDetails);

    const result =  await PDmodel.findOneAndUpdate({jobID :PersonalDetails[i].jobID, userID:PersonalDetails[i].userID },PersonalDetails );
        if(result)
            console.log("updated")
        else
        {
            PDmodel.create(PersonalDetails);
        }

}


let postEducationDetails = async (req,res) => {

    const EducationDetails = JSON.parse(JSON.stringify(req.body));
    console.log(EducationDetails);

    for(let i=0; i<EducationDetails.length;i++ )
    {
        const result =  await EDmodel.findOneAndUpdate({ Educationindex: EducationDetails[i].Educationindex, jobID :EducationDetails[i].jobID, userID:EducationDetails[i].userID },EducationDetails[i] );
        if(result)
            console.log("updated")
        else
        {
            EDmodel.create(EducationDetails[i]);
        }
    }
    //const result = PDmodel.create(PersonalDetails);

}

let postExperienceDetails = async (req,res) => {
    console.log("entered post");
    const ExperienceDetails = JSON.parse(JSON.stringify(req.body));
    console.log(ExperienceDetails);

    for(let i=0; i<ExperienceDetails.length;i++ )
    {
        const result =  await ExDmodel.findOneAndUpdate({ Experienceindex: ExperienceDetails[i].Experienceindex, jobID :ExperienceDetails[i].jobID, userID:ExperienceDetails[i].userID  },ExperienceDetails[i] );
        if(result)
            console.log("updated")
        else
        {
            ExDmodel.create(ExperienceDetails[i]);
        }
    }
    //const result = PDmodel.create(PersonalDetails);

}

module.exports = {
    getJobPost,
    postPersonalDetails,
    postEducationDetails,
    postExperienceDetails
}