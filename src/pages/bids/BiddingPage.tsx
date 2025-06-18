import { useEffect, useState } from "react";
import logo from "/brand_1.png";
import { useNavigate, useParams } from "react-router";
import type { IListingResource } from "../../interfaces/IListing";
import ListingService from "../../services/ListingService";
import Page from "../layout/Page";

import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import {
  Alert,
  Avatar,
  Backdrop,
  Box,
  Button,
  Chip,
  CircularProgress,
  Collapse,
  Container,
  Grid,
  IconButton,
  Paper,
  Slider,
  Snackbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import type { IUserResource } from "../../interfaces/IUser";
import UserService from "../../services/UserService";
import { formatPrice } from "../../utilities/formatPrice";
import { useForm } from "../../hooks/useForm";
import BidService from "../../services/BidService";
import { useAuth } from "../../contexts/AuthContext";

const marks = [
  {
    value: 0,
    label: "Rp. 50,000",
  },
  {
    value: 25,
    label: "Rp. 100,000",
  },
  {
    value: 50,
    label: "Rp. 200,000",
  },
  {
    value: 75,
    label: "Rp. 250,000",
  },
  {
    value: 100,
    label: "Rp. 500,000",
  },
];

const markMap: Record<number, number> = {
  0: 50000,
  25: 100000,
  50: 200000,
  75: 250000,
  100: 500000,
};

function valuetext(value: number) {
  return `Rp. ${value}`;
}

export default function BiddingPage() {
  const param = useParams();
  const [listing, setListing] = useState<IListingResource | null>(null);
  const [seller, setSeller] = useState<IUserResource | null>(null);
  const navigate = useNavigate();
  const { user } = useAuth();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const desktop = useMediaQuery("(min-width:767px)");
  const form = useForm({
    initialValues: {
      value: 0,
    },
    validate: (values) => {
      return {};
    },
    onSubmit: async (values) => {
      const value = markMap[values.value];
      await handleBid(value);
    },
  });

  useEffect(() => {
    if (!param.id) navigate("/");
    (async () => {
      setListing(await ListingService.detail(param.id as string));
    })();
  }, [form.isSubmitting]);
  useEffect(() => {
    (async () => {
      setSeller(await UserService.detail(listing?.seller_id!));
    })();
  }, [listing]);

  const handleReturn = () => {
    navigate(`/listing/${param.id}`);
  };

  const handleBid = async (value: number) => {
    const data = {
      value: value,
      listing_id: listing?.id!,
    };

    try {
      await BidService.registerBid(data, user.id);
      setSuccess("Anda telah menawar");
    } catch (error) {
      setError(error.message);
    }
  };
  useEffect(() => {
    setError("");
  }, [form.handleChange]);

  useEffect(() => {}, [form.isSubmitting]);

  return (
    <Page backgroundColor="primary.main" fullscreen sx={{ p: 8 }}>
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={form.isSubmitting}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar open={error != ""} autoHideDuration={6000}>
        <Alert severity="error" variant="filled" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
      <Snackbar open={success != ""} autoHideDuration={6000}>
        <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
          {success}
        </Alert>
      </Snackbar>

      <Grid container columns={12} columnSpacing={4} rowSpacing={4}>
        <Grid
          container
          flexDirection="column"
          size={{ md: 6, xs: 12 }}
          gap={8}
          alignItems="center"
          justifyContent="center"
        >
          <Box sx={{ mx: "auto", textAlign: "center" }}>
            <Typography fontSize="2rem" color="white">
              Harga saat ini
            </Typography>

            <Typography fontSize="4rem" fontWeight={800} color="white">
              {formatPrice(listing?.value_current!)}
            </Typography>
          </Box>
          <Paper
            variant="outlined"
            sx={{
              p: 4,
              display: "flex",
              flexDirection: "row",
              gap: 4,
              alignItems: "center",
            }}
          >
            <Avatar
              variant="rounded"
              src={listing?.bucket_url[0]}
              sx={{ width: "10rem", height: "10rem" }}
            />

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                alignItems: "start",
              }}
            >
              <Typography variant="body1">{listing?.name}</Typography>
              <Chip
                size="medium"
                avatar={
                  <Avatar alt={seller?.username} src={seller?.profile_url} />
                }
                label={seller?.username}
                variant="outlined"
              />
            </Box>
          </Paper>
        </Grid>

        {
          // Bid Panel
        }
        <Grid
          container
          size={{ md: 6, xs: 12 }}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Paper
            elevation={3}
            sx={
              desktop
                ? {
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                    p: 8,
                    flexShrink: 1,
                    my: "auto",
                    width: "24rem",
                    maxWidth: "24rem",
                    overflowY: "scroll",
                  }
                : {
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,

                    maxWidth: "24rem",
                    flexShrink: 1,
                    my: "auto",
                    p: 4,
                    overflowY: "scroll",
                  }
            }
          >
            <Box
              component="img"
              src={logo}
              sx={{
                objectFit: "contain",
                width: "12rem",
                m: "auto",
                display: "flex",
                mb: 4,
              }}
              onClick={() => handleReturn()}
            />

            <Box sx={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <Collapse orientation="vertical" in={error !== ""}>
                <Paper
                  sx={{
                    mb: 4,
                    backgroundColor: "error.main",
                    color: "error.contrastText",
                    px: 2,
                    py: 4,
                    textWrap: "wrap",
                    overflow: "hidden",
                    maxWidth: "inherit",
                  }}
                >
                  {error}
                </Paper>
              </Collapse>

              <form onSubmit={form.handleSubmit} noValidate autoComplete="off">
                <Typography variant="h5" gutterBottom>
                  Nilai Bid
                </Typography>
                <Box>
                  <Slider
                    aria-label="Restricted values"
                    defaultValue={0}
                    getAriaValueText={valuetext}
                    step={null}
                    marks={marks}
                    name="value"
                    value={form.values.value}
                    onChange={form.handleChange}
                    valueLabelDisplay="on"
                  />
                </Box>

                <Box display="flex" flexDirection="column" gap={2}>
                  <Button size="large" variant="contained" type="submit">
                    <Typography variant="h5">Bid</Typography>
                  </Button>
                  <Button size="large" variant="outlined">
                    <Typography variant="h5">Tambahkan ke Watchlist</Typography>
                  </Button>
                  <Button
                    size="large"
                    variant="outlined"
                    color="error"
                    onClick={() => handleReturn()}
                  >
                    <Typography variant="h5">Batalkan</Typography>
                  </Button>
                </Box>
              </form>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Page>
  );
}
