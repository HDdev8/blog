import {Box, Badge, Tooltip} from "@mui/material";
import {styled} from "@mui/material/styles";
import Heart from "./Heart";

const StyledBadge = styled(Badge)(({theme}) => ({
  "& .MuiBadge-badge": {
    right: -2,
    top: 0,
    border: `.0156rem solid ${theme.palette.primary.main}`,
    padding: "0 .25rem",
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.primary.main,
    fontSize: ".85rem",
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
      <Box mt={".625rem"} mb={".25rem"}>
        <Tooltip title="Likes" placement="right">
          <StyledBadge
            badgeContent={likes}
            showZero
            max={999999}
            sx={{
              "&:hover": {
                transform: "scale(1.2)",
              },
              transitionDuration: ".3s",
            }}>
            <Heart
              onClick={handleClick}
              sx={{
                fontSize: 30,
                color: "#ff4767",
                "&:hover": {
                  color: "#ff294e",
                },
                "&:active": {
                  color: "##ff1e4e",
                  stroke: "#ff4767",
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
