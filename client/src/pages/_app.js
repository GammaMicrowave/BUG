import "@/styles/globals.css";

import { useMemo, useState } from "react";
import { storeLS } from "@/utils/storage";
import { getTheme } from "@/config/theme.config.js";

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

  return <Component {...pageProps} />;
}
