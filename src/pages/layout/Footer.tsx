import { Box, type CSSProperties } from "@mui/material";

interface FooterProps {
  sx?: CSSProperties;
}
export default function Footer({ sx }: FooterProps) {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "grey.200",
        py: 3,
        textAlign: "center",
        typography: "body2",
        width: "100%",
        ...sx,
      }}
    >
      &copy; {new Date().getFullYear()} LelangAjax. All rights reserved.
    </Box>
  );
}
