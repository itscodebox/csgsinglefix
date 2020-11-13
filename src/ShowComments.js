import React, { useState, useEffect, useContext } from "react";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import "./ShowComments.css";
import { db, auth } from "./firebase";
import { PostsContext } from "./PostsContext";
import useForceUpdate from "use-force-update";


function ShowComments({ id, text, likes, dislikes, username, postId }) {
  console.log("likessssssssss");
  console.log(likes);
  const [likeClass, setLikeclass] = useState("");
  const [dislikeClass, setDisLikeclass] = useState("");

  const forceUpdate = useForceUpdate();

  const context = useContext(PostsContext);
  const increaseCount = () => {
    // const ref = db.collection("posts")
    //   .doc(postId);
    var oldComents = [];
    db.collection("posts")
      .doc(postId)
      .get()
      .then(function (doc) {
        if (doc.exists) {
          //   console.log("Document data:", doc.data().comments.);
          oldComents = doc.data().comments;
          //   console.log(oldComents);
          const objIndex = oldComents.findIndex((obj) => obj.id == id);
          //   console.log(objIndex);
          //   oldComents[objIndex].likes = oldComents[objIndex].likes + 1;
          if (oldComents[objIndex].likes.indexOf(context.user) == -1) {
            oldComents[objIndex].likes.push(context.user);
          }
          //   console.log(oldComents);
          db.collection("posts")
            .doc(postId)
            .update({ comments: [...oldComents] });
            setTimeout(()=>{
              forceUpdate();
            },5000);
            
        } else {
          // doc.data() will be undefined in this case
          //   console.log("No such document!");
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });

    //     console.log(oldComents);

    //   update({ comments: [...comments, newComment] });
    // console.log('HYello---------------------');
    // console.log(Array.isArray(ref));
    // console.log(ref);
  };
  const decreaseCount = () => {
    var oldComents = [];
    db.collection("posts")
      .doc(postId)
      .get()
      .then(function (doc) {
        if (doc.exists) {
          //   console.log("Document data:", doc.data().comments.);
          oldComents = doc.data().comments;
          //   console.log(oldComents);
          const objIndex = oldComents.findIndex((obj) => obj.id == id);
          //   console.log(objIndex);
          //   oldComents[objIndex].dislikes = oldComents[objIndex].dislikes + 1;
          oldComents[objIndex].dislikes.push(context.user);
          //   console.log(oldComents);
          db.collection("posts")
            .doc(postId)
            .update({ comments: [...oldComents] });
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  };

  console.log(
    "--------------------------------------------",
    likes,
    dislikes,
    context.user
  );

  const isLiked = likes.indexOf(context.user);
  const isdisLiked = dislikes.indexOf(context.user);

  //   if(isLiked){
  //         setLikeclass('alreadyLiked');
  //   }

  //   if (isdisLiked) {
  //     setDisLikeclass("alreadyDisLiked");
  //   }

  return (
    <div className="commentBox">
      <div className="comment_reaction">
        {likes.indexOf(context.user) === -1 ? (
          <a onClick={increaseCount} id="likes">
            <strong>{likes.length}</strong>
            <ThumbUpAltIcon />
          </a>
        ) : (
          <a id="alreadyLiked">
            <strong>{likes.length}</strong>
            <ThumbUpAltIcon />
          </a>
        )}
        {dislikes.indexOf(context.user) === -1 ? (
          <a onClick={decreaseCount} id="dislikes">
            <strong>{dislikes.length}</strong>
            <ThumbDownIcon />
          </a>
        ) : (
          <a id="alreadyDisLiked">
            <strong>{dislikes.length}</strong>
            <ThumbDownIcon />
          </a>
        )}
      </div>
      <div className="comment_body">
        <p>{text}</p>
      </div>
    </div>
  );
}

export default ShowComments;
