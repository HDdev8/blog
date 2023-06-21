import {useEffect} from "react";
import {ThemeProvider, createTheme} from "@mui/material/styles";
import {useDispatch} from "react-redux";
import {CssBaseline, Container} from "@mui/material";
import {Routes, Route, useMatch} from "react-router-dom";
import {setLocalUser, clearUserState} from "../slices/userSlice";
import Home from "../components/home/Home";
import SignIn from "../features/signIn/SignIn";
import SignUp from "../features/signUp/SignUp";
import Posts from "../features/posts/Posts";
import Post from "../features/posts/Post";
import Users from "../features/users/Users";
import User from "../features/users/User";
import Notification from "../components/notification/Notification";
import Footer from "../components/footer/Footer";
import NavBar from "../components/nav/NavBar";
import parseJwt from "../utils/parseJwt";
import {fromTimestamp, currentTime} from "../utils/time";

const theme = createTheme({
  palette: {
    contrastThreshold: 4.5,
  },
});


const App = () => {
  const dispatch = useDispatch();
  const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");

  useEffect(() => {
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      const jwtToken = parseJwt(loggedUser.token);
      const expiry = fromTimestamp(jwtToken.exp);
      const timeNow = currentTime();
      timeNow < expiry ? setLocalUser(dispatch, loggedUser) : clearUserState(dispatch);
    }
  }, [dispatch, loggedUserJSON]);


  const postMatch = useMatch("/api/posts/:id");
  const userMatch = useMatch("/api/users/:id");

  //   const postMatch = useMatch("/posts/:id");
  // const userMatch = useMatch("/users/:id");

  // const matchedPost = postMatch ? allPosts.find((p) => p.id === postMatch.params.id) : null;
  // const matchedUser = userMatch ? allUsers.find((u) => u.id === userMatch.params.id) : null;


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}>
        <NavBar />
        <Container component="main" sx={{display: "flex", flexDirection: "column"}}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/api/posts" element={<Posts />} />
            <Route path="/api/posts/:id" element={postMatch && <Post />} />
            <Route path="/api/users" element={<Users />} />
            <Route path="/api/users/:id" element={userMatch && <User />} />
            <Route path="/api/login" element={<SignIn />} />
            {/* <Route path="/posts" element={<Posts />} />
            <Route path="/posts/:id" element={postMatch && <Post />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={userMatch && <User />} />
            <Route path="/login" element={<SignIn />} /> */}
            <Route path="/signup" element={<SignUp />} />
          </Routes>
          <Notification />
        </Container>
        <Footer />
      </Container>
    </ThemeProvider>
  );
};

export default App;
