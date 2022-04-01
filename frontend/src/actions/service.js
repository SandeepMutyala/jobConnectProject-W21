// Author: Akshit Jariwala, B00866255


import axios from 'axios';

export const fetchAllPosts = (payload) => {
    console.log("In fetchPosts");
     
    return axios.get('http://localhost:4000/fetchAllPosts', payload)
        .then((res) => {
            return res;
        })
        .catch(err => { return err.response })
};

export const uploadPosts = (payload) => {
    console.log(payload);
    return axios.post('http://localhost:4000/uploadPost', payload)
        .then((res) => {
            return res;
        })
        .catch(err => { return err.response })
};

export const addComment = (payload) => {
    console.log(payload);
    return axios.post('http://localhost:4000/addComment', payload)
        .then((res) => {
            return res;
        })
        .catch(err => { return err.response })
};

export const fetchPostComments = (postID) => {
    console.log(postID);
    return axios.post('http://localhost:4000/fetchPostComment', {postID})
        .then((res) => {
            return res;
        })
        .catch(err => { return err.response })
};

export const fetchUserPosts = (userID) => {
    console.log(userID);
    return axios.post('http://localhost:4000/fetchUserPosts', {userID})
        .then((res) => {
            return res;
        })
        .catch(err => { return err.response })
};

export const userPostDelete = (postID) => {
    console.log(postID);
    return axios.put('http://localhost:4000/deleteUserPost', {postID})
        .then((res) => {
            return res;
        })
        .catch(err => { return err.response })
};

export const likePost = (payload) => {
    console.log(payload);
    return axios.post('http://localhost:4000/likePost', {payload})
        .then((res) => {
            return res;
        })
        .catch(err => { return err.response })
};


export const fetchUserLikes = (userID) => {
    console.log(userID);
    return axios.post('http://localhost:4000/fetchUserLikes', {userID})
        .then((res) => {
            return res;
        })
        .catch(err => { return err.response })
};