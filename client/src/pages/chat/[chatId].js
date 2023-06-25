import React from "react";
import {
  Box,
  Button,
  Container,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import LeftMessage from "@/components/chat/LeftMessage";
import RightMessage from "@/components/chat/RightMessage";
import { Attachment } from "@mui/icons-material";

function IndividualChat() {
  return (
    // <Container>
    <Box
      sx={{
        height: "calc(100vh - 64px)",
        width: "100%",
        padding: 0,
      }}
    >
      <Box className="w-full h-full">
        <div className="flex flex-row h-full w-full overflow-x-hidden">
          <div className="flex flex-col flex-auto h-full ">
            <Box
              sx={{
                backgroundColor: "background.alt",
              }}
              className="flex flex-col flex-auto flex-shrink-0 h-full p-4"
            >
              <div className="flex flex-col h-full overflow-x-auto mb-4">
                <div className="flex flex-col h-full">
                  <div className="grid grid-cols-12 gap-y-2">
                    <LeftMessage
                      avatar={
                        "https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/45.png"
                      }
                      message={"Hey How are you today?"}
                    />
                    <RightMessage
                      avatar={
                        "https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/45.png"
                      }
                      message={"I'm ok what about you?"}
                    />
                    <LeftMessage
                      avatar={
                        "https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/45.png"
                      }
                      message={"I'm fine"}
                    />
                    <RightMessage
                      avatar={
                        "https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/45.png"
                      }
                      message={
                        "Lorem ipsum dolor sit amet, consectetur adipiscing el it, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip"
                      }
                    />
                  </div>
                </div>
              </div>
              <Paper
                elevation={1}
                sx={{
                  padding: 2,
                }}
                className="flex flex-row items-center h-16 rounded-md  w-full"
              >
                <IconButton className="flex items-center justify-center">
                  <Attachment />
                </IconButton>

                <TextField size="small" className="w-full flex-grow ml-4" />

                <div className="ml-4">
                  <Button variant="contained" color="primary" className="h-8">
                    Send
                  </Button>
                </div>
              </Paper>
            </Box>
          </div>
        </div>
      </Box>
    </Box>
    // {/* </Container> */}
  );
}

IndividualChat.showDrawer = true;
IndividualChat.noPadding = true;

export default IndividualChat;
