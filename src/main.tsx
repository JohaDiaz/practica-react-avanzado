import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import storage from "./utils/storage";
import { setAuthorizationHeader } from "./api/client";
import App from "./app";
import { ErrorBoundary } from "./pages/error/error-boundary";

import configureStore from "@/store";
import { Provider } from "react-redux"

const accessToken = storage.get("auth");
if (accessToken) {
  setAuthorizationHeader(accessToken);
}
const store = configureStore({ auth: !!accessToken});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <Provider store ={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ErrorBoundary>
  </StrictMode>,
);
