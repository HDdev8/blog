import {useSelector} from "react-redux";
import {Grid, Box} from "@mui/material";
import PostForm from "../postForm/PostForm";
import Filter from "../filter/Filter";
import {selectCurrentUser} from "../../slices/userSlice";
import Posts from "../../features/posts/Posts";

const Home = () => {
  const currentUser = useSelector(selectCurrentUser);

  return (
    <>
      <Grid container direction="row" justifyContent="space-between" alignItems="flex-start">
        <Box>{currentUser.username !== null && <PostForm />}</Box>
        <Box>
          <Filter />
        </Box>
      </Grid>
      <Posts />
    </>
  );
};

export default Home;
