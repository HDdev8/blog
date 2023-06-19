import {useSelector} from "react-redux";
import {Grid, Box} from "@mui/material";
import PostForm from "../forms/PostForm";
import Filter from "../filter/Filter";
import {selectCurrentUser} from "../../../slices/userSlice";
import Posts from "../../../features/posts/Posts";
import {useGetPostsQuery} from "../../../slices/apiSlice";

const Home = () => {
  const currentUser = useSelector(selectCurrentUser);

  const {data: posts, isError, isLoading} = useGetPostsQuery();

  return (
    <>
      <Grid container direction="row" justifyContent="space-between" alignItems="flex-start">
        <Box>{currentUser.username !== null && <PostForm />}</Box>
        <Box>
          <Filter />
        </Box>
      </Grid>
      {isError ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : posts ? (
        <Posts />
      ) : null}
    </>
  );
};

export default Home;
