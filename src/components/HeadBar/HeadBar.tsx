import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CartIcon from "@mui/icons-material/ShoppingCart";
import Logo from "/brand_1.png";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router";
import { useMediaQuery } from "@mui/material";
import UserTab from "./UserTab";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  flex: 1,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.1),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.2),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  flex: 1,
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));

export default function HeadBar() {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const desktop = useMediaQuery("(min-width: 767px)");

  return (
    <Box sx={{ flexGrow: 1, pt: 8 }}>
      <AppBar
        position="fixed"
        sx={{
          top: 0,
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "background.default",
          color: "primary.main",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            gap: desktop ? 12 : 0,
          }}
        >
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            <Box
              component="img"
              src={Logo}
              onClick={() => navigate("/")}
              sx={{
                objectFit: "cover",
                width: "8rem",
                display: "flex",
                alignItems: "center",
              }}
            />
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Cari di LelangAjax..."
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Box sx={{ display: "flex" }}>
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
              >
                <CartIcon />
              </IconButton>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge>
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Box>
            <UserTab user={user} />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
