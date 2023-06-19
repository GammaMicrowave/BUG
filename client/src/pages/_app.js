import "@/styles/globals.css";

import { useMemo, useState } from "react";
import { storeLS } from "@/utils/localStorage";
import { getTheme } from "@/config/theme.config.js";
import { ThemeProvider } from "@mui/material/styles";
import ThemeContext from "@/contexts/theme.context";
import Navbar from "@/components/Navbar";
import Container from "@mui/material/Container";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

function conditionalWrapper(condition, Parent, parentProps, Children) {
  if (condition) {
    return <Parent {...parentProps}>{Children}</Parent>;
  }
  return Children;
}

export default function App({ Component, pageProps }) {
  let [mode, setMode] = useState("dark");
  let theme = useMemo(() => getTheme(mode), [mode]);

  function toggleTheme() {
    storeLS("mode", mode === "dark" ? "light" : "dark", true);
    setMode((prevMode) => (prevMode === "dark" ? "light" : "dark"));
  }

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
          <ThemeProvider theme={theme}>
            <Navbar />
            <Container
              // maxWidth="xl"
              maxWidth={false}
              sx={{
                bgcolor: "background.default",
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
                p: 3,
              }}
            >
              <Component {...pageProps} />
            </Container>
          </ThemeProvider>
        </ThemeContext.Provider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}
