import { Container, Paper, TextField, Button, Typography } from "@mui/material";
import React from "react";
import { useRouter } from "next/router";
import { useState } from "react";
import AdbIcon from "@mui/icons-material/Adb";
import { signInUser } from "@/API/auth.api";
import { useMutation } from "react-query";
import cookieCutter from "cookie-cutter";
import CircularProgress from "@mui/material/CircularProgress";
import { LoadingButton } from "@mui/lab";

function signin() {
  const router = useRouter();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const { mutateAsync, isLoading } = useMutation(signInUser, {
    onError: (error) => {
      console.log(error);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutateAsync({
      email: data.email,
      password: data.password,
    }).then((res) => {
      cookieCutter.set("jwt_token", res.token, {
        expires: 30,
        httpOnly: true,
      });
      window.location.reload();
      router.push("/");
    });
  };

  return (
    <>
      <Container maxWidth="sm" className="">
        <Paper elevation={3} className="p-4 flex flex-col gap-4 mt-4">
          <div className="flex flex-col justify-center gap-2 items-center w-full">
            <AdbIcon className="w-12 h-12 " />
            <Typography variant="h5">Sign In</Typography>
          </div>
          <div className="flex flex-row gap-2 basis-1/2 "></div>

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

          <LoadingButton
            loading={isLoading}
            variant="contained"
            onClick={handleSubmit}
          >
            Submit
          </LoadingButton>

          <div className="flex flex-row justify-center">
            <Typography variant="h6">Don't have an account?</Typography>
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
              onClick={() => router.push("/signup")}
            >
              Sign Up
            </Typography>
          </div>
        </Paper>
      </Container>
    </>
  );
}

export default signin;
