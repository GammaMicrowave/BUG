import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Modal,
} from "@mui/material";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useState } from "react";
import FileUpload from "@/components/FileUpload";
import AdbIcon from "@mui/icons-material/Adb";
import cookieCutter from "cookie-cutter";
import { useMutation, useQueryClient } from "react-query";
// import { ProfileLinkModal } from "@/API/user.api";
import CircularProgress from "@mui/material/CircularProgress";
import { LoadingButton } from "@mui/lab";
import { enqueueSnackbar } from "notistack";
import { addNewProfileLink } from "@/API/user.api";

function ProfileLinkModal({ openModal, setOpenModal }) {
  const [token, setToken] = useState(null);
  useEffect(() => {
    setToken(cookieCutter.get("jwt_token"));
  }, []);
  const [data, setData] = useState("");
  const queryClient = useQueryClient();

  const handleClose = () => {
    setOpenModal(false);
  };

  const addNewProfileLinkMutation = useMutation(addNewProfileLink, {
    onSuccess: (data) => {
      const prevData = queryClient.getQueryData(["selfData"]);
      const newData = structuredClone(prevData);
      newData.otherProfiles.push({
        otherProfileLink: data.otherProfileLink,
        id: data.id,
      });
      queryClient.setQueryData(["selfData"], newData);
      enqueueSnackbar("Profile Link Added", {
        variant: "success",
      });
      handleClose();
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const handleSubmit = async () => {
    if (data === "") {
      handleClose();
      return;
    }
    await addNewProfileLinkMutation.mutateAsync({ data, token });
    handleClose();
  };

  return (
    <>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Container maxWidth="sm" className="mt-24">
          <Paper elevation={3} className="p-4 flex flex-col gap-4 mt-4">
            <div className="flex flex-col justify-center gap-2 items-center w-full">
              <Typography variant="h5">Add New Profile Link</Typography>
            </div>
            <TextField
              id="outlined-basic"
              label="Profile Link"
              variant="outlined"
              className="w-full"
              value={data.name}
              onChange={(e) => setData((prev) => e.target.value)}
            />

            <div className="flex gap-2">
              <LoadingButton
                variant="outlined"
                className="w-full basis-1/2"
                onClick={handleClose}
              >
                Close
              </LoadingButton>
              <LoadingButton
                loading={addNewProfileLinkMutation.isLoading}
                variant="contained"
                onClick={handleSubmit}
                className="w-full basis-1/2"
              >
                Submit
              </LoadingButton>
            </div>
          </Paper>
        </Container>
      </Modal>
    </>
  );
}

export default ProfileLinkModal;
