import {Link} from "react-router-dom";
import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TableHead,
  Typography,
} from "@mui/material";
import {useGetUsersQuery} from "../../slices/apiSlice";

const Users = () => {
  const {data: allUsers} = useGetUsersQuery();

  if (allUsers) {
    return (
      <>
        <Typography component="h5" variant="h6" align="center" noWrap mb={"32px"}>
          Users
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Users</TableCell>
                <TableCell>Post List</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <Link to={`/api/users/${user.id}`}>{user.username}</Link>
                  </TableCell>
                  <TableCell>{user.posts.length}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  }
};

export default Users;
