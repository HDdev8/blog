import {useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {Grid, CardActionArea, Card, CardContent, Typography, Button} from "@mui/material";
import PropTypes from "prop-types";
import {Link, useNavigate} from "react-router-dom";
import {errorNotification, successNotification} from "../../slices/notificationSlice";
import {
  useGetUserByIdQuery,
  useUpdatePostMutation,
  useDeletePostMutation,
} from "../../slices/apiSlice";
import {selectCurrentUser} from "../../slices/userSlice";
import HeartBadge from "./badges/HeartBadge";

const Post = (props) => {
  const [visible, setVisible] = useState(false);
  const {post} = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentUser = useSelector(selectCurrentUser);
  const {data: postAuthor} = useGetUserByIdQuery(post.user.id);

  const [updatePost] = useUpdatePostMutation();
  const [deletePost] = useDeletePostMutation();

  const hideWhenVisible = {display: visible ? "none" : ""};
  const showWhenVisible = {display: visible ? "" : "none"};
  const titleField = `${post.title}`;
  const contentField = `${post.content}`;
  const urlField = `${post.url}`;
  const likesField = post.likes;
  const showLabel = `Continue reading...`;
  const hideLabel = `Hide`;
  const deleteLabel = `Delete`;

  const toggleVisibility = (e) => {
    e.preventDefault();
    setVisible(!visible);
  };

  const upvote = async (e, p) => {
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

  if (!post) {
    navigate("/");
  }

  if (post && postAuthor) {
    return (
      <Grid item xs={12} md={12}>
        <CardActionArea disableTouchRipple={true} component="div">
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
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component={Link}
                  gutterBottom
                  to={`/api/users/${postAuthor.id}`}>
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
              {currentUser && currentUser.username === postAuthor.username ? (
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

Post.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default Post;
