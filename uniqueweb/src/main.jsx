import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import "./index.css";

import { initAnimations } from "./animations";

function Root() {
  useEffect(() => {
    const cleanup = initAnimations();

    return cleanup;
  }, []);

  return <App />;
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);