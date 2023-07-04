import { Box, Icon, IconButton, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import FileUpload from "../FileUpload";
import { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { useMutation, useQueryClient } from "react-query";
import { addPost } from "@/API/post.api";
import cookieCutter, { set } from "cookie-cutter";
import { enqueueSnackbar } from "notistack";

function UploadPost() {
  const [files, setFiles] = useState([]);

  const [content, setContent] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    setToken(cookieCutter.get("jwt_token"));
  }, []);

  const queryClient = useQueryClient();

  const createPostMutation = useMutation(addPost, {
    onSuccess: (data) => {
      const prevData = queryClient.getQueryData(["posts"]);
      const newPosts = [data, ...prevData];
      queryClient.setQueryData(["posts"], newPosts);
      setContent("");
      setFiles([]);
    },
  });

  const handleNewPost = () => {
    if (content == "" && files.length == 0) {
      enqueueSnackbar("Please enter some content or upload an image", {
        variant: "error",
      });
      return;
    }
    createPostMutation.mutate({ content, image: files, token });
  };

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
            value={content}
            onChange={(e) => setContent(e.target.value)}
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
            onClick={handleNewPost}
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
