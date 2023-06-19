import {useNavigate, Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {useEffect, useMemo} from "react";
import {Card, CardContent, Typography} from "@mui/material";
import {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useGetUsersQuery,
  useGetUserByIdQuery,
  useAddNewPostMutation,
  useEditPostMutation,
  useAddLikeMutation,
} from "../../slices/apiSlice";
import {createSelector} from "@reduxjs/toolkit";

const User = (props) => {
  const {user} = props;
  const navigate = useNavigate();

  const {data: allPosts} = useGetPostsQuery();

  /* Check this out in RTK 8 docs */
  // const user = useSelector((state) => selectUserById(state, userId));

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [navigate, user]);

  // const selectPostsForUser = useMemo(() => {
  //   const emptyArray = [];
  //   return createSelector(
  //     (res) => res.data,
  //     (res, userId) => userId,
  //     (data, userId) => data?.filter((post) => post.user === userId) ?? emptyArray
  //   );
  // }, []);

  // const {postsForUser} = useGetPostsQuery(undefined, {
  //   selectFromResult: (result) => ({...result, postsForUser: selectPostsForUser(result, userId)}),
  // });

  // const {data: post} = useGetPostByIdQuery();

  const postById = (id) => allPosts.find((p) => p.id === id);
  const mappedPosts = user.posts.map((post) => postById(post));
  // const mappedPosts = user.posts.map((post) => post);

  if (user && allPosts) {
    return (
      <Card sx={{maxWidth: "100%", margin: "1rem", wordWrap: "break-word"}}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {user.name}
          </Typography>
          <Typography gutterBottom variant="body2" sx={{color: "text.secondary"}}>
            {user.username}
          </Typography>
          {mappedPosts.map((post) => (
            <Typography key={post.id} gutterBottom variant="body2">
              <Link to={`/api/posts/${post.id}`}>{post.title}</Link>
            </Typography>
          ))}
        </CardContent>
      </Card>
    );
  }
};

export default User;
