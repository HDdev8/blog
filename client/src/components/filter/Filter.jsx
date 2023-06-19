import {InputAdornment, TextField} from "@mui/material";
import {useDispatch} from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import {filterPost} from "../../slices/filterSlice";

const Filter = () => {
  const dispatch = useDispatch();

  const handleFilter = (e) => {
    filterPost(dispatch, e.target.value);
  };

  return (
    <TextField
      label="Post Search"
      id="post-filter"
      sx={{mt: 1, mb: 1, ml: 1, width: "25ch"}}
      size="small"
      onChange={handleFilter}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default Filter;
