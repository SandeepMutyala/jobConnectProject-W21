import { useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert'; // Import
import { fetchUserPosts , userPostDelete ,  fetchPostComments } from "../../actions/service"

// import './App.css';

const MyPosts = () => {

    const [commentState,setCommentState] = useState(false);
    const [postList, setPostList] = useState("")
    const [commentList, setCommentList] = useState("")
    const [currentCommentPostID, setCurrentCommentPostID] = useState("")
    const [deletePostID, setDeletePostID] = useState("")

    useEffect(() => {
        fetchCurrentUserPost();
    },[])

    // fetch posts list from mongoDB database.
    async function fetchCurrentUserPost() {
        // take userID from session
      let userID = "akshit123"  
      let postlist = await fetchUserPosts(userID);
      let posts = postlist.data;
      setPostList(posts);
    }

    const triggerCommentState = async (e,postID) => {
      if (commentState){
        setCommentState(false)
      } else {
        setCommentState(true)
        console.log(postID)
        let commentlist = await fetchPostComments(postID);
        var commentData = commentlist.data;
        setCurrentCommentPostID(postID);
        setCommentList(commentData);
        // get data and check at the post if _id of post and comment is equal add comment.
      } 
    }

    const setPostToBeDeleted = (e,postID) => {
      setDeletePostID(postID)
    }

    const postDelete = async (e) => {
      e.preventDefault();
      console.log(deletePostID);
      let userPost = await userPostDelete(deletePostID);
      if(userPost.status === 200){
        fetchCurrentUserPost();
        setDeletePostID("");
      }
    }

  return (
    <>
      <div className="row" style={{marginTop:80}}>
      <div className="col-3"></div>  
      <div className="col-5" style={{marginTop:10,padding:0,marginLeft:50}}>
            {
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
                    
                    <div className="modal" id="deletePostToggle" >
                        <div className="modal-dialog" >
                            <div className="modal-content" style={{borderRadius:10,height:200}}>
                                <div className="modal-header" >
                                    <h6 className="modal-title" style={{weight:'bold'}}>Confirm to delete</h6>
                                </div>
                                <div className="modal-body" >
                                    <h6 className="modal-title" style={{weight:'bold'}}>Are you sure you want to delete this post?</h6>
                                </div>
                            <form className="form-horizontal">
                                <div className="modal-footer">
                                    <input type="button" className="btn btn-success" value="No" data-dismiss="modal" />
                                    <input type="button" className="btn btn-success" value="Yes" data-dismiss="modal" style={{display:"inline-block"}} onClick={(e) => postDelete(e,post._id)}  />
                                </div>
                            </form>
                    </div>
                    </div>
                    </div>


                    <div className="modal-body">
                   
                    <div className="button-group">
                      <input type="button" className="btn btn-default" value="Comment" data-dismiss="modal" style={{borderRadius:20,display:"inline-block",width:250,border:'0.5px solid #b3b3b3'}} onClick={(e) => triggerCommentState(e,post._id)} />
                      <button type="button" className="btn btn-danger" 
                        style={{borderRadius:20,width:230,border:"0.5px solid #b3b3b3",marginLeft:20, display:"inline-block",height:45}}
                        data-toggle="modal" data-target="#deletePostToggle" onClick={(e) => setPostToBeDeleted(e,post._id)}><span style={{fontWeight:510}}>Delete</span>
                      </button>
                    </div>  
                    </div>
                    {
                    
                    commentState && currentCommentPostID === post._id ?
                      
                    <div className="modal-footer" style={{marginRight:17,paddingLeft:0}}>
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

export default MyPosts;
