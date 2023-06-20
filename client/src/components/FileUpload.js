import React, { useState, useEffect, useMemo } from "react";
import { useDropzone } from "react-dropzone";

import {
  Paper,
  Typography,
  ImageList,
  ImageListItem,
  Button,
  IconButton,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CancelIcon from "@mui/icons-material/Cancel";

export default function FileUpload({ files, setFiles, helperText }) {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/jpg": [],
      "image/webp": [],
      "image/gif": [],
    },
    onDrop: (acceptedFiles) => {
      setFiles([]);
      acceptedFiles.map((file, index) => {
        const reader = new FileReader();
        reader.onload = function (e) {
          setFiles((prevState) => [
            ...prevState,
            { id: index, src: e.target.result },
          ]);
        };
        reader.readAsDataURL(file);
        return file;
      });
    },
    multiple: false,
  });
  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);
  return (
    <Paper
      elevation={2}
      className="w-full h-full rounded-lg cursor-pointer hover:opacity-90 hover:outline outline-1 overflow-hidden"
      style={{
        outlineColor: "secondary.main",
      }}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <div className=" w-full h-full flex flex-col gap-4 justify-center items-center">
        {files.length === 0 ? (
          <>
            <Button
              variant="outlined"
              className="w-full h-full flex flex-col gap-0 justify-center items-center"
              startIcon={<AddRoundedIcon className="w-8 h-8" />}
            >
              <Typography variant="body2" className="text-center capitalize">
                {helperText}
              </Typography>
            </Button>
          </>
        ) : (
          <>
            <ImageList sx={{ width: "100%", height: "100%" }} cols={1}>
              {files.map((item) => (
                <ImageListItem key={item.src}>
                  <div className="relative">
                    <IconButton
                      className="absolute right-2 top-2"
                      onClick={(event) => {
                        event.stopPropagation();
                        setFiles([]);
                      }}
                    >
                      <CancelIcon />
                    </IconButton>
                    <img
                      src={`${item.src}`}
                      srcSet={`${item.src}`}
                      alt={item.id}
                      loading="lazy"
                    />
                  </div>
                </ImageListItem>
              ))}
            </ImageList>
          </>
        )}
      </div>
    </Paper>
  );
}
