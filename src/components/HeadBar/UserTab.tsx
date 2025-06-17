import { AccountCircle } from "@mui/icons-material";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Icon,
  IconButton,
  MenuItem,
} from "@mui/material";

import MoreIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CartIcon from "@mui/icons-material/ShoppingCart";
import type { IUserResource } from "../../interfaces/IUser";
import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../contexts/AuthContext";

interface Props {
  user: IUserResource;
}
export default function UserTab({ user }: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const renderGuestMenu = (
    <Box sx={{ display: "flex", flexDirection: "row", gap: 2, py: 2 }}>
      <Button variant="contained" onClick={() => navigate("/login")}>
        Masuk
      </Button>
      <Button
        sx={{ display: { xs: "none", md: "block" } }}
        variant="outlined"
        onClick={() => navigate("/register")}
      >
        Daftar
      </Button>
    </Box>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" color="inherit">
          <Badge color="error">
            <CartIcon />
          </Badge>
        </IconButton>
        <p>Your Watchlist</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <Avatar src={user?.profile_url}></Avatar>
        </IconButton>
        <p>
          {user?.first_name} {user?.last_name}
        </p>
      </MenuItem>
    </Menu>
  );

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem>
        <Avatar
          sx={{ marginRight: 2 }}
          alt={user?.username}
          src={user?.profile_url}
        />

        <p>
          {user?.first_name} {user?.last_name}
        </p>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      <MenuItem onClick={() => logout()}>Log Out</MenuItem>
    </Menu>
  );
  return (
    <>
      {user && (
        <>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              edge="end"
              aria-label={user?.username}
              aria-controls={menuId}
              aria-haspopup="true"
              onMouseOver={handleProfileMenuOpen}
              color="inherit"
            >
              <Avatar src={user?.profile_url} />
            </IconButton>
          </Box>

          <Box sx={{ display: { md: "none", xs: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </>
      )}

      {!user && renderGuestMenu}

      {user && renderMobileMenu}
      {user && renderMenu}
    </>
  );
}
