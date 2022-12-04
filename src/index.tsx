import React from "react";
import ReactDOM from "react-dom/client";

import * as serviceWorkerRegistration from "@/serviceWorkerRegistration"
import { Provider } from "react-redux";

import App from "@/App";
import store from "@/store";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
setTimeout(() => {
  root.render(
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  );
}, 800);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();