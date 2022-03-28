import axios from 'axios';

export const fetchAllPosts = (payload) => {
    console.log("In fetchPosts");
     
    return axios.get('http://localhost:4000/FetchAllPosts', payload)
        .then((res) => {
            return res;
        })
        .catch(err => { return err.response })
};

export const uploadPosts = (payload) => {
    console.log(payload);
    return axios.post('http://localhost:4000/UploadPost', payload)
        .then((res) => {
            return res;
        })
        .catch(err => { return err.response })
};

export const addComment = (payload) => {
    console.log(payload);
    return axios.post('http://localhost:4000/AddComment', payload)
        .then((res) => {
            return res;
        })
        .catch(err => { return err.response })
};

export const fetchPostComments = (postID) => {
    console.log(postID);
    return axios.post('http://localhost:4000/FetchPostComment', {postID})
        .then((res) => {
            return res;
        })
        .catch(err => { return err.response })
};