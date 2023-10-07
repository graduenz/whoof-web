import React from "react";
import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";

import App from "./App";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="whoof-dev.us.auth0.com"
      clientId="l5AWlFUz3SUej9LQ1SAbcKEVqp4EysHm"
      authorizationParams={{
        audience: "https://whoof/api",
        redirect_uri: window.location.origin,
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
