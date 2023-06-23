import {useEffect} from "react";
import {useNavigate, Link, useParams} from "react-router-dom";
import {Card, CardContent, Typography} from "@mui/material";
import {useGetPostsQuery, useGetUserByIdQuery} from "../../slices/apiSlice";

const User = () => {
  const navigate = useNavigate();
  const params = useParams();
  const userId = params.id;

  const {data: queriedUser, isLoading: userLoading} = useGetUserByIdQuery(userId);
  const {data: allPosts} = useGetPostsQuery();

  useEffect(() => {
    if (!queriedUser && !userLoading) {
      navigate("/");
    }
  }, [navigate, queriedUser, userLoading]);

  const postById = (id) => allPosts.find((p) => p.id === id);

  if (queriedUser && allPosts) {
    const mappedPosts = queriedUser.posts.map((post) => postById(post));
    const filteredPosts = mappedPosts.filter((post) => post !== undefined);

    return (
      <Card sx={{maxWidth: "100%", margin: "1rem", wordWrap: "break-word"}}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {queriedUser.name}
          </Typography>
          <Typography gutterBottom variant="body2" sx={{color: "text.secondary"}}>
            {queriedUser.username}
          </Typography>
          {filteredPosts &&
            filteredPosts.map((post) => (
              <Typography key={post.id} gutterBottom variant="body2">
                <Link to={`/api/posts/${post.id}`}>{post.title}</Link>
              </Typography>
            ))}
        </CardContent>
      </Card>
    );
  }
};

export default User;
