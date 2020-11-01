import "./App.css";
import AddPost from "./AddPost";
// import React, { createContext, useState } from "react";
import Header from "./Header";
import ShowPost from "./ShowPost";
import React, { useState, useEffect, useContext } from "react";
import { db, auth } from "./firebase";
// import PostsContextProvider from './PostsContext';
import { PostsContext } from "./PostsContext";

// export const PostsContext = createContext();

// const PostsContextProvider = (props) => {
//   const [posts, setPosts] = useState([]);
//   return (
//     <PostsContext.Provider value={{ posts, setPosts }}>
//       {props.children}
//     </PostsContext.Provider>
//   );
// };

function App() {
  const [posts, setposts] = useState([]);
  const [user, setUser] = useState(null);
  const [postComment, postCommentOpen] = useState(false);
  // const context = useContext(PostsContext);
  // useEffect(() => {
  //   // this is where code runs
  //   // every time posts change it will run .
  //   // it will run once
  //   db.collection("posts")
  //     .orderBy("timestamp", "desc")
  //     .onSnapshot((snapshot) => {
  //       // evey time posts chnages snapshot will run the below code
  //       setposts(
  //         snapshot.docs.map((doc) => ({
  //           id: doc.id,
  //           post: doc.data(),
  //         }))
  //       );
  //     });
  // }, []);

  useEffect(() => {}, [posts]);

  return (
    <div className="App">
      <PostsContext.Provider
        value={{ posts, setposts, user, setUser, postComment, postCommentOpen }}
      >
        <Header />
        {user ? (
          posts.map((data) => {

            return (
              <ShowPost
                key={data.objectID}
                postId={data.objectID}
                username={data.username}
                title={data._highlightResult.title.value}
                body={data._highlightResult.body.value}
                timestamp={data.timestamp._seconds}
                attachment={data.attachment}
                comments={data.comments}
              />
            );
          })
        ) : (
          <div id="bg_image">
            <center>
              <h1 className="Title_text">
                <strong>Welcome To SingleFix</strong>
              </h1>
              <h1 className="login_text">
                <strong>Please Login.</strong>
              </h1>
            </center>
          </div>
        )}
      </PostsContext.Provider>
      {/* <AddPost /> */}
      {/* username, title, body, timestamp, attachment */}
      {/* {posts.map(({ id, post }) => (
        <ShowPost
          key={id}
          postId={id}
          username={post.username}
          title={post.title}
          body={post.body}
          timestamp={post.timestamp}
          attachment={post.attachment}
        />
      ))} */}
    </div>
  );
}

export default App;
