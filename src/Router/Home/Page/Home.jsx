import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { setPageHeader } from "Router/Auth/store/action";
import { useDispatch } from "react-redux";

const Home = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageHeader("Home"));
  }, []);

  return (
    <div>
      <h1>Home Page</h1>
    </div>
  );
};

export default Home;
