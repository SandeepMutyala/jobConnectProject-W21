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

export const fetchUserPosts = (userID) => {
    console.log(userID);
    return axios.post('http://localhost:4000/FetchUserPosts', {userID})
        .then((res) => {
            return res;
        })
        .catch(err => { return err.response })
};

export const userPostDelete = (postID) => {
    console.log(postID);
    return axios.put('http://localhost:4000/DeleteUserPost', {postID})
        .then((res) => {
            return res;
        })
        .catch(err => { return err.response })
};

export const likePost = (payload) => {
    console.log(payload);
    return axios.post('http://localhost:4000/LikePost', {payload})
        .then((res) => {
            return res;
        })
        .catch(err => { return err.response })
};


export const fetchUserLikes = (userID) => {
    console.log(userID);
    return axios.post('http://localhost:4000/FetchUserLikes', {userID})
        .then((res) => {
            return res;
        })
        .catch(err => { return err.response })
};