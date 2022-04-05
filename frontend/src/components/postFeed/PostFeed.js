// Author: Akshit Jariwala, B00866255
import React from 'react';
import { useEffect, useState} from 'react';
import { useSelector } from "react-redux";
import { fetchAllPosts , uploadPosts , addComment , fetchPostComments , likePost , fetchUserLikes } from "../../actions/service"

const PostFeed = () => {
    const [postContent,setPostContent] = useState("");
    const [comment,setComment] = useState("");
    const [error,setError] = useState("error");
    const [commentState,setCommentState] = useState(false);
    const [postList, setPostList] = useState("")
    const [commentList, setCommentList] = useState("")
    const [currentCommentPostID, setCurrentCommentPostID] = useState("")
    const [userLikeList, setUserLikeList] = useState("")

    const { user } = useSelector(
      (state) => state.auth
    );

    useEffect(() => {
      fetchPosts();
      fetchUserLike();
    },[])

    // fetch posts list from mongoDB database.
    async function fetchPosts() {
      try{
      let postlist = await fetchAllPosts();
      let posts = postlist.data;
      setPostList(posts);
      console.log(user.email);
      fetchUserLike();
      } catch(error){
          console.log(error)
      }
    }

    // alternate comment state to show the comment model below the post
    const triggerCommentState = async (e,postID) => {
      try{
      if (commentState){
        setCommentState(false)
      } else {
        setCommentState(true)
        let commentlist = await fetchPostComments(postID);
        var commentData = commentlist.data; 
        setCurrentCommentPostID(postID);
        setCommentList(commentData);
      } 
    } catch(error){
      console.log(error)
    }
  }

    // Validating user inputs 
    const validateInput = (e) => {
        if(postContent === ""){
            setError("missing");
            alert("Post details must not be empty. Please try again.");
            return false;
        } else {
            return true;
        }
    }

    // Conneting with backend api to getch user likes 
    const fetchUserLike = async (e) => {

      try{
        let userID = user.email
        let userLikes = await fetchUserLikes(userID)
        let likePostArray = [];

        for(let i =0 ;i<userLikes.data.length;i++){
          likePostArray[i] = userLikes.data[i].postID
        }
        setUserLikeList(likePostArray);
      } catch(error){
        console.log(error)
      }
      
    }

    // Conneting with backend api to upload post
    const postUpload = async (e) => {
        e.preventDefault();
        
        try{
        
        if(validateInput(e)){
            setError("success");

            // Store to mongoDB
            const postObject = {
              userId : user.email, //current user id
              userName : user.name, //current user name
              postMessage : postContent
            }
            let post = await uploadPosts(postObject);

            if(post.status === 200){
              setPostContent("");
              fetchPosts();
            }
        }
      } catch(error){
        console.log(error)
      }
    }

    // Conneting with backend api to upload usercomments
    const uploadComment = async (e,postID) => {
      e.preventDefault();
      // code to comment on post
      try{
      setComment("")
      let commentObject = {
        postID : postID,
        respondedUserID : user.email, // current user id
        respondedUserName : user.name, // current user name
        commentMessage : comment
      }

      if(comment === ""){
        setError("missingcomment");
      } else {
        var commentData = await addComment(commentObject);
        let commentlist = await fetchPostComments(postID);
        var commentData = commentlist.data; 
        setCurrentCommentPostID(postID);
        setCommentList(commentData);
      }
      } catch(error) {
        console.log(error)
      } 
    } 

    // Conneting with backend api to upload user likes
    const postLike = async (e,postID) => {
      
      try{
      let likeObject = {
        postID : postID,
        respondedUserID : user.email //user id from the session
      }
      
      let likeResponse = await likePost(likeObject)
      if(likeResponse.status === 200)
      {
        fetchUserLike();
      }
    } catch(error){
      console.log(error)
    }
    }

    // Conneting with backend api to fetch post comments
    const fetchComments = async (postID) => {

      try{

        var postComment = await fetchPostComments(postID);
        return postComment.data;
      } catch(error){
        console.log(error)
      }
    }

    function Message(){
        return(
            <p>
            {(() => {
            switch (error) {
                case "success":   return <div class="alert alert-success alert-dismissible fade-in">
                                            <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
                                            <strong>Success!</strong> Post upload successful.
                                        </div>;
                case "missing": return <div class="alert alert-danger alert-dismissible fade-in">
                                            <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
                                            <strong>Failure</strong> Post upload failed!!! Please try again.
                                        </div>
                case "missingcomment": return <div class="alert alert-danger alert-dismissible fade-in">
                                              <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
                                              <strong>Failure</strong> Post upload failed!!! Please try again.
                                              </div>
                default:      return <div></div>;
            }
      })()}
    </p>
    )
    setError("");
    }

  return (
    <>
    {/*<nav className="navbar navbar-expand-sm bg-dark navbar-dark fixed-top" style={{paddingLeft:290}}>
          <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="#">Profile</a>
            </li>
            <li className="nav-item" >
            <a className="nav-link" href="#" style={{color:"white"}}>Post Feed</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Chat</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Applications</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Learning Portal</a>
            </li>
          </ul>

          <form className="navbar-form navbar-left">
            <div className="input-group" style={{paddingLeft:100}}>
              <input type="text" className="form-control" placeholder="Search" style={{height:33,width:200}}/>
                <div className="input-group-btn">
                  <button className="btn btn-default" type="submit" style={{backgroundColor:"white",height:33,width:40}}>
                      <i className="glyphicon glyphicon-search" style={{color:'#9b846b'}}></i>
                  </button>
                </div>
            </div>
          </form>   
  </nav>*/}
      <div className="row" style={{marginTop:80}}>
        <div className="col-3">
            <Message />
        </div>
        <div className="col-5"style={{marginLeft:50,border:"1px solid #cecece",backgroundColor:'white',borderRadius:20,height:100.833}}>
        <div className="model-body" style={{marginTop:27}}>
          <img src="https://picsum.photos/200" alt="Profile Picture" style={{width:40,height:40,borderRadius:50,marginLeft:20}}/>
          <button type="button" className="button-hover btn btn-outline-info btn-block" 
              style={{borderRadius:20,width:450,border:"0.5px solid #b3b3b3",color:'#595959',marginLeft:20, display:"inline-block",height:45}}
              data-toggle="modal" data-target="#addPostToggle"><span style={{fontWeight:510}}>Create Post</span>
          </button>
        </div>
        </div>

        <hr/>

        <div className="modal" id="addPostToggle" >
        
        <div className="modal-dialog" >
          <div className="modal-content" style={{borderRadius:10,height:350}}>
            <div className="modal-header" >
              <h6 className="modal-title" style={{weight:'bold'}}>Upload a Post</h6>
            <button type="button" className="close" data-dismiss="modal">&times;</button>
            </div>
    
            <form className="form-horizontal">
            <div className="modal-body" style={{padding:15,paddingLeft:20,paddingRight:20}}>
                <div>
                <img src="https://picsum.photos/200" alt="Profile Picture" style={{width:40,height:40,borderRadius:50}}/>
                <span style={{marginLeft:20}}>User Name</span></div>
                <div style={{marginTop:10}}>
                  <textarea  
                  className="area-glow" 
                  name='post_content'
                  placeholder='What would you like to share?'
                  value = {postContent}
                  onChange = {e => setPostContent(e.target.value)}
                  style={{padding:1,width:465,height:130,border:"0 solid black"}}
                  />
                </div>
            </div>

            <div className="modal-footer" style={{height:56.91}}>
              <input type="button" className="btn btn-primary" value="Post" data-dismiss="modal" style={{margin:-2}} onClick={(e) => postUpload(e)} />
            </div>
            </form>
            </div>
        </div>
        
        </div>
        <div className="col-4"></div>
        
      </div>
      <div className="row">
      <div className="col-3"></div>  
      <div className="col-5" style={{marginTop:10,padding:0,marginLeft:50}}>
            {   //iterating over post list to display individual post
                postList && postList.map((post,i) => 
                <div className="card" style={{borderRadius:7,marginTop:5}}>
                    <div key={i}>
                    <div className="container" style={{marginTop:10,paddingLeft:15}}> 
                    <div className="modal-body" style={{border:"1 solid black"}}>
                        <img src="https://picsum.photos/200" alt="Profile Picture" style={{width:40,height:40,borderRadius:50,marginTop:5,verticalAlign:"top"}}/>
                        <table style={{display:"inline-block"}}>
                          <tr><span style={{marginLeft:20}}>{post.userName}</span></tr>
                          <tr><span style={{marginLeft:20}}>{post.date.substring(0,10)}</span></tr>
                        </table>
                    </div>
                    <p style={{paddingLeft:15}}>{post.postMessage}</p>
                    <div className="modal-body">
                   
                    <div className="button-group">
                      <input type="button" className="btn btn-default" value="Comment" data-dismiss="modal" style={{display:"inline-block",width:250,border:'0.5px solid #b3b3b3'}} onClick={(e) => triggerCommentState(e,post._id)} />
                      { // checking if user has liked the post by checking post id exists in the user's list of liked posts
                        userLikeList.includes(post._id) ?
                      <input type="button" className="btn btn-primary" value="Like" data-dismiss="modal" style={{display:"inline-block",width:250,border:'0.5px solid #b3b3b3'}} onClick={(e) => postLike(e,post._id)} />
                         : 
                      <input type="button" className="btn btn-default" value="Like" data-dismiss="modal" style={{display:"inline-block",width:250,border:'0.5px solid #b3b3b3'}} onClick={(e) => postLike(e,post._id)} />
                        }
                    </div>
                    </div>
                    {
                    
                    // Adding comment to its post if post id matches with the comment's post id
                    commentState && currentCommentPostID === post._id ?
                      
                    <div className="modal-footer" style={{marginRight:17,paddingLeft:0}}>
                         <input type="text" 
                          name="user_comment" 
                          placeholder='Add Comment...' 
                          className="form-control"
                          value={comment}
                          style={{width:390}}
                          onChange={e => setComment(e.target.value)}
                        />
                          <input type="button" className="btn btn-primary" value="Post" data-dismiss="modal" style={{display:"inline-block",width:100}} onClick={(e) => uploadComment(e,post._id)} />
                          {
                            commentList && commentList.map((comment,i) => 
                            <div className="card" style={{borderRadius:7,marginTop:5,marginLeft:15,width:980}}>
                            <div className="modal-body" style={{border:"1 solid black"}}>
                              <img src="https://picsum.photos/200" alt="Profile Picture" style={{width:40,height:40,borderRadius:50,marginTop:5,verticalAlign:"top"}}/>
                              <table style={{display:"inline-block"}}>
                                <tr><span style={{marginLeft:20}}>{comment.respondedUserName}</span></tr>
                                <tr><span style={{marginLeft:20}}>{comment.date.substring(0,10)}</span></tr>
                              </table>
                            </div>
                            <p style={{marginLeft:78}}>{comment.commentMessage}</p>
                            </div> 
                          )
                          } 
                    </div>
                    : null
                    } 
                    </div>
                    </div>
                </div>
                )
            }
         </div>  
         <div className="col-3"></div>
      </div>
    </>
  );
}

export default PostFeed;
