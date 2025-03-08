import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import storage from "./utils/storage";
import { setAuthorizationHeader } from "./api/client";
import { AuthProvider } from "./pages/auth/context";
import App from "./app";
import { ErrorBoundary } from "./pages/error/error-boundary";

import configureStore from "./store";
import { Provider } from "react-redux"

const store = configureStore();
console.log(store);

const accessToken = storage.get("auth");
if (accessToken) {
  setAuthorizationHeader(accessToken);
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <Provider store ={store}>
        <BrowserRouter>
            <AuthProvider defaultIsLogged={!!accessToken}>
              <App />
            </AuthProvider>
        </BrowserRouter>
      </Provider>
    </ErrorBoundary>
  </StrictMode>,
);
