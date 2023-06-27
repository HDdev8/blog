import {useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {Grid, CardActionArea, Card, CardContent, Typography, Button} from "@mui/material";
import {Link, useNavigate, useParams} from "react-router-dom";
import {errorNotification, successNotification} from "../../slices/notificationSlice";
import {
  useGetUserByIdQuery,
  useGetPostByIdQuery,
  useUpdatePostMutation,
  useDeletePostMutation,
} from "../../slices/apiSlice";
import {selectCurrentUser} from "../../slices/userSlice";
import HeartBadge from "./badges/HeartBadge";

const Post = (props) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const currentUser = useSelector(selectCurrentUser);
  const [updatePost] = useUpdatePostMutation();
  const [deletePost] = useDeletePostMutation();
  const {post} = props;
  let postId = null;
  let userId = null;

  if (post) {
    postId = post.id;
  }
  if (!post) {
    postId = params.id;
  }

  const {data: currentPost, isLoading: postLoading} = useGetPostByIdQuery(postId);

  if (post) {
    userId = post.user.id;
  }
  if (!post && currentPost) {
    userId = currentPost.user;
  }
  if (!currentPost && !postLoading) {
    navigate("/");
  }

  const {data: postAuthor} = useGetUserByIdQuery(userId);

  const toggleOpen = (e) => {
    e.preventDefault();
    setOpen(!open);
  };

  const likePost = async (e, p) => {
    e.preventDefault();
    if (p) {
      try {
        const postObject = {
          ...p,
          likes: p.likes + 1,
        };
        await updatePost(postObject).unwrap();
        successNotification(dispatch, `You liked "${postObject.title}"!`);
      } catch (exception) {
        errorNotification(dispatch, `You must be signed in to like a post`);
      }
    }
  };

  const deletePostEntry = async (e, p) => {
    e.preventDefault();
    if (p) {
      try {
        await deletePost(p).unwrap();
        navigate("/");
        successNotification(dispatch, `${p.title} was deleted`);
      } catch (exception) {
        errorNotification(dispatch, exception);
      }
    }
  };

  const hideWhenOpen = {display: open ? "none" : ""};
  const showWhenOpen = {display: open ? "" : "none"};
  const showLabel = `Continue reading...`;
  const hideLabel = `Hide`;
  const deleteLabel = `Delete`;

  if (currentPost && postAuthor) {
    const titleField = `${currentPost.title}`;
    const contentField = `${currentPost.content}`;
    const urlField = `${currentPost.url}`;
    const likesField = currentPost.likes;

    return (
      <Grid item xs={12} md={12}>
        <CardActionArea disableTouchRipple={true} component="div">
          <Card sx={{display: "flex"}}>
            <CardContent sx={hideWhenOpen}>
              <Typography component="h5" variant="h5" sx={{wordBreak: "break-word"}}>
                {titleField}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                by {""}
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component={Link}
                  gutterBottom
                  to={`/api/users/${postAuthor.id}`}>
                  {postAuthor.username}
                </Typography>
              </Typography>
              <HeartBadge
                className="heartBadge"
                handleClick={(e) => likePost(e, currentPost)}
                likes={likesField}
              />
              <Typography variant="subtitle1" color="primary" onClick={toggleOpen}>
                {showLabel}
              </Typography>
            </CardContent>
            <CardContent sx={showWhenOpen}>
              <Typography component="h5" variant="h5" sx={{wordBreak: "break-word"}}>
                {titleField}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                by {""}
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component={Link}
                  gutterBottom
                  to={`/api/users/${postAuthor.id}`}>
                  {postAuthor.username}
                </Typography>
              </Typography>
              <HeartBadge
                className="heartBadge"
                handleClick={(e) => likePost(e, currentPost)}
                likes={likesField}
              />
              <Typography variant="body1" sx={{wordBreak: "break-word"}} gutterBottom>
                {contentField}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {urlField}
              </Typography>
              <Typography gutterBottom variant="subtitle1" color="primary" onClick={toggleOpen}>
                {hideLabel}
              </Typography>
              {currentUser && currentUser.username === postAuthor.username ? (
                <Button
                  size="small"
                  variant="outlined"
                  onClick={(e) => deletePostEntry(e, currentPost)}>
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

export default Post;
