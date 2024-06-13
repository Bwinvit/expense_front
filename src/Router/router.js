import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import loadable from "@loadable/component";
import ProtectRoute from "./Utils/protectRoute.jsx";

const Home = loadable(() => import("./Home/Page/Home.jsx"));
const Auth = loadable(() => import("./Auth/Page/Auth.jsx"));
const ReportAndAnalysis = loadable(() =>
    import("./ReportAndAnalysis/Page/ReportAndAnalysis.jsx")
);

const AppRouter = () => {
    const ProtectedHome = ProtectRoute(Home);
    const ProtectedReportAndAnalysis = ProtectRoute(ReportAndAnalysis);

    return (
        <Router>
            <Routes>
                <Route path="/auth" element={<Auth />} />
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
