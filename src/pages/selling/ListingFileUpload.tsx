import {
  Button,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Avatar,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";

interface Props {
  label: string;
  handleChanges: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
}

interface PreviewFile {
  file: File;
  url: string | null;
}

export default function ListingFileUpload({
  label,
  handleChanges,
  name,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState<PreviewFile[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []);
    const previews = newFiles.map((file) => ({
      file,
      url: file.type.startsWith("image/") ? URL.createObjectURL(file) : null,
    }));
    setFiles((prev) => [...prev, ...previews]);

    handleChanges?.(e);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    return () => {
      files.forEach((f) => f.url && URL.revokeObjectURL(f.url));
    };
  }, [files]);

  return (
    <Box>
      <Typography>{label}</Typography>
      <Box
        sx={{
          border: "2px dashed #aaa",
          padding: 4,
          textAlign: "center",
          cursor: "pointer",
          display: "flex",
          flexDirection: "row",
          gap: 2,
        }}
        onClick={() => fileInputRef.current?.click()}
      >
        {files.length <= 0 && (
          <Typography>Click to pick a file here</Typography>
        )}

        {files.map((f, index) => (
          <Avatar
            variant="rounded"
            src={f.url!}
            sx={{ borderRadius: 4, width: 72, height: 72, objectFit: "cover" }}
          />
        ))}

        <input
          type="file"
          name={name}
          multiple
          hidden
          ref={fileInputRef}
          onChange={handleChange}
        />
      </Box>
    </Box>
  );
}
