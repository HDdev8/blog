import {Box, Badge, Tooltip} from "@mui/material";
import {styled} from "@mui/material/styles";
import {red, pink, grey} from "@mui/material/colors";
import Heart from "../icons/Heart";

const pinkA200 = pink["A200"];
const pinkA300 = pink["A300"];
const redA400 = red["A400"];
const grey300 = grey["300"];
const grey400 = grey["400"];

const StyledBadge = styled(Badge)(({theme}) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: -3,
    border: `1px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const HeartBadge = ({handleClick, likes}) => {
  return (
    <Box
      sx={{
        color: "action.active",
        display: "flex",
        flexDirection: "column",
        "& > *": {
          marginBottom: 2,
        },
        "& .MuiBadge-root": {
          marginRight: 4,
        },
      }}>
      <Box mt={"10px"} mb={"4px"}>
        <Tooltip title="Likes" placement="right">
          <StyledBadge color="primary" badgeContent={likes} showZero max={999999}>
            <Heart
              onClick={handleClick}
              sx={{
                fontSize: 36,
                color: pinkA200,
                "&:hover": {
                  color: pinkA300,
                  stroke: grey300,
                },
                "&:active": {
                  color: redA400,
                  stroke: grey400,
                },
              }}
            />
          </StyledBadge>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default HeartBadge;
