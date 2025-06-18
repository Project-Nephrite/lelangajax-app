import { Box, IconButton, useTheme } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { useRef } from "react";

type CarouselProps = {
  children: React.ReactNode;
  itemWidth?: number; // in px
  gap?: number; // in px
};

export default function Carousel({
  children,
  itemWidth = 300,
  gap = 16,
}: CarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const scrollAmount = itemWidth + gap;
      containerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <Box position="relative" width="100%">
      <IconButton
        onClick={() => scroll("left")}
        sx={{
          position: "absolute",
          top: "50%",
          left: 0,
          zIndex: 1,
          transform: "translateY(-50%)",
          bgcolor: "background.paper",
          boxShadow: 1,
        }}
      >
        <ArrowBackIos fontSize="small" />
      </IconButton>

      <Box
        ref={containerRef}
        sx={{
          display: "flex",
          overflowX: "auto",
          scrollBehavior: "smooth",
          gap: `${gap}px`,
          paddingX: 4,
          scrollSnapType: "x mandatory",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {Array.isArray(children)
          ? children.map((child, idx) => (
              <Box
                key={idx}
                sx={{
                  flex: `0 0 ${itemWidth}px`,
                  scrollSnapAlign: "start",
                }}
              >
                {child}
              </Box>
            ))
          : children}
      </Box>

      <IconButton
        onClick={() => scroll("right")}
        sx={{
          position: "absolute",
          top: "50%",
          right: 0,
          zIndex: 1,
          transform: "translateY(-50%)",
          bgcolor: "background.paper",
          boxShadow: 1,
        }}
      >
        <ArrowForwardIos fontSize="small" />
      </IconButton>
    </Box>
  );
}
