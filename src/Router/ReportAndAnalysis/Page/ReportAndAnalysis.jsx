import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { setPageHeader } from "Router/Auth/store/action";
import { useDispatch } from "react-redux";

const ReportAndAnalysis = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageHeader("Report and Analysis"));
  }, []);
  return (
    <div>
      <h1>Report and Analysis Page</h1>
    </div>
  );
};

export default ReportAndAnalysis;
