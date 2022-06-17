import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./redux/configStore";
import "./index.css";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { DOMAIN_MOVIE } from "./utils/settings/config";

// const signalR = require("@microsoft/signalr");

// export const connection = new signalR.HubConnectionBuilder()
//   .withUrl(`${DOMAIN_MOVIE}/DatVeHub`)
//   .configureLogging(signalR.LogLevel.Information)
//   .build();

const root = ReactDOM.createRoot(document.getElementById("root"));

// connection
//   .start()
//   .then(() => {

//   })
//   .catch((errors) => {
//     console.log(errors);
//   });

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
