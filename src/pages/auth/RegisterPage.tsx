import banner from "/login_banner.png";
import logo from "/brand_1.png";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  useMediaQuery,
  Collapse,
  Input,
} from "@mui/material";
import Page from "../layout/Page";
import Footer from "../layout/Footer";
import { useNavigate } from "react-router";
import {
  registerService,
  type RegisterPayload,
} from "../../services/RegisterService";
import { useForm } from "../../hooks/useForm";

export default function RegisterPage() {
  const [success, setSuccess] = useState("");
  const { values, errors, handleChange, handleSubmit, isSubmitting } =
    useForm<RegisterPayload>({
      initialValues: {
        username: "",
        first_name: "",
        last_name: "",
        address: "",
        birth_of_date: "",
        email: "",
        password: "",
        phone: "",
        email_alt: "",
        home_address: "",
        ktp: null,
        nik: "",
        profile: null,
        verification_key: "69420",
      },
      validate: (values) => {
        const errs: typeof errors = {};

        if (!values.email) errs.email = "Email wajib diisi";
        else if (!/\S+@\S+\.\S+/.test(values.email))
          errs.email = "Invalid email";
        if (values.password.length < 8)
          errs.password = "Password harus lebih dari 8 karakter";
        if (values.nik?.length! < 12) errs.nik = "NIK harus berjumlah 12";

        if (!values.email_alt) errs.email_alt = "Anda harus punya alternatif";
        else if (!/\S+@\S+\.\S+/.test(values.email_alt))
          errs.email_alt = "Invalid email";
        if (values.username.length > 24)
          errs.username = "Username tidak bisa lebih dari 24 karakter";
        if (values.username.length < 3)
          errs.username = "Username harus lebih dari 3 karakter";
        if (!/^[a-zA-Z][a-zA-Z0-9_-]{2,31}$/.test(values.username))
          errs.username =
            "Tidak boleh: spasi, simbol, non-karakter pada huruf pertama";
        if (values.phone.length < 10) errs.phone = "Minimal 10 angka";

        return errs;
      },
      onSubmit: async (values) => {
        console.log(values);
        try {
          await registerService(values);
          setSuccess("You have created new account");
        } catch (error) {
          setValidate(error?.message);
          console.error(error.message);
        }
      },
    });

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [validate, setValidate] = useState("");
  const ktpInputRef = useRef<HTMLInputElement | null>(null);
  const profileInputRef = useRef<HTMLInputElement | null>(null);

  const desktop = useMediaQuery("(min-width:767px)");

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated]);

  const handleReturn = () => {
    navigate("/");
  };

  if (success)
    return (
      <Page
        fullscreen
        sx={{
          height: "100vh",
          overflowX: "hidden",
          backgroundColor: "primary.main",
        }}
      >
        {success}
        <Button onClick={navigate("/login")}>Masuk sekarang</Button>
      </Page>
    );

  return (
    <Box component="form" onSubmit={handleSubmit} autoComplete="off" noValidate>
      <Page
        footer={false}
        fullscreen
        sx={{
          display: "flex",
          flexDirection: desktop ? "row" : "column",
          gap: desktop ? 0 : 8,
          height: "100vh",
          overflowX: "hidden",
          backgroundColor: "primary.main",
        }}
      >
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
                      maxHeight: "50vh",
                      overflowY: "scroll",
                    }
                  : {
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
                }}
                onClick={() => handleReturn()}
              />

              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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
                  Daftar
                </Typography>

                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  required
                  fullWidth
                />
                {errors.email && (
                  <Typography color="error.main">{errors.email}</Typography>
                )}

                <TextField
                  label="Password"
                  name="password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  required
                  fullWidth
                />
                {errors.password && (
                  <Typography color="error.main">{errors.password}</Typography>
                )}

                <Collapse
                  orientation="vertical"
                  in={
                    !errors.email &&
                    !errors.password &&
                    values.email !== "" &&
                    values.password !== ""
                  }
                >
                  <TextField
                    label="Username"
                    name="username"
                    type="text"
                    value={values.username}
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                  {errors.username && (
                    <Typography color="error.main">
                      {errors.username}
                    </Typography>
                  )}
                </Collapse>

                <Collapse
                  orientation="vertical"
                  in={!errors.username && values.username != ""}
                >
                  <TextField
                    label="First Name"
                    name="first_name"
                    type="text"
                    value={values.first_name}
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                  {errors.first_name && (
                    <Typography color="error.main">
                      {errors.first_name}
                    </Typography>
                  )}
                  <TextField
                    label="Last Name"
                    name="last_name"
                    type="text"
                    value={values.last_name}
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                  {errors.last_name && (
                    <Typography color="error.main">
                      {errors.last_name}
                    </Typography>
                  )}
                </Collapse>

                <Collapse
                  orientation="vertical"
                  in={
                    !errors.first_name &&
                    values.first_name != "" &&
                    !errors.last_name &&
                    values.last_name != ""
                  }
                >
                  <TextField
                    label="Address"
                    name="address"
                    type="text"
                    value={values.address}
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                  {errors.address && (
                    <Typography color="error.main">{errors.address}</Typography>
                  )}

                  <TextField
                    label="Alternative Email Adress"
                    name="email_alt"
                    type="email"
                    value={values.email_alt}
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                  {errors.email_alt && (
                    <Typography color="error.main">
                      {errors.email_alt}
                    </Typography>
                  )}

                  <TextField
                    label="Phone Number"
                    placeholder="+62"
                    name="phone"
                    type="text"
                    value={values.phone}
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                  {errors.phone && (
                    <Typography color="error.main">{errors.phone}</Typography>
                  )}
                </Collapse>

                <Collapse
                  orientation="vertical"
                  in={
                    !errors.phone &&
                    values.phone != "" &&
                    !errors.address &&
                    values.address != "" &&
                    !errors.email_alt &&
                    values.email_alt != ""
                  }
                ></Collapse>

                <Button variant="outlined" onClick={() => navigate("/login")}>
                  Saya sudah punya akun
                </Button>
              </Box>
            </Paper>
          </Box>
          <Footer
            sx={{
              display: values.phone != "" && !errors.phone ? "none" : "block",
              flex: "none",
              background: "transparent",
              color: "common.white",
            }}
          />
        </Box>

        <Box
          sx={{
            flex: 1,
            flexShrink: 0,
            display: desktop
              ? "flex"
              : values.phone !== "" && !errors.phone
                ? "flex"
                : "none",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {(values.phone == "" || errors.phone) && (
            <img
              src={banner}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            ></img>
          )}

          {values.phone != "" && !errors.phone && (
            <Paper
              elevation={3}
              sx={
                desktop
                  ? {
                      display: "flex",
                      flexDirection: "column",
                      p: 8,
                      gap: 2,
                      flexShrink: 1,
                      my: "auto",
                      width: "24rem",
                      maxWidth: "24rem",
                      maxHeight: "50vh",
                      overflowY: "scroll",
                    }
                  : {
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                      flexShrink: 1,
                      my: "auto",
                      p: 4,
                      maxHeight: "50vh",
                      overflowY: "scroll",
                    }
              }
            >
              <TextField
                label="Tanggal kelahiran"
                name="birth_of_date"
                type="date"
                value={values.birth_of_date}
                onChange={handleChange}
                required
                fullWidth
              />
              {errors.birth_of_date && (
                <Typography color="error.main">
                  {errors.birth_of_date}
                </Typography>
              )}

              <TextField
                label="Nomor Induk Kependudukan"
                name="nik"
                type="text"
                value={values.nik}
                onChange={handleChange}
                required
                fullWidth
              />
              {errors.nik && (
                <Typography color="error.main">{errors.nik}</Typography>
              )}
              <TextField
                label="Alamat Tempat Tinggal"
                name="home_address"
                type="text"
                value={values.home_address}
                onChange={handleChange}
                required
                fullWidth
              />
              {errors.home_address && (
                <Typography color="error.main">
                  {errors.home_address}
                </Typography>
              )}

              <Typography>Unggah Foto KTP Anda</Typography>
              <Box
                sx={{
                  border: "2px dashed #aaa",
                  padding: 4,
                  textAlign: "center",
                  cursor: "pointer",
                }}
                onClick={() => ktpInputRef.current?.click()}
              >
                <Typography>Click or drag a file here</Typography>
                <input
                  type="file"
                  hidden
                  name="ktp"
                  ref={ktpInputRef}
                  onChange={handleChange}
                />
              </Box>

              <Typography>Unggah Foto Profil Anda</Typography>
              <Box
                sx={{
                  border: "2px dashed #aaa",
                  padding: 4,
                  textAlign: "center",
                  cursor: "pointer",
                }}
                onClick={() => profileInputRef.current?.click()}
              >
                <Typography>Click or drag a file here</Typography>
                <input
                  type="file"
                  name="profile"
                  hidden
                  ref={profileInputRef}
                  onChange={handleChange}
                />
              </Box>

              <Button variant="contained" type="submit" size="large">
                Daftar Sekarang
              </Button>
            </Paper>
          )}
        </Box>
      </Page>
    </Box>
  );
}
