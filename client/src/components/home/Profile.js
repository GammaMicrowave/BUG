import {
  EditOutlined,
  LocationOnOutlined,
  ManageAccountsOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import {
  getSelfData,
  addNewProfileLink,
  deleteProfileLink,
  updateProfileLink,
} from "@/API/user.api";
import { useQuery, useQueryClient, useMutation } from "react-query";
import UpdateProfile from "./UpdateProfileForm";

import AddRoundedIcon from "@mui/icons-material/AddRounded";

function Profile({ selfDataQuery }) {
  const queryClient = useQueryClient();
  const [openModal, setOpenModal] = useState(false);
  const addProfileLinkMutation = useMutation(addNewProfileLink, {
    onSuccess: (data) => {
      const oldData = queryClient.getQueryData("selfData");
      queryClient.setQueryData("selfData", {
        ...oldData,
        otherProfiles: [...oldData.otherProfiles, data],
      });
    },
  });

  const deleteProfileLinkMutation = useMutation(deleteProfileLink, {
    onSuccess: () => {
      const oldData = queryClient.getQueryData("selfData");
      queryClient.setQueryData("selfData", {
        ...oldData,
        otherProfiles: oldData.otherProfiles.filter(
          (profile) => profile.id !== profileId
        ),
      });
    },
  });

  const updateProfileLinkMutation = useMutation(updateProfileLink, {
    onSuccess: () => {
      const oldData = queryClient.getQueryData("selfData");
      queryClient.setQueryData("selfData", {
        ...oldData,
        otherProfiles: oldData.otherProfiles.map((profile) =>
          profile.id === profileId ? { ...profile, ...newData } : profile
        ),
      });
    },
  });

  const user = selfDataQuery.data;
  return (
    <>
      <div className=" w-full">
        <div
          className="flex justify-between items-center"
          gap="0.5rem"
          pb="1.1rem"
        >
          <div className="flex justify-between items-center gap-[1rem]">
            <Avatar src={user.image} />
            <Box>
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
                onClick={() => navigate(`/profile/${user.id}`)}
              >
                {user.name}
              </Typography>
              <Typography color="neutral.main">
                {user._count.followers} followers
              </Typography>
            </Box>
          </div>
          <Tooltip title="Account Settings" placement="left">
            <IconButton>
              <ManageAccountsOutlined
                sx={{ color: "neutral.main" }}
                onClick={() => setOpenModal(true)}
              />
            </IconButton>
          </Tooltip>
        </div>
        <Box
          // p="0.5rem 1rem"
          className="flex flex-row flex-nowrap justify-between items-center px-2 mt-2"
        >
          <Typography
            variant="subtitle1"
            color="neutral.main"
            className="flex-grow"
          >
            {user.bio}
          </Typography>
        </Box>

        <Divider className="mt-2" />

        {/* NEW ROW */}

        <Divider />

        {/* SECOND ROW */}
        <Box p="1rem 0.5rem">
          <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
            <LocationOnOutlined
              fontSize="medium"
              sx={{ color: "neutral.main" }}
            />
            <Typography color="neutral.main">{user.location}</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap="1rem">
            <WorkOutlineOutlined
              fontSize="medium"
              sx={{ color: "neutral.main" }}
            />
            <Typography color="neutral.main">{user.occupation}</Typography>
          </Box>
        </Box>

        <Divider />

        {/* THIRD ROW */}
        <Box p="0.5rem 1rem">
          <div className="flex justify-between items-center">
            <Typography color="neutral.main">Profile Views</Typography>
            <Typography color="neutral.main" fontWeight="500">
              {user.viewedProfile}
            </Typography>
          </div>
        </Box>

        <Divider />

        {/* FOURTH ROW */}
        <Box>
          <Box className="flex flex-row flex-nowrap justify-between items-center py-2">
            <Typography
              // fontSize="1rem"
              color="neutral.main"
              fontWeight="500"
              className="ml-2"
              // mb="1rem"
            >
              Other Profiles
            </Typography>
            <Tooltip title="Add Profile" placement="left">
              <IconButton>
                <AddRoundedIcon sx={{ color: "neutral.main" }} />
              </IconButton>
            </Tooltip>
          </Box>

          {user.otherProfiles.map((profile) => (
            <Box
              key={profile.id}
              className="flex justify-between items-center gap-4 mb-2 p-2"
              sx={{
                "&:hover": {
                  cursor: "pointer",
                  borderRadius: "0.5rem",
                },
              }}
            >
              <div className="flex justify-between items-center">
                <Box>
                  <Typography
                    color="neutral.main"
                    sx={{
                      "&:hover": {
                        color: "neutral.dark",
                        cursor: "pointer",
                        textDecoration: "underline",
                      },
                    }}
                    onClick={() => {
                      window.open(profile.otherProfileLink, "_blank");
                    }}
                  >
                    {profile.otherProfileLink}
                  </Typography>
                </Box>
              </div>
              <Tooltip title="Edit Profile" placement="left">
                <IconButton>
                  <EditOutlined sx={{ color: "neutral.main" }} />
                </IconButton>
              </Tooltip>
            </Box>
          ))}
        </Box>
      </div>
      <UpdateProfile
        openModal={openModal}
        setOpenModal={setOpenModal}
        defaultName={user.name}
        defaultBio={user.bio}
        defaultLocation={user.location}
        defaultOccupation={user.occupation}
      />
    </>
  );
}

export default Profile;
