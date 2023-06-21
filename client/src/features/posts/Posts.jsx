import {useState, useMemo} from "react";
import {useSelector} from "react-redux";
import {Grid, Typography, Tooltip, Button} from "@mui/material";
import SortDown from "./icons/SortDown";
import SortUp from "./icons/SortUp";
import Post from "./Post";
import sortData from "./utils/sortData";
import filterData from "./utils/filterData";
import {useGetPostsQuery} from "../../slices/apiSlice";
import {selectFilter} from "../../slices/filterSlice";

const Posts = () => {
  const [isSorted, setIsSorted] = useState(false);
  const {data: allPosts, isError, isLoading} = useGetPostsQuery();

  const filter = useSelector(selectFilter);


  const unfilteredPosts = useMemo(
    () => sortData(allPosts, "likes", isSorted),
    [isSorted, allPosts]
  );

  const filteredPosts = useMemo(
    () => filterData(unfilteredPosts, "title", filter),
    [unfilteredPosts, filter]
  );

  const filteredList = !filter ? unfilteredPosts : filteredPosts;

  const sortIcon = isSorted === false ? <SortDown /> : <SortUp />;

  return (
    <>
      <Typography component="h5" variant="h6" align="center" noWrap>
        Posts
      </Typography>
      <Tooltip title="Sort by likes" placement="left">
        <Button
          style={{alignSelf: "end"}}
          type="button"
          size="small"
          variant="outlined"
          onClick={() => setIsSorted(!isSorted)}>
          {sortIcon}
        </Button>
      </Tooltip>
      {isError ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : allPosts ? (
        <Grid container spacing={4}>
          {filteredList.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </Grid>
      ) : null}
    </>
  );
};

export default Posts;
