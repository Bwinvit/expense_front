import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useAuth } from "Router/Auth/store/context";

const ReportAndAnalysis = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { setPageHeader } = useAuth();

  useEffect(() => {
    setPageHeader("Report and Analysis");
  }, []);
  return (
    <div>
      <h1>Report and Analysis Page</h1>
    </div>
  );
};

export default ReportAndAnalysis;
