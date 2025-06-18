import {
  Alert,
  Avatar,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  ListItemIcon,
  MenuItem,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import ListingFileUpload from "./ListingFileUpload";
import { useForm } from "../../hooks/useForm";
import type { IListingCreate } from "../../interfaces/IListing";
import useFetchCategories from "../../hooks/useFetchCategories";
import ListingService from "../../services/ListingService";
import ValidationError from "../../types/ValidationError";
import { useState } from "react";

export default function MyListing_Create() {
  const category = useFetchCategories();
  const [errorResp, setErrorResp] = useState("");
  const [success, setSuccess] = useState("");

  const {
    values,
    resetForm,
    isSubmitting,
    handleSubmit,
    handleChange,
    handleBlur,
    errors,
  } = useForm<IListingCreate>({
    initialValues: {
      name: "",
      description: "",
      value_base: 5000,
      category_id: "",
      schema_id: "1",
      images: [],
    },
    validate: (values) => {
      const errs: typeof errors = {};

      if (values.name.length < 3 || values.name.length > 64)
        errs.name = "Nama barang harus memiliki 3 sampai 64 karakter";
      if (values.description.length < 32)
        errs.description = "Deskripsi harus setidaknya terdapat 4 kalimat";
      if (values.category_id == "")
        errs.category_id = "Harus terdapat pada kategori";
      if (values.schema_id == "")
        errs.schema_id = "Harus memiliki jenis skema lelang";
      return errs;
    },
    onSubmit: async (values) => {
      try {
        await ListingService.create(values);
        setSuccess("Listing anda telah tersebar");
      } catch (error) {
        if (error instanceof ValidationError) setErrorResp(error.message);
        console.error(error);
      }
    },
  });

  return (
    <>
      <Snackbar open={errorResp != ""} autoHideDuration={5000}>
        <Alert severity="error" variant="filled" sx={{ width: "100%" }}>
          {errorResp}
        </Alert>
      </Snackbar>

      <Snackbar open={success != ""} autoHideDuration={5000}>
        <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
          {success}
        </Alert>
      </Snackbar>
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={isSubmitting}
      >
        <CircularProgress color="inherit"></CircularProgress>
      </Backdrop>
      <Container>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          autocomplete="off"
          sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}
        >
          <Box>
            <TextField
              error={errors.name}
              label="Nama barang"
              name="name"
              type="text"
              value={values.name}
              onChange={handleChange}
              required
              fullWidth
              helperText={errors.name}
            />
          </Box>

          <Box>
            <TextField
              error={errors.description}
              label="Deskripsi"
              name="description"
              type="text"
              value={values.description}
              onChange={handleChange}
              required
              fullWidth
              helperText={errors.description}
            />
          </Box>

          <TextField
            error={errors.value_base}
            label="Harga dasar"
            name="value_base"
            type="number"
            value={values.value_base}
            onChange={handleChange}
            required
            fullWidth
            helperText={errors.value_base}
          />

          <TextField
            error={errors.category_id}
            label="Kategori"
            name="category_id"
            select
            value={values.category_id}
            onChange={handleChange}
            required
            fullWidth
            helperText={errors.category_id}
          >
            {category.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                <ListItemIcon>
                  <Avatar src={option.image_url} />
                </ListItemIcon>
                {option.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            error={errors.schema_id}
            label="Skema lelang"
            name="schema_id"
            select
            value={values.schema_id}
            onChange={handleChange}
            required
            fullWidth
            helperText={errors.schema_id}
          >
            <MenuItem value={"1"}>Vickery Auction</MenuItem>
          </TextField>

          <ListingFileUpload
            label="Unggah foto-foto barang anda"
            name="images"
            handleChanges={handleChange}
          />

          <Button variant="contained" type="submit">
            Daftarkan Listing Baru
          </Button>
        </Box>
      </Container>
    </>
  );
}
