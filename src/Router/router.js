import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import loadable from "@loadable/component";
import ProtectRoute from "./Utils/protectRoute.jsx";
import AuthRoute from "./Utils/authRouter.jsx";

import Home from "./Home/Page/Home.jsx";
import Auth from "./Auth/Page/Auth.jsx";
import ReportAndAnalysis from "./ReportAndAnalysis/Page/ReportAndAnalysis.jsx";

const AppRouter = () => {
    const AuthRouter = AuthRoute(Auth);
    const ProtectedHome = ProtectRoute(Home);
    const ProtectedReportAndAnalysis = ProtectRoute(ReportAndAnalysis);

    return (
        <Router>
            <Routes>
                {/* <Route path="/auth" element={<Auth />} /> */}
                <Route path="/auth" element={<AuthRouter />} />
                <Route path="/" element={<ProtectedHome />} />
                <Route
                    path="/report-and-analysis"
                    element={<ProtectedReportAndAnalysis />}
                />
            </Routes>
        </Router>
    );
};

export default AppRouter;
