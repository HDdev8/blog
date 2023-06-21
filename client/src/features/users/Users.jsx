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
  const {data: allUsers, isError, isLoading} = useGetUsersQuery();

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
            {isError ? (
              <TableRow>
                <TableCell>Oh no, there was an error</TableCell>
              </TableRow>
            ) : isLoading ? (
              <TableRow>
                <TableCell>Loading</TableCell>
              </TableRow>
            ) : allUsers ? (
              allUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <Link to={`/api/users/${user.id}`}>{user.username}</Link>
                  </TableCell>
                  <TableCell>{user.posts.length}</TableCell>
                </TableRow>
              ))
            ) : null}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Users;
