import { Avatar, Box, Typography } from "@mui/material";
import React from "react";

function RightMessage({ avatar, message }) {
  return (
    <div class="col-start-6 col-end-13 p-3 rounded-lg">
      <div class="flex items-center justify-start flex-row-reverse">
        <Avatar src={avatar}></Avatar>
        <Box
          sx={{
            backgroundColor: "primary.light",
          }}
          className="relative mr-3 text-sm  py-2 px-4 shadow rounded-xl"
        >
          <Typography color={"neutral.main"}>{message}</Typography>
        </Box>
      </div>
    </div>
  );
}

export default RightMessage;
