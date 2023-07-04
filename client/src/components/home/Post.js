import { ManageAccountsOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import moment from "moment";

function Post({ post, author }) {
  // const firstName = "John",
  //   lastName = "Doe",
  //   date = "2 days ago",
  //   body =
  //     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
  //   imageUrl =
  //     "https://img.freepik.com/free-photo/blossom-floral-bouquet-decoration-colorful-beautiful-flowers-background-garden-flowers-plant-pattern-wallpapers-greeting-cards-postcards-design-wedding-invites_90220-1103.jpg";

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
          <Avatar src={author.image} />
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
              {author.name}
            </Typography>
            <Typography color="neutral.main">
              {moment(post.createdAt).fromNow()}
            </Typography>
          </Box>
        </div>
        <Tooltip title="Follow" placement="left">
          <IconButton>
            <PersonAddAltRoundedIcon sx={{ color: "neutral.main" }} />
          </IconButton>
        </Tooltip>
      </div>

      <Divider className="mb-1" />
      <Box className="px-2">
        <Box className="flex flex-col">
          <Typography color="neutral.main">{post.content}</Typography>
          {post.image && (
            <div className="flex justify-center items-center">
              <div className=" my-2 h-[510px] w-fit ">
                <img src={post.image} className="h-full w-full rounded-md" />
              </div>
            </div>
          )}
        </Box>
      </Box>
      <Divider className="mt-1" />
      <Box className="flex justify-between items-center gap-4 px-2">
        <div className="flex gap-2">
          <Tooltip title="Like" placement="top">
            <IconButton>
              <FavoriteBorderIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Comment" placement="top">
            <IconButton>
              <CommentIcon />
            </IconButton>
          </Tooltip>
        </div>
        <Tooltip title="Share" placement="left">
          <IconButton>
            <ShareIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
}

export default Post;
