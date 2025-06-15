// components/layout/Page.tsx
import { ReactNode } from "react";
import { Box, Container, useTheme, useMediaQuery } from "@mui/material";

type PageProps = {
  children: ReactNode;
  maxWidth?: false | "xs" | "sm" | "md" | "lg" | "xl";
  paddingY?: number | { xs?: number; sm?: number; md?: number; lg?: number };
  backgroundColor?: string;
};

export default function Page({
  children,
  maxWidth = "lg",
  paddingY = { xs: 2, sm: 4, md: 6 },
  backgroundColor = "background.default",
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
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor,
        py: resolvedPaddingY,
      }}
    >
      <Container maxWidth={maxWidth}>{children}</Container>
    </Box>
  );
}
