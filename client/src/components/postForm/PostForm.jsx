import {useState} from "react";
import Stack from "@mui/system/Stack";
import FocusTrap from "@mui/base/FocusTrap";
import {Button, TextField, Box} from "@mui/material";
import {useSelector, useDispatch} from "react-redux";
import {useAddNewPostMutation} from "../../slices/apiSlice";
import {selectCurrentUser} from "../../slices/userSlice";
import {errorNotification, successNotification} from "../../slices/notificationSlice";

const PostForm = () => {
  const [open, setOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  const [addNewPost] = useAddNewPostMutation();

  const handleOpen = (e) => {
    e.preventDefault();
    setOpen(!open);
  };

  const handleTitleChange = (e) => {
    setNewTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setNewContent(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const postObject = {
      title: newTitle,
      content: newContent,
      author: currentUser.username,
    };
    try {
      const newPost = await addNewPost(postObject).unwrap();
      setNewTitle("");
      setNewContent("");
      successNotification(dispatch, `You created a new post: "${newPost.title}"`);
    } catch (error) {
      const errorString = JSON.stringify(error.data.error);
      errorNotification(dispatch, errorString);
    }
  };

  return (
    <FocusTrap open={open} disableAutoFocus disableEnforceFocus>
      <Stack alignItems={"flex-start"} spacing={2} tabIndex={-1}>
        {open && (
          <Box
            component="form"
            sx={{
              "& > :not(style)": {
                m: 1,
                display: "flex",
                flexDirection: "column",
                marginLeft: 0,
              },
            }}
            width="80%"
            marginRight={"auto"}
            noValidate
            autoComplete="off"
            onSubmit={onSubmit}>
            <TextField
              label={"Title"}
              id="postTitle"
              name="postTitle"
              variant="outlined"
              size="small"
              value={newTitle}
              onChange={handleTitleChange}
              sx={{minWidth: "14.75rem"}}
            />
            <TextField
              label={"Content"}
              id="postContent"
              name="postContent"
              variant="outlined"
              size="small"
              multiline
              rows={4}
              value={newContent}
              onChange={handleContentChange}
              sx={{minWidth: "14.75rem"}}
            />
            <Button
              type="submit"
              size="small"
              variant="outlined"
              sx={{minWidth: "6.25rem", maxWidth: "70%"}}>
              Post
            </Button>
            <Button
              type="button"
              size="small"
              variant="outlined"
              onClick={handleOpen}
              sx={{minWidth: "6.25rem", maxWidth: "70%"}}>
              Cancel
            </Button>
          </Box>
        )}
        {open === false && (
          <Button type="button" onClick={handleOpen}>
            Create Post
          </Button>
        )}
      </Stack>
    </FocusTrap>
  );
};

export default PostForm;
