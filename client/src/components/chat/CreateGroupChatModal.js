import { Box, Modal, Typography, TextField, Button } from "@mui/material";
import React, { useCallback } from "react";
import SearchInput from "./SearchUserInput";
import { get } from "../../utils/request";
import cookieCutter from "cookie-cutter";
import { useMutation, useQueryClient } from "react-query";
import { createGroupChat } from "@/API/chat.api";
import { enqueueSnackbar } from "notistack";

function CreateGroupChatModal({ open, setOpen, token }) {
  const queryClient = useQueryClient();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [users, setUsers] = React.useState([]);
  const [disabled, setDisabled] = React.useState(false);
  const [userIds, setUserIds] = React.useState([]); // [userId
  const [groupName, setGroupName] = React.useState("");

  const createGroupChatMutation = useMutation(createGroupChat, {
    onSuccess: (data) => {
      const prevData = queryClient.getQueryData("fetchAllChats");
      queryClient.setQueryData("fetchAllChats", [data, ...prevData]);
      handleClose();
    },
    onError: (err) => {
      enqueueSnackbar(err.data.error, {
        variant: "error",
      });
    },
  });

  const handleCreate = () => {
    setDisabled(true);
    createGroupChatMutation.mutate({
      token,
      chatName: groupName,
      users: userIds,
    });
    handleClose();
  };

  let searchUsers = useCallback(
    async function (value) {
      let {
        data: { data: userlist },
      } = await get(`/public/searchAllUsers`, null, {
        q: value,
        exclude: users.join(";"),
      });
      return userlist;
    },
    [users]
  );

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="flex justify-center items-center"
    >
      <Box
        sx={{
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 2,
          color: "primary.main",
          borderRadius: "10px",
          width: {
            xs: "90%",
            sm: "50%",
            md: "40%",
          },
        }}
        className="flex flex-col gap-4"
      >
        <Typography
          variant="h4"
          id="modal-modal-title"
          className="text-center "
        >
          Create New Group
        </Typography>
        <TextField
          id="outlined-basic"
          label="Group Name"
          variant="outlined"
          className="w-full "
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />

        <SearchInput
          users={users}
          value={users}
          setValue={setUsers}
          queryFn={searchUsers}
          label="Add Users"
          disabled={disabled}
          setUserIds={setUserIds}
        />

        <div className="flex justify-end">
          <Button
            variant="contained"
            color="error"
            className="mr-2"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleCreate}>
            Create
          </Button>
        </div>
      </Box>
    </Modal>
  );
}

export default CreateGroupChatModal;
