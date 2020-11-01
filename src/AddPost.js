import React, { useState, useEffect, useContext } from "react";
import "./AddPost.css";
import { db, storage } from "./firebase";
import firebase from "firebase";
import { PostsContext } from "./PostsContext";

export default function AddPost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [progress, setprogress] = useState(0);
  const [tags, setTags] = useState("");

  const context = useContext(PostsContext);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setAttachment(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if(attachment){
    const UploadTask = storage
      .ref(`attachments/${attachment.name}`)
      .put(attachment);
    UploadTask.on(
      "state_changed",
      (snapshot) => {
        // progress function
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setprogress(progress);
      },
      (error) => {
      },
      () => {
        // var test = new Date(
        //   firebase.firestore.Timestamp.now().toMillis() * 1000
        // ).toTimeString;
        storage
          .ref("attachments")
          .child(attachment.name)
          .getDownloadURL()
          .then((url) => {
            const newDocument = db.collection("posts").doc();
            const documentUuid = newDocument.id;

            db.collection("posts").doc(documentUuid).set({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              title: title,
              attachment: url,
              body: body,
              username: context.user,
              docid: documentUuid,
              tags: tags,
              comments: [],
            });
            setprogress(0);
            setTitle("");
            setBody("");
            setAttachment(null);
            context.postCommentOpen(false);
            alert("comment posted successfully....");
          });
      }
    );}
    else{
      const newDocument = db.collection("posts").doc();
            const documentUuid = newDocument.id;

            db.collection("posts").doc(documentUuid).set({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              title: title,
              attachment: null,
              body: body,
              username: context.user,
              docid: documentUuid,
              tags: tags,
              comments: [],
            });
            setprogress(0);
            setTitle("");
            setBody("");
            setAttachment(null);
            context.postCommentOpen(false);
            alert("comment posted successfully....");
          }

    }
  

  return (
    <div>
      <div className="post_area">
        {/* <form> */}
        {/* title */}
        <p className="h5">Title</p>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            placeholder="Be specific and imagine you’re asking a question to another person"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
        </div>

        {/* body */}
        <p className="h5">Body</p>

        <div className="form-group">
          {/* <label for="exampleTextarea">Example textarea</label> */}
          <textarea
            className="form-control"
            id="exampleTextarea"
            rows="7"
            placeholder="Include all the information someone would need to answer your question"
            value={body}
            onChange={(event) => {
              setBody(event.target.value);
            }}
          ></textarea>
        </div>

        {/* attachment */}
        <div className="form-group">
          {/* <label for="exampleInputFile">Attachment</label> */}
          <input
            type="file"
            className="form-control-file"
            id="exampleInputFile"
            aria-describedby="fileHelp"
            onChange={handleChange}
          />

          <br></br>

          {/* tags */}
          <p className="h5">Tags</p>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              data-role="tagsinput"
              placeholder="Add up to 5 tags to describe what your question is about"
              id="tag"
              value={tags}
              onChange={(event) => {
                setTags(event.target.value);
              }}
            />
          </div>

          <hr></hr>
          {/* progress bar */}

          {/* submmit button */}
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleUpload}
          >
            Submit
          </button>

          {progress != 0 && <progress value={progress} max="100" />}
        </div>
        {/* </form> */}
      </div>
    </div>
  );
}
