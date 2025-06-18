import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import type { IListingResource } from "../../interfaces/IListing";
import ListingService from "../../services/ListingService";
import Page from "../layout/Page";
import HeadBar from "../../components/HeadBar/HeadBar";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Grid,
  ListItem,
  List,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { type IUserResource } from "../../interfaces/IUser";
import UserService from "../../services/UserService";
import Carousel from "../../components/Carousel";
import { formatPrice } from "../../utilities/formatPrice";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import useFetchBiddings from "../../hooks/useFetchBiddings";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";

export default function ListingDetailPage() {
  const param = useParams();
  const desktop = useMediaQuery("(min-width:767px)");
  const navigate = useNavigate();

  const [data, setData] = useState<IListingResource | null>(null);
  const [seller, setSeller] = useState<IUserResource | null>(null);
  const biddings = useFetchBiddings(data?.id!);

  useEffect(() => {
    (async () => {
      setData(await ListingService.detail(param?.id!));
    })();
  }, []);
  useEffect(() => {
    if (!data) return;
    (async () => {
      setSeller(await UserService.detail(data.seller_id!));
    })();
  }, [data]);

  const handleBid = () => navigate(`/bid/${data?.id}`);

  return (
    <>
      <HeadBar />
      <Page>
        <Grid
          container
          columns={{ md: 12, xs: 8 }}
          columnSpacing={2}
          rowSpacing={2}
        >
          <Grid
            size={{ md: 8, xs: 12 }}
            container
            alignItems="center"
            justifyContent="center"
          >
            <Carousel>
              {data?.bucket_url!.map((url, index) => (
                <Paper
                  component="img"
                  key={index}
                  src={url}
                  sx={{
                    borderRadius: 4,
                    width: desktop ? "40rem" : "80vw",
                    height: desktop ? "40rem" : "80vw",
                    objectFit: "cover",
                  }}
                />
              ))}
            </Carousel>
          </Grid>

          <Grid
            size={{ md: 4, xs: 12 }}
            container
            display="flex"
            flexDirection="column"
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar src={seller?.profile_url} />

              <Typography>{seller?.username}</Typography>
            </Box>
            <Divider />{" "}
            <Box>
              <Typography
                fontWeight={700}
                fontSize={{ xs: "1.5rem", md: "2rem" }}
                gutterBottom
              >
                {data?.name}
              </Typography>

              <Typography>Harga saat ini</Typography>
              <Typography fontWeight={400} color="primary" fontSize="2rem">
                {formatPrice(data?.value_current!)}
              </Typography>
            </Box>
            <Divider />
            <Box display="flex" flexWrap="wrap" flexDirection="row" gap={2}>
              <Chip label="Barang Langka" />
              <Chip
                label={
                  biddings.length > 0 ? `${biddings.length} Bids` : "Baru live"
                }
              />
            </Box>
            <Divider />
            <Box display="flex" flexDirection="column" gap={2}>
              <Button variant="contained" size="large" onClick={handleBid}>
                Bid Sekarang
              </Button>
              <Button variant="outlined" size="large">
                <AddShoppingCartIcon sx={{ marginRight: 2 }} />
                Tambahkan ke Watchlist
              </Button>
            </Box>
          </Grid>

          <Grid size={12} container gap={4} flexDirection="column">
            <Box>
              <Typography variant="h4">Detail Barang</Typography>
            </Box>
            <Typography>{data?.description!}</Typography>
            <Divider />
            <Box>
              <Typography variant="h4">Daftar lelang</Typography>
            </Box>
            <List
              sx={{
                width: "100%",
                maxWidth: 360,
                bgcolor: "background.paper",
                overflow: "scroll",
                maxHeight: "12rem",
              }}
            >
              {biddings.map((bid) => (
                <ListItem key={bid.index}>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: "primary.main" }}>
                      <PriceCheckIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={formatPrice(bid.value)}
                    secondary={bid.timestamp}
                  />
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </Page>
    </>
  );
}
