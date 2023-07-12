import { ManageAccountsOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import ConfirmDialog from "@/components/home/ConfirmDialog";
import { useState } from "react";
import cookieCutter, { set } from "cookie-cutter";
import { useMutation, useQueryClient } from "react-query";
import { removeFollower, removeFollowing } from "@/API/follow.api";
import Link from "next/link";

function ListOfUsers({ heading, followersListQuery, followingListQuery }) {
  const queryClient = useQueryClient();
  const userList =
    followersListQuery?.data?.followers || followingListQuery?.data?.following;

  //Dialog buisness logic

  const [openDialog, setOpenDialog] = useState(false);

  const [queryArguments, setQueryArguments] = useState({
    id: "",
    token: "",
  });

  useEffect(() => {
    const token = cookieCutter.get("jwt_token");
    setQueryArguments((prev) => ({ ...prev, token }));
  }, []);

  const removeFollowerMutation = useMutation(removeFollower, {
    onSuccess: (data) => {
      const prevData = queryClient.getQueryData(["followersList"]);
      const newfollowers = prevData.followers.filter(
        (follower) => follower.id !== data.id
      );
      queryClient.setQueryData(["followersList"], { followers: newfollowers });
    },
  });

  const removeFollowingMutation = useMutation(removeFollowing, {
    onSuccess: (data) => {
      const prevData = queryClient.getQueryData(["followingList"]);
      const newfollowing = prevData.following.filter(
        (following) => following.id !== data.id
      );
      queryClient.setQueryData(["followingList"], { following: newfollowing });
    },
  });

  const dialogOnAgree = () => {
    if (heading === "Followers") {
      removeFollowerMutation.mutate(queryArguments);
    } else {
      removeFollowingMutation.mutate(queryArguments);
    }
    setOpenDialog(false);
  };

  const handleClick = (id) => {
    setQueryArguments((prev) => ({ ...prev, id }));
    setOpenDialog(true);
  };

  return (
    <>
      <Box
        className="w-full rounded-md py-4"
        sx={{
          bgcolor: "background.alt",
        }}
      >
        <Typography
          variant="h4"
          color="neutral.main"
          fontWeight="700"
          className="mb-4 px-4"
        >
          {heading}
        </Typography>

        {userList.map((user, index) => (
          <>
            <Box
              // key={user.id}
              className="flex justify-between items-center p-4"
              gap="0.5rem"
              pb="1.1rem"
              // onClick={() => navigate(`/profile/${user.id}`)}
              sx={{
                "&:hover": {
                  cursor: "pointer",
                  bgcolor: "primary.light",
                },
              }}
            >
              <Link href={`/profile/${user.id}`} key={user.id}>
                <div className="flex justify-between items-center gap-[1rem]">
                  <Avatar src={user.image} />
                  <Box>
                    <Typography
                      variant="h4"
                      color="neutral.dark"
                      fontWeight="500"
                    >
                      {user.name}
                    </Typography>
                    <Typography color="neutral.main">
                      {user._count.followers} followers
                    </Typography>
                  </Box>
                </div>
              </Link>
              <Tooltip title="Remove" placement="left">
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClick(user.id);
                  }}
                >
                  <ClearRoundedIcon sx={{ color: "neutral.main" }} />
                </IconButton>
              </Tooltip>
            </Box>
            <Divider />
          </>
        ))}
      </Box>
      <ConfirmDialog
        open={openDialog}
        setOpen={setOpenDialog}
        title={heading}
        body={`Are you sure you want to remove this user?`}
        onAgree={dialogOnAgree}
        onDisagree={() => setOpenDialog(false)}
      />
    </>
  );
}

export default ListOfUsers;
