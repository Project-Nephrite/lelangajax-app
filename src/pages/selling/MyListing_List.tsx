import { Box, Card, Container, Grid, Paper } from "@mui/material";
import useFetchMyLists from "../../hooks/useFetchMyLists";
import * as React from "react";
import { styled } from "@mui/material/styles";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useAuth } from "../../contexts/AuthContext";
import { formatPrice } from "../../utilities/formatPrice";

export default function MyListing_List() {
  const listings = useFetchMyLists();
  const { user } = useAuth();
  return (
    <>
      <Container
        sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
      >
        <Grid container spacing={4}>
          {listings.map((list, index) => {
            return (
              <Grid
                display="flex"
                flexDirection="column"
                gap={2}
                alignItems="start"
              >
                <Box
                  component="img"
                  src={list.bucket_url[0]}
                  sx={{
                    width: "20rem",
                    height: "20rem",
                    objectFit: "cover",
                    borderRadius: 4,
                    backgroundColor: "grey",
                  }}
                />
                <Typography variant="body1">{list.name}</Typography>

                <Box>
                  <Typography sx={{ fontWeight: "700" }} fontSize="2rem">
                    {formatPrice(list.value_current)}
                  </Typography>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </>
  );
}
