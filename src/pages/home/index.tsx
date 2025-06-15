// pages/Home.tsx
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  Button,
  Grid,
} from "@mui/material";
import Page from "@/pages/layout/Page";

export default function Home() {
  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Marketplace
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>

      <Page>
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" gutterBottom>
            Featured Products
          </Typography>
          <Grid container spacing={2}>
            {Array.from({ length: 4 }).map((_, idx) => (
              <Grid item xs={12} sm={6} md={3} key={idx}>
                <Box
                  sx={{
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 2,
                    p: 2,
                    height: "100%",
                  }}
                >
                  <Typography variant="subtitle1">Product {idx + 1}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Product description goes here.
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ mb: 6 }}>
          <Typography variant="h5" gutterBottom>
            Categories
          </Typography>
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            {["Electronics", "Fashion", "Home", "Books"].map((cat, idx) => (
              <Box
                key={idx}
                sx={{
                  px: 3,
                  py: 1,
                  borderRadius: 1,
                  bgcolor: "grey.100",
                  typography: "body2",
                }}
              >
                {cat}
              </Box>
            ))}
          </Box>
        </Box>

        <Box sx={{ mb: 6 }}>
          <Typography variant="h5" gutterBottom>
            Latest News
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Marketplace expands to new regions with exciting new offers.
          </Typography>
        </Box>
      </Page>

      <Box
        component="footer"
        sx={{
          bgcolor: "grey.200",
          py: 3,
          mt: "auto",
          textAlign: "center",
          typography: "body2",
        }}
      >
        &copy; {new Date().getFullYear()} Marketplace. All rights reserved.
      </Box>
    </>
  );
}
