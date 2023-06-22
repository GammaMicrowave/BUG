import { ManageAccountsOutlined } from "@mui/icons-material";
import { Avatar, Box, Divider, IconButton, Typography } from "@mui/material";
import React from "react";
// import { getFollowersList } from "@/API/user.api";
// import { useQuery } from "react-query";

function ListOfUsers({ heading, followersListQuery, followingListQuery }) {
  const userList =
    followersListQuery?.data?.followers || followingListQuery?.data?.following;

  
  return (
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
            className="flex justify-between items-center p-4"
            gap="0.5rem"
            pb="1.1rem"
            onClick={() => navigate(`/profile/${user.id}`)}
            sx={{
              "&:hover": {
                cursor: "pointer",
                bgcolor: "primary.light",
              },
            }}
          >
            <div className="flex justify-between items-center gap-[1rem]">
              <Avatar src={user.image} />
              <Box>
                <Typography variant="h4" color="neutral.dark" fontWeight="500">
                  {user.name}
                </Typography>
                <Typography color="neutral.main">
                  {user._count.followers} followers
                </Typography>
              </Box>
            </div>
            <IconButton>
              <ManageAccountsOutlined sx={{ color: "neutral.main" }} />
            </IconButton>
          </Box>
          <Divider />
        </>
      ))}
    </Box>
  );
}

export default ListOfUsers;
