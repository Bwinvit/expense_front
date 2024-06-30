import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useAuth } from "Router/Auth/store/context";

const Home = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { setPageHeader } = useAuth();

  useEffect(() => {
    setPageHeader("Home");
  }, []);

  return (
    <div>
      <h1>Home Page</h1>
    </div>
  );
};

export default Home;
