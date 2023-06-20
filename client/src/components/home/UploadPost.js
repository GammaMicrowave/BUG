import { Box, Icon, IconButton, TextField, Typography } from "@mui/material";
import React from "react";
import FileUpload from "../FileUpload";
import { useState } from "react";
import SendIcon from "@mui/icons-material/Send";

function UploadPost() {
  const [files, setFiles] = useState([]);
  return (
    <>
      <Box
        className="p-4 rounded-md flex flex-col flex-nowrap gap-2"
        sx={{ bgcolor: "background.alt" }}
      >
        {/* <Typography variant="h3" color="neutral.main">
          Create a new Post
        </Typography> */}
        <Box className="flex flex-row flex-nowrap">
          <TextField
            id="outlined-basic"
            // label="Outlined"
            variant="outlined"
            placeholder="What do you want to talk about?"
            className="flex-grow"
          />
          <IconButton
            aria-label="send"
            sx={{
              bgcolor: "primary.main",
              // color: "primary.contrastText",
              "&:hover": {
                bgcolor: "primary.light",
              },
            }}
            className="rounded-full h-12 w-12 mx-2"
          >
            <SendIcon />
          </IconButton>
        </Box>
        <div>
          <FileUpload
            files={files}
            setFiles={setFiles}
            helperText={"Upload an image"}
          />
        </div>
      </Box>
    </>
  );
}

export default UploadPost;
