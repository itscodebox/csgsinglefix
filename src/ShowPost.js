import React, { useState, useEffect, useContext } from "react";
import "./ShowPost.css";
import { db, auth, storage } from "./firebase";
import ShowComments from "./ShowComments";
import { PostsContext } from "./PostsContext";

function ShowPost({
  postId,
  username,
  title,
  body,
  timestamp,
  attachment,
  comments,
}) {
  // const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const context = useContext(PostsContext);
  const [showAttachment, setshowAttachment] = useState(false);
  const [showMore , setShowMore] = useState(false);
  const [showCommentbox, setShowCommentbox] = useState(false);

  // <div className="content" dangerouslySetInnerHTML={{__html: thisIsMyCopy}}></div>

  const postComment = (event) => {
    event.preventDefault();
    // logic to populated unique idd for comments
    var _id = Date.now();
    const newComment = {
      username: context.user,
      likes: 0,
      dislikes: 0,
      text: comment,
      id: _id,
      postId: postId,
    };

    db.collection("posts")
      .doc(postId)
      .update({ comments: [...comments, newComment] });

    setComment("");
    alert("Your comment posted successfully.");
    setShowCommentbox(false);
  };
  console.log(comments);

  return (
    <div className="post">
      <div className="post_header">
        <h4
          className="titie_content"
          dangerouslySetInnerHTML={{ __html: title }}
        ></h4>
        <div className="post_detail">
          <h6>
            <strong style={{ color: "#E94220" }}>Created at :</strong>
            {timestamp}
          </h6>
          {/* <h6>
            <strong>Views :</strong> 108 times
          </h6> */}
        </div>
      </div>
      <div className="post_body">
        <h6
          className="post_content"
          dangerouslySetInnerHTML={{ __html: body }}
        ></h6>
        {/* for checking attachment */}
        {attachment ? (
          <div>
            {showAttachment ? (
              <div>
                <img src={attachment} id="attach_img" />
                <a onClick={() => setshowAttachment(false)} id="showAttachment">
                  <strong>Close Attachment</strong>
                </a>
              </div>
            ) : (
              <a onClick={() => setshowAttachment(true)} id="showAttachment">
                <strong>Show Attachment</strong>
              </a>
            )}
          </div>
        ) : (
          <div></div>
        )}
      </div>

      <div className="post_comments">
        {showMore ? (
          <div>
            {comments.map((comment) => (
              <ShowComments
                id={comment.id}
                text={comment.text}
                likes={comment.likes}
                dislikes={comment.dislikes}
                username={comment.username}
                postId={comment.postId}
              />
            ))}
            <a onClick={() => setShowMore(false)} id="showMore">
              <strong>Hide Comments</strong>
            </a>
          </div>
        ) : (
          <a onClick={() => setShowMore(true)} id="showMore">
            <strong>Show Comments</strong>
          </a>
        )}
      </div>

      <form id="comment_form">
        {showCommentbox ? (
          <textarea
            className="form-control post_input"
            id="exampleTextarea"
            rows="7"
            placeholder="post your comment"
            value={comment}
            onChange={(event) => {
              setComment(event.target.value);
            }}
          ></textarea>
        ) : (
          <div>
            <a onClick={() => setShowCommentbox(true)} id="add_comment">
              <strong>Add Your Comment Here.</strong>
            </a>
          </div>
        )}
        <button
          className="btn btn-outline-danger my-2 my-sm-0 post_button"
          disabled={!comment}
          type="submit"
          onClick={postComment}
        >
          Post
        </button>
      </form>
    </div>
  );
}

export default ShowPost;
