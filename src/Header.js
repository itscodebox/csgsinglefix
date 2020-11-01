import React, { useState, useEffect, useContext } from "react";
import "./Header.css";
import { PostsContext } from "./PostsContext";
import { db, auth } from "./firebase";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Input } from "@material-ui/core";
import AddPost from "./AddPost";
import ShowPoint from "./ShowPoint";
// import algoliasearch from 'algoliasearch/lite';
const algoliasearch = require("algoliasearch");
// const { Change } = require("firebase-functions");

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  post: {
    position: "absolute",
    width: 1000,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

// const APP_ID = functions.config().algolia.app;
// const ADMIN_KEY = functions.config().algolia.key;

const client = algoliasearch("NPSOZC5Y9O", "548cfffbbd45d123701b02a92f5a924c");
// Nee to chnage here
const index = client.initIndex("posts");

function Header() {
  const [searchText, setSearchText] = useState("");
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  // this is to take input from feild
  const [username, setUsername] = useState("");
  
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [trigger, setTrigger] = useState(null);
  // const [postComment, postCommentOpen] = useState(false);
  // const [user, setUser] = useState(null);
  const [openSignIn, setOpenSignIn] = useState(false);

  const context = useContext(PostsContext);

  useEffect(() => {
    index
      .search(searchText)
      .then(({ hits }) => {
        console.log(hits);
        // console.log(context.posts);
        context.setposts(hits);
        // setTrigger(null);
        // console.log('after');
        // console.log(context.posts);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [searchText]);

  // useEffect(() => {
  //   db.collection("posts").onSnapshot((snapshot)=>{
  //       setTrigger(1);
  //       console.log('Helloooooooo');
  //   }

  //   );
  // }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // user is lgged in
        console.log('userrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr');
        console.log(authUser);
        context.setUser(authUser.email);
      } else {
        // user is logged out
        context.setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [context.user, username]);

  const signUp = (event) => {
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((error) => alert(error.message));
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  };

  const signIn = (event) => {
    event.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));

    setOpenSignIn(false);
  };

  return (
    <div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className={classes.paper} style={modalStyle}>
          <form className="app_signup">
            <center>
              <Input
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <Input
                type="text"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type="text"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div>
                <Button type="submit" onClick={signUp}>
                  Sign up
                </Button>
              </div>
            </center>
          </form>
        </div>
      </Modal>

      <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
        <div className={classes.paper} style={modalStyle}>
          <form className="app_signup">
            <center>
              <Input
                type="text"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type="text"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div>
                <Button type="submit" onClick={signIn}>
                  Sign In
                </Button>
              </div>
            </center>
          </form>
        </div>
      </Modal>

      <Modal
        open={context.postComment}
        onClose={() => context.postCommentOpen(false)}
      >
        <div className={classes.post} style={modalStyle}>
          <AddPost />
        </div>
      </Modal>

      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <img
          src="https://media.glassdoor.com/sql/6106/csg-squarelogo-1580145448241.png"
          id="logo"
        />
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#">
                Home <span className="sr-only">(current)</span>
              </a>
            </li>
          </ul>
          {/* <form className="form-inline my-5 my-lg-0"> */}
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            id="search"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
          />

          {/* to check if user is logged in or not  */}

          {context.user ? (
            <div id="right_header">
              <h3 className="score">
                <ShowPoint username={context.user} />
              </h3>
              <button
                onClick={() => context.postCommentOpen(true)}
                className="btn btn-outline-danger my-2 my-sm-0"
              >
                POST
              </button>

              <button
                onClick={() => auth.signOut()}
                className="btn btn-outline-danger my-2 my-sm-0"
              >
                LOGOUT
              </button>
            </div>
          ) : (
            <div className="app_logincontainer">
              <button
                className="btn btn-outline-danger my-2 my-sm-0 login"
                onClick={() => setOpenSignIn(true)}
              >
                LOGIN
              </button>
              <button
                className="btn btn-outline-danger my-2 my-sm-0"
                onClick={() => setOpen(true)}
              >
                SIGNUP
              </button>
            </div>
          )}

          {/* </form> */}
        </div>
      </nav>
    </div>
  );
}

export default Header;
