import { ManageAccountsOutlined } from "@mui/icons-material";
import { Avatar, Box, Divider, IconButton, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";

function Post() {
  const firstName = "John",
    lastName = "Doe",
    date = "2 days ago",
    body =
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    imageUrl =
      "https://img.freepik.com/free-photo/blossom-floral-bouquet-decoration-colorful-beautiful-flowers-background-garden-flowers-plant-pattern-wallpapers-greeting-cards-postcards-design-wedding-invites_90220-1103.jpg";

  return (
    <Box
      className="p-4 rounded-md flex flex-col flex-nowrap gap-2"
      sx={{ bgcolor: "background.alt" }}
    >
      <div
        className="flex justify-between items-center"
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <div className="flex justify-between items-center gap-[1rem]">
          <Avatar src={"https://mui.com/static/images/avatar/1.jpg"} />
          <Box>
            <Typography
              variant="h4"
              color="neutral.dark"
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: "neutral.light",
                  cursor: "pointer",
                },
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography color="neutral.main">{date}</Typography>
          </Box>
        </div>
        <ManageAccountsOutlined sx={{ color: "neutral.main" }} />
      </div>

      <Divider className="mb-2" />

      <Box className="flex flex-col gap-4">
        <Typography color="neutral.main">{body}</Typography>
        <img src={imageUrl} className="w-full aspect-auto rounded-md" />
      </Box>

      <Divider className="mt-2" />
      <Box className="flex justify-between items-center gap-4 px-2">
        <div className="flex gap-2">
          <IconButton>
            <FavoriteBorderIcon />
          </IconButton>
          <IconButton>
            <CommentIcon />
          </IconButton>
        </div>
        <IconButton>
          <ShareIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

export default Post;
