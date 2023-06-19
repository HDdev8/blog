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
      await addNewPost(postObject);
      setNewTitle("");
      setNewContent("");
      successNotification(dispatch, `You created a new post: "${postObject.title}"`);
    } catch (exception) {
      errorNotification(dispatch, exception.response.data.error);
    }
  };

  const labels = {close: "Cancel", open: "Create Post"};

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
              },
            }}
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
              fullWidth
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
              fullWidth
            />
            <Button type="submit" size="small" variant="outlined">
              Post
            </Button>
            <Button type="button" size="small" variant="outlined" onClick={handleOpen}>
              Cancel
            </Button>
          </Box>
        )}
        {open === false && (
          <Button type="button" onClick={handleOpen}>
            {labels.open}
          </Button>
        )}
      </Stack>
    </FocusTrap>
  );
};

export default PostForm;
