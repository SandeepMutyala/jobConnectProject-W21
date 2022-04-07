// Author: Akshit Jariwala, B00866255

import axios from "axios";

export const fetchAllPosts = (payload) => {
  console.log("In fetchPosts");

  return axios
    .get("/post/fetchallposts", payload)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};

export const uploadPosts = (payload) => {
  console.log(payload);
  return axios
    .post("/post/uploadpost", payload)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};

export const addComment = (payload) => {
  console.log(payload);
  return axios
    .post("http://localhost:4000/post/addcomment", payload)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};

export const fetchPostComments = (postID) => {
  console.log(postID);
  return axios
    .post("http://localhost:4000/post/fetchpostcomment", { postID })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};

export const fetchUserPosts = (userID) => {
  console.log(userID);
  return axios
    .post("http://localhost:4000/post/fetchuserposts", { userID })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};

export const userPostDelete = (postID) => {
  console.log(postID);
  return axios
    .put("http://localhost:4000/post/deleteuserpost", { postID })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};

export const likePost = (payload) => {
  console.log(payload);
  return axios
    .post("http://localhost:4000/post/likepost", { payload })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};

export const fetchUserLikes = (userID) => {
  console.log(userID);
  return axios
    .post("/post/fetchuserlikes", { userID })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};
