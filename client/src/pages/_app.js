import "@/styles/globals.css";

import { useMemo, useState } from "react";
import { storeLS } from "@/utils/localStorage";
import { getTheme } from "@/config/theme.config.js";
import { ThemeProvider } from "@mui/material/styles";
import ThemeContext from "@/contexts/theme.context";

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
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </ThemeContext.Provider>
    </>
  );
}
