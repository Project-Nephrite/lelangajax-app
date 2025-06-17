// pages/LoginPage.tsx
import banner from "/login_banner.png";
import logo from "/brand_2.png";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  useMediaQuery,
  Collapse,
} from "@mui/material";
import Page from "../layout/Page";
import Footer from "../layout/Footer";
import { useNavigate } from "react-router";
import ValidationError from "../../types/ValidationError";

export default function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const [values, setValues] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const [validate, setValidate] = useState("");

  const desktop = useMediaQuery("(min-width:767px)");

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setValidate("");
    e.preventDefault();

    try {
      await login(values.email, values.password);
    } catch (error) {
      console.log(error);
      if (error instanceof ValidationError) setValidate(error.message);
    }
  };

  const handleReturn = () => {
    navigate("/");
  };

  return (
    <Page
      footer={false}
      fullscreen
      sx={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "primary.main",
      }}
    >
      {desktop && (
        <Box
          sx={{
            flex: 1,
            flexShrink: 0,
          }}
        >
          <img
            src={banner}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          ></img>
        </Box>
      )}

      <Box
        sx={{
          flex: 1,
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          gap: 8,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "transparent",
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "stretch",
          }}
        >
          <Box
            component="img"
            src={logo}
            sx={{ objectFit: "contain", width: "12rem", m: "auto" }}
            onClick={() => handleReturn()}
          />

          <Paper
            elevation={3}
            sx={
              desktop
                ? {
                    p: 8,
                    gap: 12,
                    flexShrink: 1,
                    my: "auto",
                    width: "24rem",
                    maxWidth: "24rem",
                  }
                : {
                    my: "auto",
                    p: 4,
                  }
            }
          >
            <Collapse orientation="vertical" in={validate !== ""}>
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
                {validate}
              </Paper>
            </Collapse>

            <Typography variant="h5" gutterBottom>
              Masuk
            </Typography>

            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 4 }}
            >
              <TextField
                label="Email"
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                required
                fullWidth
              />

              <TextField
                label="Password"
                name="password"
                type="password"
                value={values.password}
                onChange={handleChange}
                required
                fullWidth
              />

              <Button variant="contained" type="submit" size="large">
                Kirim
              </Button>
              <Button variant="outlined" onClick={() => navigate("/register")}>
                Daftar
              </Button>
            </Box>
          </Paper>
        </Box>
        <Footer
          sx={{
            flex: "none",
            background: "transparent",
            color: "common.white",
          }}
        />
      </Box>
    </Page>
  );
}
