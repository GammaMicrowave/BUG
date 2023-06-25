import * as React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import { Avatar, Button, IconButton, SwipeableDrawer } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useRouter } from "next/router";
import cookieCutter from "cookie-cutter";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { fetchAllChats } from "@/API/chat.api";
import CircularProgress from "@mui/material/CircularProgress";
import CreateGroupChatModal from "./chat/CreateGroupChatModal";

const chats = [
  {
    id: 1,
    user: {
      name: "John Doe",
      id: 1,
      image:
        "https://images.unsplash.com/photo-1633960358570-4b0b0b0b0b0b?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzNnx8fGVufDB8fHx8&ixlib=rb-1.2.1&w=1000&q=80",
    },
    lastMessage: {
      content: "Hello",
      createdAt: "2021-10-10T12:00:00.000Z",
    },
    isGroupChat: false,
  },
  {
    id: 2,
    user: {
      name: "Jane Doe",
      id: 2,
      image:
        "https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/45.png",
    },
    lastMessage: {
      content: "Hello, how ohwofh owhef oiweh foiweh foiwehf oifweh",
      createdAt: "2021-10-10T12:00:00.000Z",
    },
    isGroupChat: false,
  },
  {
    id: 3,
    user: {
      name: "John Doe",
      id: 1,
    },
    lastMessage: {
      content: "Hello",
      createdAt: "2021-10-10T12:00:00.000Z",
    },
    isGroupChat: true,
    groupImage:
      "https://w7.pngwing.com/pngs/574/369/png-transparent-avatar-computer-icons-user-random-icons-purple-blue-heroes.png",
    chatName: "Group Chat",
  },
];

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const [token, setToken] = useState("");
  const [chats, setChats] = useState([]);
  const queryClient = useQueryClient();

  useEffect(() => {
    setToken(cookieCutter.get("jwt_token"));
    setChats(queryClient.getQueryData("fetchAllChats"));
  }, []);

  const fetchAllChatsQuery = useQuery(
    ["fetchAllChats"],
    () =>
      fetchAllChats({
        q: "",
        token,
      }),
    {
      enabled: !!token,
      onSuccess: (data) => {
        setChats(data);
      },
    }
  );

  const router = useRouter();
  const { open, setOpen } = props;
  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  //Modal Business Logic

  const [createGroupChatModalOpen, setCreateGroupChatModalOpen] =
    useState(false);

  const drawer = (
    <div id="sidebar-menu">
      <Toolbar>
        <Typography
          variant="h2"
          className="w-full text-xl text-center"
          color="primary"
        >
          Chat
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        <Toolbar className="flex flex-col flex-nowrap justify-center items-center">
          <Typography variant="h3" color="primary">
            Chat
          </Typography>
        </Toolbar>

        <div className="px-2 mb-4">
          <Button
            variant="contained"
            className="w-full"
            onClick={() => setCreateGroupChatModalOpen(true)}
          >
            <span className="capitalize">Create New Group</span>{" "}
            <AddRoundedIcon />
          </Button>
        </div>
        <Divider />

        {fetchAllChatsQuery.isLoading ? (
          <div className="flex justify-center items-center mt-4">
            <CircularProgress />
          </div>
        ) : (
          <>
            {chats.map((chat, index) => (
              <>
                <Link
                  key={chat.id}
                  href={`/chat/${chat.id}`}
                  onClick={() => setOpen(false)}
                >
                  <ListItem disablePadding>
                    <ListItemButton
                      selected={router.query.chatId === chat.id.toString()}
                    >
                      <Avatar
                        src={
                          chat.isGroupChat
                            ? chat.groupImage
                            : chat.users[0].image
                        }
                        style={{ marginRight: "10px" }}
                      />
                      <div>
                        <Typography
                          variant="body1"
                          color={
                            router.query.chatId === chat.id.toString()
                              ? "primary.dark"
                              : undefined
                          }
                        >
                          {chat.isGroupChat
                            ? chat.chatName
                            : chat.users[0].name}
                        </Typography>
                        <Typography
                          variant="body2"
                          color={
                            router.query.chatId === chat.id.toString()
                              ? "primary.dark"
                              : "neutral.main"
                          }
                        >
                          {chat.messages[0]?.content?.length > 25
                            ? chat.messages[0]?.content.slice(0, 25) + "..."
                            : chat.messages[0]?.content}
                        </Typography>
                      </div>
                    </ListItemButton>
                  </ListItem>
                </Link>
                {/* ))} */}
                <Divider />
              </>
            ))}
          </>
        )}
      </List>
    </div>
  );

  return (
    <>
      <CreateGroupChatModal
        open={createGroupChatModalOpen}
        setOpen={setCreateGroupChatModalOpen}
        token={token}
      />
      <Box
        component="nav"
        className={`w-0 md:w-[${drawerWidth}px] flex-shrink md:flex-shrink-0`}
        aria-label="mailbox folders"
      >
        <SwipeableDrawer
          variant="temporary"
          open={open}
          onClose={handleDrawerToggle}
          onOpen={handleDrawerToggle}
          ModalProps={{
            keepMounted: false,
          }}
          color="background"
          sx={{
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundImage: "none",
            },
          }}
          className={`${props.showOnlyTemporary ? "" : "md:hidden"} block`}
        >
          {drawer}
        </SwipeableDrawer>
        <Drawer
          variant="permanent"
          sx={{
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          className={`${props.showOnlyTemporary ? "" : "md:block"} hidden`}
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
}

export default ResponsiveDrawer;
