import { Typography, Box, Grid, Paper } from "@mui/material";
import Page from "../layout/Page.tsx";
import HeadBar from "../../components/HeadBar/HeadBar.tsx";
import Promo1 from "/promo_1.png";
import useFetchCategories from "../../hooks/useFetchCategories.tsx";

export default function Home() {
  const category = useFetchCategories();

  return (
    <>
      <HeadBar />

      <Page>
        <Box
          component="img"
          src={Promo1}
          sx={{ width: "100%", borderRadius: 4 }}
        ></Box>

        <Box sx={{ my: 4, gap: 4 }}>
          <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
            Kategori Populer
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              overflowX: "scroll",
              p: 4,
            }}
          >
            {category.map((x, index) => (
              <Paper
                key={index}
                sx={(theme) => ({
                  typography: "body2",
                  px: 4,
                  py: 2,
                  gap: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                })}
              >
                <Box
                  component="img"
                  src={x.image_url}
                  sx={{
                    objectFit: "contain",
                    width: "4rem",
                    height: "4rem",
                    margin: "auto",
                  }}
                />
                <Typography>{x.name}</Typography>
              </Paper>
            ))}
          </Box>
        </Box>
      </Page>
    </>
  );
}
