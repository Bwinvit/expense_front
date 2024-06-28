import React from "react";
import { Provider } from "react-redux";
import AppRouter from "./Router/router";
import store from "./Store/index.js";
import AuthProvider from "./Router/Auth/store/context.jsx";
import enUS from "antd/es/calendar/locale/en_US";
import "antd/dist/reset.css";
import { ConfigProvider } from "antd";
import CommonProvider from "Router/Store/context";

const config = {
  locale: enUS,
  theme: {
    token: {
      // Custom primary and secondary colors
      colorPrimary: "#847447", // Primary color
      colorSecondary: "#ead474", // Secondary color

      // Additional custom colors
      colorSuccess: "#6b8e23", // Olive green for success messages
      colorWarning: "#d8b56a", // Warm yellow for warning messages
      colorError: "#c76363", // Muted red for error messages
      colorInfo: "#a2b3a6", // Soft green-gray for informational messages

      // Text colors
      colorTextBase: "#3e3e3e", // Dark gray for base text
      colorTextSecondary: "#6b6b6b", // Medium gray for secondary text
      colorTextDisabled: "#a9a9a9", // Light gray for disabled text
      colorTextHeading: "#2c2c2c", // Darker shade for headings
      colorTextLabel: "#575757", // Gray for labels

      // Background and border colors
      colorBgBase: "#f5f5f5", // Light gray background
      colorBorderBase: "#d9d9d9", // Light border color
    },
  },
};

const App = () => {
  return (
    <ConfigProvider {...config}>
      <Provider store={store}>
        <AuthProvider>
          <CommonProvider>
            <AppRouter />
          </CommonProvider>
        </AuthProvider>
      </Provider>
    </ConfigProvider>
  );
};

export default App;
