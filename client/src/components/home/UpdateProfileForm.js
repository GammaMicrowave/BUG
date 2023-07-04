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
import { updateProfile } from "@/API/user.api";
import CircularProgress from "@mui/material/CircularProgress";
import { LoadingButton } from "@mui/lab";
import { enqueueSnackbar } from "notistack";

function UpdateProfile({
  openModal,
  setOpenModal,
  defaultName,
  defaultBio,
  defaultLocation,
  defaultOccupation,
}) {
  const router = useRouter();
  const [files, setFiles] = useState([]);
  const [token, setToken] = useState(null);
  useEffect(() => {
    setToken(cookieCutter.get("jwt_token"));
  }, []);
  const [data, setData] = useState({
    name: defaultName,
    bio: defaultBio,
    location: defaultLocation,
    occupation: defaultOccupation,
  });
  const queryClient = useQueryClient();

  const { mutateAsync, isLoading } = useMutation(updateProfile);

  const handleSubmit = (e) => {
    e.preventDefault();
    mutateAsync({
      data,
      files,
      token,
    })
      .then((data) => {
        queryClient.setQueryData(["selfData"], data);
        setOpenModal(false);
        enqueueSnackbar("Profile updated successfully", { variant: "success" });
      })
      .catch((err) => {
        console.log(err);
        // enqueueSnackbar(err.data.error, { variant: "error" });
      });
  };

  const handleClose = () => {
    setOpenModal(false);
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
              <Typography variant="h5">Update Profile</Typography>
            </div>
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              className="w-full"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
            <TextField
              id="outlined-basic"
              label="Bio"
              variant="outlined"
              value={data.bio}
              onChange={(e) => setData({ ...data, bio: e.target.value })}
            />
            <TextField
              id="outlined-basic"
              label="Location"
              variant="outlined"
              value={data.location}
              onChange={(e) => setData({ ...data, location: e.target.value })}
            />
            <TextField
              id="outlined-basic"
              label="Occupation"
              variant="outlined"
              value={data.occupation}
              onChange={(e) => setData({ ...data, occupation: e.target.value })}
            />
            <FileUpload
              files={files}
              setFiles={setFiles}
              helperText={"Upload a new Profile Picture"}
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
                loading={isLoading}
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

export default UpdateProfile;
