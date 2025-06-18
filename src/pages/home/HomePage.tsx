import { Typography, Box, Grid, Paper, Chip } from "@mui/material";
import Page from "../layout/Page.tsx";
import HeadBar from "../../components/HeadBar/HeadBar.tsx";
import Promo1 from "/promo_1.png";
import useFetchCategories from "../../hooks/useFetchCategories.tsx";
import useFetchLists from "../../hooks/useFetchLists.tsx";
import { formatPrice } from "../../utilities/formatPrice.ts";
import MovingIcon from "@mui/icons-material/Moving";
import { useNavigate } from "react-router";

export default function Home() {
  const category = useFetchCategories();
  const lists = useFetchLists("");
  const navigate = useNavigate();

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

        <Grid container spacing={2} columns={12}>
          {lists.map((list) => (
            <Grid
              size={{ xs: 6, md: 4 }}
              display="flex"
              flexDirection="column"
              gap={2}
              alignItems="stretch"
            >
              <Box
                onClick={() => navigate(`/listing/${list.id}`)}
                component="img"
                src={list.bucket_url[0]}
                sx={{
                  height: "20rem",
                  objectFit: "cover",
                  borderRadius: 4,
                  backgroundColor: "grey",
                }}
              />
              <Box
                sx={{ overflow: "hidden", textWrap: "wrap", height: "4rem" }}
              >
                <Typography variant="body1">{list.name}</Typography>
              </Box>

              <Box
                sx={{ overflow: "hidden", textWrap: "wrap", height: "2rem" }}
              >
                <Chip label="New Lists" />
              </Box>

              <Box
                sx={{ overflow: "hidden", textWrap: "wrap", height: "4rem" }}
              >
                <Typography fontSize="2rem" fontWeight={700} color="primary">
                  {formatPrice(list.value_current)} <MovingIcon />
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Page>
    </>
  );
}
