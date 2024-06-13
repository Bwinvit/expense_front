import React from "react";
import { Provider } from "react-redux";
import AppRouter from "./Router/router";
import store from "./Store/index.js";
import AuthProvider from "./Router/Auth/store/context.jsx";

const App = (props) => {
    return (
        <Provider store={store}>
            <AuthProvider>
                <AppRouter />
            </AuthProvider>
        </Provider>
    );
};

export default App;
