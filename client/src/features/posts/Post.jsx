import {useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {Grid, CardActionArea, Card, CardContent, Typography, Button, Tooltip} from "@mui/material";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import PropTypes from "prop-types";
import {Link, useNavigate, useParams} from "react-router-dom";
import {
  errorNotification,
  successNotification,
} from "../../common/components/notifications/notificationSlice";
import {
  useAddLikeMutation,
  useAddNewPostMutation,
  useAddNewUserMutation,
  useAddReactionMutation,
  useEditPostMutation,
  useGetPostByIdQuery,
  useGetPostsQuery,
  useGetUserByIdQuery,
  useGetUsersQuery,
  useUpdateThePostMutation,
  useDeleteThePostMutation,
  // setToken,
} from "../../slices/apiSlice";
import {selectCurrentUser, selectAllUsers, selectCurrentUserToken} from "../../slices/userSlice";
import HeartBadge from "../../common/badges/HeartBadge";
import {useUserAuth} from "../../slices/useUserAuth";

const PostPost = (props) => {
  const [visible, setVisible] = useState(false);
  const {post} = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const params = useParams();
  const currentUser = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentUserToken);
  const auth = useUserAuth();
  console.log("PostPost currentUser", currentUser);
  console.log("PostPost token", token);
  console.log("PostPost useUserAuth auth", auth);
  let config;
  // const config = {
  //   headers: {Authorization: token},
  // };

  const [updateThePost, {isLoading}] = useUpdateThePostMutation();
  const [deleteThePost, {isLoading: isDeleting}] = useDeleteThePostMutation();

  const {data: postAuthor} = useGetUserByIdQuery(post.user.id);

  // const {data: onePost} = useGetPostByIdQuery(post.id);
  // const [editPost, {isLoading}] = useEditPostMutation();
  // const [updatePost, {isLoading}] = useEditPostMutation();
  // const [updatePost, {isLoading}] = useAddLikeMutation();

  const toggleVisibility = (e) => {
    e.preventDefault();
    setVisible(!visible);
  };

  const upvote = async (e, p) => {
    e.preventDefault();
    // if (token) {
    //   setToken(token);
    // }
    // if (!isLoading) {
    if (auth) {
      config = {
        headers: {Authorization: token},
      };
      try {
        const postObject = {
          ...p,
          likes: p.likes + 1,
        };
        const {id} = post;
        // await updatePost(postObject);
        await updateThePost({id, config, postObject}).unwrap();
        // await updatePost(post);
        // await updatePost(dispatch, postObject);
        successNotification(dispatch, `You liked "${postObject.title}"!`);
      } catch (exception) {
        errorNotification(dispatch, `You must be signed in to like a post`);
      }
    }
  };

  const deletePostEntry = async (e, p) => {
    e.preventDefault();
    try {
      // await removePost(dispatch, post);
      deleteThePost(p.id).then(() => navigate("/posts"));
      successNotification(dispatch, `${p.title} was deleted`);
    } catch (exception) {
      errorNotification(dispatch, exception);
    }
  };

  const hideWhenVisible = {display: visible ? "none" : ""};
  const showWhenVisible = {display: visible ? "" : "none"};

  const titleField = `${post.title}`;
  const contentField = `${post.content}`;
  const urlField = `${post.url}`;
  const likesField = post.likes;

  const showLabel = `Continue reading...`;
  const hideLabel = `Hide`;
  const deleteLabel = `Delete`;

  if (!post) {
    navigate("/");
  }

  if (post && postAuthor) {
    return (
      <Grid item xs={12} md={12}>
        <CardActionArea>
          <Card sx={{display: "flex"}}>
            <CardContent sx={hideWhenVisible}>
              <Typography component="h5" variant="h5">
                {titleField}
              </Typography>
              <Typography variant="subtitle1" color="primary" onClick={toggleVisibility}>
                {showLabel}
              </Typography>
            </CardContent>
            <CardContent sx={showWhenVisible}>
              <Typography component="h5" variant="h5">
                {titleField}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                by {""}
                <Typography component={Link} to={`/api/users/${postAuthor.id}`}>
                  {postAuthor.username}
                </Typography>
              </Typography>
              <Typography variant="body1" gutterBottom>
                {contentField}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {urlField}
              </Typography>
              <HeartBadge
                className="heartBadge"
                handleClick={(e) => upvote(e, post)}
                likes={likesField}
              />
              <Typography
                gutterBottom
                variant="subtitle1"
                color="primary"
                onClick={toggleVisibility}>
                {hideLabel}
              </Typography>
              {currentUser && currentUser.username === postAuthor ? (
                <Button size="small" variant="outlined" onClick={(e) => deletePostEntry(e, post)}>
                  {deleteLabel}
                </Button>
              ) : (
                ""
              )}
            </CardContent>
          </Card>
        </CardActionArea>
      </Grid>
    );
  }
};

PostPost.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default PostPost;
