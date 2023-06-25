import * as React from "react";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import { Avatar, SwipeableDrawer } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import StoreIcon from "@mui/icons-material/Store";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import Link from "next/link";

import { useRouter } from "next/router";

// import useUser from "@/customHooks/useUser";

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
      content: "Hello",
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
  const router = useRouter();
  //   const { user } = useUser();
  const { open, setOpen } = props;
  const handleDrawerToggle = () => {
    setOpen(!open);
  };

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
        {chats.map((chat, index) => (
          <>
            {/* {list.title && (
              <ListSubheader disableSticky>{list.title}</ListSubheader>
            )} */}
            {/* {list.items.map((item) => ( */}

            <Link
              key={chat.id}
              href={`/chat/${chat.id}`}
              onClick={() => setOpen(false)}
            >
              <ListItem disablePadding>
                <ListItemButton selected={router.pathname === "/chat/1"}>
                  {/* <ListItemIcon>
                    <item.Icon
                      color={
                        router.pathname === "/chat/1" ? "primary" : undefined
                      }
                    />
                  </ListItemIcon> */}
                  <Avatar
                    src={chat.isGroupChat ? chat.groupImage : chat.user.image}
                    style={{ marginRight: "10px" }}
                  />
                  <ListItemText
                    primary={chat.isGroupChat ? chat.chatName : chat.user.name}
                    primaryTypographyProps={{
                      color:
                        router.pathname === "/chat/1" ? "primary" : undefined,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </Link>
            {/* ))} */}
            <Divider />
          </>
        ))}
      </List>
      {/* {user?.isAdmin &&
        (!isAdmin() ? (
          <Link href="/admin" onClick={() => setOpen(false)}>
            <ListItemButton>
              <ListItemIcon>
                <VerifiedUserIcon />
              </ListItemIcon>
              <ListItemText primary={"Admin Panel"} />
            </ListItemButton>
          </Link>
        ) : (
          <Link href="/dashboard" onClick={() => setOpen(false)}>
            <ListItemButton>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary={"User Panel"} />
            </ListItemButton>
          </Link>
        ))} */}
    </div>
  );

  return (
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
  );
}

export default ResponsiveDrawer;
