import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import CreateIcon from "@mui/icons-material/Create";
import ChecklistIcon from "@mui/icons-material/Checklist";
import { useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router";

const drawerWidth = 240;

export default function MyListingDrawer() {
  const desktop = useMediaQuery("(min-width:767px)");
  const navigate = useNavigate();
  if (desktop)
    return (
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("/myListing")}>
                <ListItemIcon>
                  <ChecklistIcon />
                </ListItemIcon>

                <ListItemText primary={"Daftar Listing"} />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("/myListing/create")}>
                <ListItemIcon>
                  <CreateIcon />
                </ListItemIcon>

                <ListItemText primary={"Buat listing baru"} />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
        </Box>
      </Drawer>
    );
}
