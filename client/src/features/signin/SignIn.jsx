import {Avatar, Button, TextField, Grid, Box, Typography, Container} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {useDispatch} from "react-redux";
import {useNavigate, Link} from "react-router-dom";
import {errorNotification, successNotification} from "../../slices/notificationSlice";
import {useSignInMutation} from "../../slices/apiSlice";
import {setUserState} from "../../slices/userSlice";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [signIn, {isLoading}] = useSignInMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const username = data.get("username");
    const password = data.get("current-password");
    const canSubmit = [username, password].every(Boolean) && !isLoading;
    if (canSubmit) {
      try {
        const user = await signIn({username, password}).unwrap();
        if (user) {
          setUserState(dispatch, user);
          await successNotification(dispatch, `${username} has logged in!`);
          navigate("/");
        }
      } catch (exception) {
        errorNotification(dispatch, `Incorrect username or password`);
      }
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
        <Avatar sx={{m: 1, bgcolor: "primary.main"}}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 3}}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Username"
                name="username"
                id="username"
                autoComplete="username"
                size="small"
                variant="outlined"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="password"
                label="Password"
                name="current-password"
                id="current-password"
                autoComplete="current-password"
                size="small"
                variant="outlined"
                fullWidth
                required
              />
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" fullWidth sx={{mt: 3, mb: 2}}>
            Sign In
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Typography variant="body2" component={Link} to="/signup">
                Don't have an account? Sign up
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SignIn;
