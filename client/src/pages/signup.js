import { Container, Paper, TextField, Button, Typography } from "@mui/material";
import React from "react";
import { useRouter } from "next/router";
import { useState } from "react";
import FileUpload from "@/components/FileUpload";
import AdbIcon from "@mui/icons-material/Adb";
import cookieCutter from "cookie-cutter";
import { useMutation } from "react-query";
import { signUpUser } from "@/API/auth.api.js";
import CircularProgress from "@mui/material/CircularProgress";
import { LoadingButton } from "@mui/lab";
import { enqueueSnackbar } from "notistack";

function signup() {
  const router = useRouter();
  const [files, setFiles] = useState([]);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    bio: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { mutateAsync, isLoading } = useMutation(signUpUser);

  const handleSubmit = (e) => {
    e.preventDefault();
    mutateAsync({
      firstName: data.firstName,
      lastName: data.lastName,
      bio: data.bio,
      image: files,
      email: data.email,
      password: data.password,
    })
      .then((res) => {
        cookieCutter.set("jwt_token", res.token, {
          expires: 30,
          httpOnly: true,
        });
        enqueueSnackbar("Signed up successfully", { variant: "success" });
        window.location.reload();
      })
      .catch((err) => {
        enqueueSnackbar(err.data.error, { variant: "error" });
      });
  };

  return (
    <>
      <Container maxWidth="sm" className="">
        <Paper elevation={3} className="p-4 flex flex-col gap-4 mt-4">
          <div className="flex flex-col justify-center gap-2 items-center w-full">
            <AdbIcon className="w-12 h-12 " />
            <Typography variant="h5">Sign Up</Typography>
          </div>
          <div className="flex flex-row gap-2 basis-1/2 ">
            <TextField
              id="outlined-basic"
              label="First Name"
              variant="outlined"
              className="w-full"
              value={data.firstName}
              onChange={(e) => setData({ ...data, firstName: e.target.value })}
            />
            <TextField
              id="outlined-basic"
              label="Last Name"
              variant="outlined"
              className="w-full"
              value={data.lastName}
              onChange={(e) => setData({ ...data, lastName: e.target.value })}
            />
          </div>
          <TextField
            id="outlined-basic"
            label="Bio"
            variant="outlined"
            value={data.bio}
            onChange={(e) => setData({ ...data, bio: e.target.value })}
          />
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type="password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
          <TextField
            error={data.password !== data.confirmPassword}
            helperText={
              data.password !== data.confirmPassword
                ? "Passwords do not match"
                : ""
            }
            type="password"
            id="outlined-basic"
            label="Confirm Password"
            variant="outlined"
            value={data.confirmPassword}
            onChange={(e) =>
              setData({ ...data, confirmPassword: e.target.value })
            }
          />
          <FileUpload files={files} setFiles={setFiles} />

          <LoadingButton
            loading={isLoading}
            variant="contained"
            onClick={handleSubmit}
          >
            Submit
          </LoadingButton>
          <div className="flex flex-row justify-center">
            <Typography variant="h6">Already have an account?</Typography>
            <Typography
              variant="h6"
              className="ml-2"
              color={"primary"}
              sx={{
                cursor: "pointer",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
              onClick={() => router.push("/signin")}
            >
              Sign In
            </Typography>
          </div>
        </Paper>
      </Container>
    </>
  );
}

export default signup;
