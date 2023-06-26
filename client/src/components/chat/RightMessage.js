import { Avatar, Box, ListItem, Typography } from "@mui/material";
import React from "react";
import moment from "moment";

function RightMessage({ avatar, message, createdAt, author }) {
  return (
    <div className="col-start-2 col-end-13 p-3 rounded-lg">
      <div className="flex items-center justify-start flex-row-reverse">
        <Avatar src={avatar}></Avatar>
        <Box
          sx={{
            backgroundColor: "primary.light",
          }}
          className="relative mr-3 text-sm  py-2 px-4 shadow rounded-xl"
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

export default RightMessage;
