import {useState, useMemo} from "react";
import {useSelector} from "react-redux";
import {Grid, Typography, Tooltip, Button} from "@mui/material";
import SortDown from "../../common/icons/SortDown";
import SortUp from "../../common/icons/SortUp";
import Post from "./Post";
import sortData from "../../common/utils/sortData";
import filterData from "../../common/utils/filterData";
import {useGetPostsQuery} from "../../slices/apiSlice";
import {selectFilter} from "../../common/components/filter/filterSlice";

const Posts = () => {
  const [isSorted, setIsSorted] = useState(false);
  const {data: posts, isError, isLoading} = useGetPostsQuery();
  const filter = useSelector(selectFilter);

  const sortedPosts = useMemo(() => sortData(posts, "likes", isSorted), [isSorted, posts]);
  const filteredPosts = useMemo(
    () => filterData(sortedPosts, "title", filter),
    [sortedPosts, filter]
  );

  const filteredList = !filter ? sortedPosts : filteredPosts;

  const sortIcon = isSorted === false ? <SortDown /> : <SortUp />;

  return (
    <>
      <Typography component="h5" variant="h6" align="center" noWrap>
        Posts
      </Typography>
      <Tooltip title="Sort by likes">
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
      ) : posts ? (
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
