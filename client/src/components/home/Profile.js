import {
  EditOutlined,
  LocationOnOutlined,
  ManageAccountsOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import { Avatar, Box, Divider, Typography } from "@mui/material";
import React from "react";

function Profile() {
  const firstName = "John",
    lastName = "Doe",
    location = "Nigeria",
    occupation = "Software Engineer",
    viewedProfile = "0",
    impressions = "0",
    followers = [];

  return (
    <div className=" w-full">
      {/* FIRST ROW */}
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
            <Typography color="neutral.main">
              {followers.length} followers
            </Typography>
          </Box>
        </div>
        <ManageAccountsOutlined sx={{ color: "neutral.main" }} />
      </div>

      <Divider />

      {/* SECOND ROW */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="large" sx={{ color: "neutral.main" }} />
          <Typography color="neutral.main">{location}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <WorkOutlineOutlined
            fontSize="large"
            sx={{ color: "neutral.main" }}
          />
          <Typography color="neutral.main">{occupation}</Typography>
        </Box>
      </Box>

      <Divider />

      {/* THIRD ROW */}
      <Box p="1rem 0">
        <div className="flex justify-between items-center mb-2">
          <Typography color="neutral.main">
            Who's viewed your profile
          </Typography>
          <Typography color="neutral.main" fontWeight="500">
            {viewedProfile}
          </Typography>
        </div>
        <div className="flex justify-between items-center">
          <Typography color="neutral.main">Impressions of your post</Typography>
          <Typography color="neutral.main" fontWeight="500">
            {impressions}
          </Typography>
        </div>
      </Box>

      <Divider />

      {/* FOURTH ROW */}
      <Box p="1rem 0">
        <Typography
          fontSize="1rem"
          color="neutral.main"
          fontWeight="500"
          mb="1rem"
        >
          Social Profiles
        </Typography>

        <div className="flex justify-between items-center gap-4 mb-2">
          <div className="flex justify-between items-center" gap="1rem">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/512px-Logo_of_Twitter.svg.png?20220821125553"
              alt="twitter"
              className="w-8 h-6 aspect-auto mx-2"
            />
            <Box>
              <Typography color="neutral.main" fontWeight="500">
                Twitter
              </Typography>
              <Typography color="neutral.main">Social Network</Typography>
            </Box>
          </div>
          <EditOutlined sx={{ color: "neutral.main" }} />
        </div>

        <div className="flex justify-between items-center gap-4">
          <div className="flex justify-between items-center gap-4">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/800px-LinkedIn_logo_initials.png"
              alt="linkedin"
              className="w-8 h-8 aspect-auto mx-2"
            />
            <Box>
              <Typography color="neutral.main" fontWeight="500">
                Linkedin
              </Typography>
              <Typography color="neutral.main">Network Platform</Typography>
            </Box>
          </div>
          <EditOutlined sx={{ color: "neutral.main" }} />
        </div>
      </Box>
    </div>
  );
}

export default Profile;
