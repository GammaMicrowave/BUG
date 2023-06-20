import { Box, Container } from "@mui/material";
import Profile from "@/components/home/Profile";
import UploadPost from "@/components/home/UploadPost";

import React from "react";

function home() {
  return (
    <>
      <Container maxWidth={false} className="flex flex-row flex-nowrap gap-4">
        <Box className=" justify-start lg:hidden md:flex hidden basis-2/5  flex-col flex-nowrap">
          <Box
            className="flex justify-center items-center p-4 rounded-md"
            sx={{ bgcolor: "background.alt" }}
          >
            <Profile />
          </Box>
          <Box className=" bg-blue-500">Right Side</Box>
        </Box>
        <Box
          className="hidden lg:flex basis-1/5 justify-center items-center p-4 rounded-md"
          sx={{ bgcolor: "background.alt" }}
        >
          <Profile />
        </Box>
        <Box className="flex-grow basis-3/5">
          <UploadPost />
        </Box>
        <Box className="hidden lg:flex basis-1/5 bg-blue-500 justify-center items-center">
          Right Side
        </Box>
      </Container>
    </>
  );
}

export default home;
