import {useSelector} from "react-redux";
import {Grid} from "@mui/material";
import PostForm from "../postForm/PostForm";
import Filter from "../filter/Filter";
import {selectCurrentUser} from "../../slices/userSlice";
import Posts from "../../features/posts/Posts";

const Home = () => {
  const currentUser = useSelector(selectCurrentUser);

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        spacing={{xs: 2, md: 3}}>
        <Grid item xs={12} sm={7} md={8} lg={8}>
          {currentUser.username !== null && <PostForm />}
        </Grid>
        <Grid item xs={4} sm={5} md={4} lg={4}>
          <Filter />
        </Grid>
      </Grid>
      <Posts />
    </>
  );
};

export default Home;
