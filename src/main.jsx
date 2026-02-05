import React from "react";
import ReactDOM from "react-dom/client";
import "./style.css";
import App from "./App.jsx";
import { RoleProvider } from "./roleContext.jsx";

ReactDOM.createRoot(document.getElementById("app")).render(
  <React.StrictMode>
    <RoleProvider>
      <App />
    </RoleProvider>
  </React.StrictMode>
);

