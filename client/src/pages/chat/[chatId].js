import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  List,
  ListItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import LeftMessage from "@/components/chat/LeftMessage";
import RightMessage from "@/components/chat/RightMessage";
import { Attachment } from "@mui/icons-material";
import {
  dehydrate,
  useQueryClient,
  QueryClient,
  useQuery,
  useMutation,
} from "react-query";
import { getChat, addMessage } from "@/API/chat.api";

export async function getServerSideProps({ req, res, params }) {
  const queryClient = new QueryClient();
  const token = req.cookies["jwt_token"];
  const chatId = params.chatId;
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      pageProps: {
        token,
        chatId,
      },
    },
  };
}

function IndividualChat({ pageProps: { token, chatId } }) {
  const queryClient = useQueryClient();
  const bottomRef = useRef(null);

  const { data: chatData, isLoading } = useQuery(["chat", chatId], () =>
    getChat({ chatId, token })
  );

  const [message, setMessage] = useState("");

  const addMessageMutation = useMutation((message) => addMessage(message), {
    onSuccess: (data) => {
      // const prevData = queryClient.getQueryData(["chat", chatId]);
      // queryClient.setQueryData(["chat", chatId], {
      //   ...prevData,
      //   messages: [...prevData.messages, data],
      // });
      //this is now done in the socket event in _app.js for real time updates
    },
  });
  const handleAddMessage = () => {
    if (message.trim() === "") return;

    addMessageMutation.mutate({
      chatId,
      token,
      message,
    });
    setMessage("");
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatData]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[calc(100vh-64px)] w-full">
        <CircularProgress />
      </div>
    );
  return (
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
              <div className="flex h-full overflow-x-auto mb-4 flex-col" s>
                <div className="flex flex-col h-full">
                  <div className="grid grid-cols-12 gap-y-2">
                    {chatData && chatData.messages.length > 0
                      ? chatData.messages.map((message) => {
                          if (message.isMine) {
                            return (
                              <RightMessage
                                key={message.id}
                                avatar={message.author.image}
                                message={message.content}
                                author={message.author.name}
                                createdAt={message.createdAt}
                              />
                            );
                          }
                          return (
                            <LeftMessage
                              key={message.id}
                              avatar={message.author.image}
                              author={message.author.name}
                              createdAt={message.createdAt}
                              message={message.content}
                            />
                          );
                        })
                      : null}
                    <div ref={bottomRef} />
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

                <TextField
                  size="small"
                  className="w-full flex-grow ml-4"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleAddMessage();
                  }}
                />

                <div className="ml-4">
                  <Button
                    variant="contained"
                    color="primary"
                    className="h-8"
                    onClick={handleAddMessage}
                  >
                    Send
                  </Button>
                </div>
              </Paper>
            </Box>
          </div>
        </div>
      </Box>
    </Box>
  );
}

IndividualChat.showDrawer = true;
IndividualChat.noPadding = true;

export default IndividualChat;
