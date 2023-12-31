import "@/styles/globals.css";
import { CssBaseline } from "@mui/material";

import { use, useEffect, useMemo, useState } from "react";
import { storeLS } from "@/utils/localStorage";
import { getTheme } from "@/config/theme.config.js";
import { ThemeProvider } from "@mui/material/styles";
import ThemeContext from "@/contexts/theme.context";
import Navbar from "@/components/Navbar";
import Container from "@mui/material/Container";
import {
  QueryClientProvider,
  QueryClient,
  Hydrate,
  useMutation,
} from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { SnackbarProvider } from "notistack";
import Drawer from "@/components/SideDrawer.js";
import cookieCutter, { set } from "cookie-cutter";
import io from "socket.io-client";
import { socketInit } from "@/config/socket.config.js";
import { useRouter } from "next/router";
import { enqueueSnackbar } from "notistack";
import { socketNewMessage } from "@/API/socket.api";
import NextNprogress from "nextjs-progressbar";

let socket;

function conditionalWrapper(condition, Parent, parentProps, Children) {
  if (condition) {
    return <Parent {...parentProps}>{Children}</Parent>;
  }
  return Children;
}

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 30,
            refetchOnWindowFocus: false,
            refetchOnMount: false,
          },
        },
      })
  );
  let [mode, setMode] = useState("dark");
  let theme = useMemo(() => getTheme(mode), [mode]);
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function toggleTheme() {
    storeLS("mode", mode === "dark" ? "light" : "dark", true);
    setMode((prevMode) => (prevMode === "dark" ? "light" : "dark"));
  }

  // useEffect for socket interactions
  useEffect(() => {
    const token = cookieCutter.get("jwt_token");
    setIsLoggedIn(!!token);
    if (token) {
      if (!socket) socket = socketInit(token);
      socketNewMessage(socket, queryClient);
    }
  });

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <SnackbarProvider maxSnack={3}>
                <NextNprogress color="#29D" height={3} />
                {Component.showDrawer && isLoggedIn && (
                  <Drawer open={open} setOpen={setOpen} />
                )}
                {!Component.showDrawer && isLoggedIn && (
                  <Drawer
                    open={open}
                    setOpen={setOpen}
                    showOnlyTemporary={true}
                  />
                )}
                <Navbar openDrawer={open} setOpenDrawer={setOpen} />
                <Container
                  // maxWidth="xl"
                  maxWidth={false}
                  sx={{
                    bgcolor: "background.default",
                    minHeight: "calc(100vh - 64px)",
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: 1,
                    padding: Component.noPadding ? 0 : 3,
                    mt: 8,
                  }}
                  className={`ml-0 w-full ${
                    Component.showDrawer ? "md:ml-[240px] p-0" : ""
                  }
                  ${
                    Component.showDrawer
                      ? "md:w-[calc(100%-240px)]"
                      : "md:w-full"
                  }`}
                >
                  <Component {...pageProps} />
                </Container>
              </SnackbarProvider>
            </ThemeProvider>
          </ThemeContext.Provider>
          <ReactQueryDevtools initialIsOpen={false} />
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}
