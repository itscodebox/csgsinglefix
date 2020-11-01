import React from "react";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import "./ShowComments.css";
import { db, auth } from "./firebase";

function ShowComments({ id, text, likes, dislikes, username, postId }) {
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
          oldComents[objIndex].likes = oldComents[objIndex].likes + 1;
        //   console.log(oldComents);
          db.collection("posts")
            .doc(postId)
            .update({ comments: [...oldComents] });
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
          oldComents[objIndex].dislikes = oldComents[objIndex].dislikes + 1;
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
  return (
    <div className="commentBox">
      <div className="comment_reaction">
        <a onClick={increaseCount} id="likes">
          <strong>{likes}</strong>
          <ThumbUpAltIcon />
        </a>
        <a onClick={decreaseCount} id="dislikes">
          <storng>{dislikes}</storng>
          <ThumbDownIcon />
        </a>
      </div>
      <div className="comment_body">
        <p>{text}</p>
      </div>
    </div>
  );
}

export default ShowComments;
