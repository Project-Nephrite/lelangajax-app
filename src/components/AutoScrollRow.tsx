// components/ui/AutoScrollRow.tsx
import { Box } from "@mui/material";
import { type ReactNode, useRef, useEffect } from "react";

type AutoScrollRowProps = {
  children: ReactNode;
  speed?: number; // pixels per second
};

export default function AutoScrollRow({
  children,
  speed = 50,
}: AutoScrollRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let start = performance.now();

    const step = (now: number) => {
      const elapsed = now - start;
      const distance = (elapsed / 1000) * speed;
      el.scrollLeft = distance;

      if (el.scrollLeft >= el.scrollWidth - el.clientWidth) {
        start = now;
        el.scrollLeft = 0;
      }

      requestAnimationFrame(step);
    };

    const frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [speed]);

  return (
    <Box
      ref={scrollRef}
      sx={{
        overflowX: "auto",
        whiteSpace: "nowrap",
        display: "flex",
        gap: 4,
        py: 2,
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": { display: "none" },
      }}
    >
      {children}
    </Box>
  );
}
