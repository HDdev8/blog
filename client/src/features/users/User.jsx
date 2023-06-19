import {useNavigate, Link} from "react-router-dom";
import {useEffect} from "react";
import {Card, CardContent, Typography} from "@mui/material";
import {useGetPostsQuery} from "../../slices/apiSlice";

const User = (props) => {
  const {user} = props;
  const navigate = useNavigate();
  const {data: allPosts} = useGetPostsQuery();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [navigate, user]);

  if (user && allPosts) {
    const postById = (id) => allPosts.find((p) => p.id === id);
    const mappedPosts = user.posts.map((post) => postById(post));

    return (
      <Card sx={{maxWidth: "100%", margin: "1rem", wordWrap: "break-word"}}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {user.name}
          </Typography>
          <Typography gutterBottom variant="body2" sx={{color: "text.secondary"}}>
            {user.username}
          </Typography>
          {mappedPosts.map((post) => (
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
