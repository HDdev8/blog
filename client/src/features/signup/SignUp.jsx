import {Avatar, Button, TextField, Grid, Box, Typography, Container} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {useDispatch} from "react-redux";
import {useNavigate, Link} from "react-router-dom";
import {
  errorNotification,
  successNotification,
} from "../../common/components/notifications/notificationSlice";
import {useAddNewUserMutation} from "../../slices/apiSlice";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [addNewUser, {isLoading}] = useAddNewUserMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = data.get("name");
    const username = data.get("username");
    const password = data.get("new-password");

    const canSubmit = [name, username, password].every(Boolean) && !isLoading;

    if (canSubmit) {
      try {
        await addNewUser({name, username, password}).unwrap();
        await successNotification(dispatch, `${username} has signed up!`);
        navigate("/api/login");
      } catch (exception) {
        errorNotification(dispatch, `${exception}`);
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
          Sign up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 3}}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Name"
                name="name"
                id="name"
                autoComplete="name"
                size="small"
                variant="outlined"
                fullWidth
                required
              />
            </Grid>
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
            <Grid item xs={12}>
              <TextField
                type="password"
                label="Password"
                name="new-password"
                id="new-password"
                autoComplete="new-password"
                size="small"
                variant="outlined"
                fullWidth
                required
              />
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" fullWidth sx={{mt: 3, mb: 2}}>
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Typography variant="body2" component={Link} to="/api/login">
                Already have an account? Sign in
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
