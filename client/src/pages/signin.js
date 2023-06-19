import { Container, Paper, TextField, Button, Typography } from "@mui/material";
import React from "react";
import { useRouter } from "next/router";
import { useState } from "react";
import AdbIcon from "@mui/icons-material/Adb";

function signin() {
  const router = useRouter();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    console.log(data);
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

          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
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

export default signup;
