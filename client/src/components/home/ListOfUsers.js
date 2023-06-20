import { ManageAccountsOutlined } from "@mui/icons-material";
import { Avatar, Box, Divider, Typography } from "@mui/material";
import React from "react";

function ListOfUsers({ heading }) {
  const userList = [
    {
      firstName: "John",
      lastName: "Doe",
      followers: [],
    },
    {
      firstName: "John",
      lastName: "Doe",
      followers: [],
    },
    {
      firstName: "John",
      lastName: "Doe",
      followers: [],
    },
  ];

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
            onClick={() => navigate(`/profile/${userId}`)}
            sx={{
              "&:hover": {
                cursor: "pointer",
                bgcolor: "primary.light",
              },
            }}
          >
            <div className="flex justify-between items-center gap-[1rem]">
              <Avatar src={"https://mui.com/static/images/avatar/1.jpg"} />
              <Box>
                <Typography variant="h4" color="neutral.dark" fontWeight="500">
                  {user.firstName} {user.lastName}
                </Typography>
                <Typography color="neutral.main">
                  {user.followers.length} followers
                </Typography>
              </Box>
            </div>
            <ManageAccountsOutlined sx={{ color: "neutral.main" }} />
          </Box>
          <Divider />
        </>
      ))}
    </Box>
  );
}

export default ListOfUsers;
