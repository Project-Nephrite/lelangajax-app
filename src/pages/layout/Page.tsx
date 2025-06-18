// components/layout/Page.tsx
import { ReactNode } from "react";
import {
  Box,
  Container,
  useTheme,
  useMediaQuery,
  type CSSProperties,
} from "@mui/material";
import Footer from "./Footer";

type PageProps = {
  children: ReactNode;
  maxWidth?: false | "xs" | "sm" | "md" | "lg" | "xl";
  paddingY?: number | { xs?: number; sm?: number; md?: number; lg?: number };
  backgroundColor?: string;
  sx?: CSSProperties;
  fullscreen?: boolean;
  footer?: boolean;
};

export default function Page({
  children,
  fullscreen,
  footer,
  maxWidth = fullscreen ? false : "lg",
  paddingY = { xs: 2, sm: 4, md: 6 },
  backgroundColor = "none",
  sx,
}: PageProps) {
  const theme = useTheme();
  const upSm = useMediaQuery(theme.breakpoints.up("sm"));
  const upMd = useMediaQuery(theme.breakpoints.up("md"));

  const resolvedPaddingY =
    typeof paddingY === "number"
      ? paddingY
      : upMd
        ? (paddingY.md ?? paddingY.sm ?? paddingY.xs ?? 0)
        : upSm
          ? (paddingY.sm ?? paddingY.xs ?? 0)
          : (paddingY.xs ?? 0);

  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor,
          py: fullscreen ? 0 : resolvedPaddingY,
        }}
      >
        <Container sx={sx} maxWidth={maxWidth} disableGutters={fullscreen}>
          {children}
        </Container>
      </Box>
      {footer && <Footer></Footer>}
    </>
  );
}
