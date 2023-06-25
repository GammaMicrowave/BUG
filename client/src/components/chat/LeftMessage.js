import { Avatar, Box, Typography } from "@mui/material";
import React from "react";
import moment from "moment";

function LeftMessage({ avatar, message, createdAt, author }) {
  return (
    <div className="col-start-1 col-end-12 p-3 rounded-lg">
      <div className="flex flex-row items-center">
        <Avatar src={avatar}></Avatar>
        <Box
          sx={{
            backgroundColor: "primary.light",
          }}
          className="relative ml-3 text-sm  py-2 px-4 shadow rounded-xl"
        >
          <div className="flex flex-row justify-start items-end flex-nowrap gap-2">
            <Typography className="text-sm" color={"primary.main"}>
              {author}
            </Typography>
            <Typography
              variant="body2"
              color={"neutral.main"}
              className="opacity-75"
            >
              {moment(createdAt).fromNow()}
            </Typography>
          </div>
          <Typography color={"neutral.main"}>{message}</Typography>
        </Box>
      </div>
    </div>
  );
}

export default LeftMessage;
