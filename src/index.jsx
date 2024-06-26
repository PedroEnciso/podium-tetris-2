import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import App from "./App";

import { worker } from "./mocks/browser";
if (process.env.NODE_ENV === "development") {
  worker.start().then(() => {
    ReactDOM.createRoot(document.getElementById("root")).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  });
} else {
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
