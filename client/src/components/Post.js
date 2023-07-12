import { ManageAccountsOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  CircularProgress,
  Divider,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import PersonRemoveRoundedIcon from "@mui/icons-material/PersonRemoveRounded";
import moment from "moment";
import { useMutation, useQueryClient } from "react-query";
import { addFollowing, removeFollowing } from "@/API/follow.api";
import cookieCutter, { set } from "cookie-cutter";
import { enqueueSnackbar } from "notistack";
import Link from "next/link";

function Post({ post, author }) {
  // console.log(post);
  const [token, setToken] = useState("");
  const [disableButton, setDisableButton] = useState(false);
  const queryClient = useQueryClient();
  useEffect(() => {
    setToken((prev) => cookieCutter.get("jwt_token"));
  }, []);

  const addFollowMutation = useMutation(addFollowing, {
    onSuccess: (data) => {
      const prevData = queryClient.getQueryData(["followingList"]);
      const newData = {
        following: [...prevData.following, data],
      };
      queryClient.setQueryData(["followingList"], newData);

      let prevData2 = queryClient.getQueryData(["posts"]);
      prevData2.map((post) => {
        if (post.author.id === data.id) {
          post.author.followers.push(data.followers[0]);
        }
      });

      queryClient.setQueryData(["posts"], prevData2);
      setDisableButton(false);
    },
    onError: (err) => {
      enqueueSnackbar(err.data.error, {
        variant: "error",
      });
      setDisableButton(false);
    },
  });
  const removeFollowMutation = useMutation(removeFollowing, {
    onSuccess: (data) => {
      const prevData = queryClient.getQueryData(["followingList"]);
      const newData = {
        following: prevData.following.filter((item) => item.id !== data.id),
      };
      queryClient.setQueryData(["followingList"], newData);

      let prevData2 = queryClient.getQueryData(["posts"]);
      prevData2.map((post) => {
        if (post.author.id === data.id) {
          post.author.followers.pop();
        }
      });

      queryClient.setQueryData(["posts"], prevData2);
      setDisableButton(false);
    },
    onError: (err) => {
      enqueueSnackbar(err.data.error, {
        variant: "error",
      });
      setDisableButton(false);
    },
  });

  const handleFollow = () => {
    setDisableButton(true);
    if (author?.followers?.length > 0) {
      console.log("remove");
      removeFollowMutation.mutate({ token, id: author.id });
    } else {
      addFollowMutation.mutate({ token, id: author.id });
    }
  };

  return (
    <Box
      className="p-4 rounded-md flex flex-col flex-nowrap gap-2"
      sx={{ bgcolor: "background.alt" }}
    >
      <div
        className="flex justify-between items-center"
        gap="0.5rem"
        pb="1.1rem"
      >
        <div className="flex justify-between items-center gap-[1rem]">
          <Avatar src={author.image} />
          <Box>
            <Link href={`/profile/${author.id}`}>
              <Typography
                variant="h4"
                color="neutral.dark"
                fontWeight="500"
                sx={{
                  "&:hover": {
                    color: "primary.main",
                    cursor: "pointer",
                  },
                }}
                // onClick={() => navigate(`/profile/${author.id}`)}
              >
                {author.name}
              </Typography>
            </Link>
            <Typography color="neutral.main">
              {moment(post.createdAt).fromNow()}
            </Typography>
          </Box>
        </div>
        {post?.isMine ? null : (
          // <Tooltip
          //   title="Follow"
          //   placement="left"
          // >
          <IconButton onClick={handleFollow} disabled={disableButton}>
            {disableButton ? (
              <CircularProgress size={18} />
            ) : author.followers.length > 0 ? (
              <PersonRemoveRoundedIcon sx={{ color: "neutral.main" }} />
            ) : (
              <PersonAddAltRoundedIcon sx={{ color: "neutral.main" }} />
            )}
          </IconButton>
          // </Tooltip>
        )}
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
