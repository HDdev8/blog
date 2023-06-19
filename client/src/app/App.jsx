/* eslint-disable import/no-unresolved */
/* eslint-disable no-nested-ternary */
import {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {ThemeProvider, createTheme} from "@mui/material/styles";
import {CssBaseline, Container} from "@mui/material";
import {Routes, Route, useMatch} from "react-router-dom";
import {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useGetUsersQuery,
  useGetUserByIdQuery,
  useAddNewPostMutation,
  useEditPostMutation,
  useAddLikeMutation,
} from "../slices/apiSlice";
import {filterPost} from "../common/components/filter/filterSlice";
import {retrieveUser} from "../slices/userSlice";
import Home from "../common/components/home/Home";
import SignIn from "../features/signin/SignIn";
import SignUp from "../features/signup/SignUp";
import Post from "../features/posts/Post";
import Users from "../features/users/Users";
import User from "../features/users/User";
import Notification from "../common/components/notifications/Notification";
import Footer from "../common/components/footer/Footer";
import NavBar from "../common/components/nav/NavBar";

const theme = createTheme();

const App = () => {
  const dispatch = useDispatch();
  const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
  const postMatch = useMatch("/api/posts/:id");
  const userMatch = useMatch("/api/users/:id");

  const {data: posts} = useGetPostsQuery();
  const {data: allUsers} = useGetUsersQuery();

  useEffect(() => {
    filterPost(dispatch, "");
  }, [dispatch]);

  useEffect(() => {
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      retrieveUser(dispatch, loggedUser);
    }
  }, [dispatch, loggedUserJSON]);

  const matchedPost = postMatch ? posts.find((p) => p.id === postMatch.params.id) : null;
  const matchedUser = userMatch ? allUsers.find((u) => u.id === userMatch.params.id) : null;

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
            <Route path="/api/posts/:id" element={matchedPost && <Post post={matchedPost} />} />
            <Route path="/api/users" element={<Users />} />
            <Route path="/api/users/:id" element={matchedUser && <User user={matchedUser} />} />
            <Route path="/api/login" element={<SignIn />} />
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
