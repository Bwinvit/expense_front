import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectRoute from "./Utils/protectRoute.jsx";
import AuthRoute from "./Utils/authRouter.jsx";

import Home from "./Home/Page/Home.jsx";
import Auth from "./Auth/Page/Auth.jsx";
import ReportAndAnalysis from "./ReportAndAnalysis/Page/ReportAndAnalysis.jsx";
import Management from "./Management/Page/Management.jsx";
import Setting from "./Setting/Page/Setting.jsx";
import Goal from "./Goal/Page/Goal.jsx";
import Transaction from "./Transaction/Page/Transaction.jsx";

const AppRouter = () => {
  const AuthRouter = AuthRoute(Auth);
  const ProtectedHome = ProtectRoute(Home);
  const ProtectedReportAndAnalysis = ProtectRoute(ReportAndAnalysis);
  const ProtectedManagement = ProtectRoute(Management);
  const ProtectedSetting = ProtectRoute(Setting);
  const ProtectedGoal = ProtectRoute(Goal);
  const ProtectedTransaction = ProtectRoute(Transaction);

  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<AuthRouter />} />
        <Route path="/" element={<ProtectedHome />} />
        <Route
          path="/report-and-analysis"
          element={<ProtectedReportAndAnalysis />}
        />
        <Route path="/management" element={<ProtectedManagement />} />
        <Route path="/setting" element={<ProtectedSetting />} />
        <Route path="/goal" element={<ProtectedGoal />} />
        <Route path="/transaction" element={<ProtectedTransaction />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
