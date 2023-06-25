import { Avatar, Box, Typography } from "@mui/material";
import React from "react";

function LeftMessage({ avatar, message }) {
  return (
    <div class="col-start-1 col-end-8 p-3 rounded-lg">
      <div class="flex flex-row items-center">
        <Avatar src={avatar}></Avatar>
        <Box
          sx={{
            backgroundColor: "primary.light",
          }}
          className="relative ml-3 text-sm  py-2 px-4 shadow rounded-xl"
        >
          <Typography color={"neutral.main"}>{message}</Typography>
        </Box>
      </div>
    </div>
  );
}

export default LeftMessage;
