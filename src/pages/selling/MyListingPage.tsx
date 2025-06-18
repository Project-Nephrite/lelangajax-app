import { Avatar, Box, Paper, Typography } from "@mui/material";
import Page from "../layout/Page";
import { useAuth } from "../../contexts/AuthContext";
import HeadBar from "../../components/HeadBar/HeadBar";
import StarRateIcon from "@mui/icons-material/StarRate";
import MyListingDrawer from "./MyListingDrawer";
import { Outlet } from "react-router";

export default function MyListingPage() {
  const { user } = useAuth();
  return (
    <>
      <HeadBar />
      <Page footer sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <MyListingDrawer />
        <Box>
          <Typography variant="h1">Listing Anda</Typography>
        </Box>
        <Paper
          sx={{
            display: "flex",
            flexDirection: "row",
            p: 4,
            alignItems: "center",
            gap: 4,
          }}
        >
          <Avatar sx={{ width: 72, height: 72 }} src={user?.profile_url} />
          <Box sx={{ display: "flex" }}>
            <Typography fontSize={24} sx={{ overflowX: "scroll" }}>
              {user?.first_name} {user?.last_name}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: 18,
                }}
              >
                <StarRateIcon />
                3.0
              </Box>
            </Typography>
          </Box>
        </Paper>

        <Outlet />
      </Page>
    </>
  );
}
