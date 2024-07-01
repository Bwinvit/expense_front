import React, { useEffect } from "react";
import styled from "styled-components";
import { useAuth } from "Router/Auth/store/context";
import MonthlySummary from "./Components/MonthlySummary/MonthlySummary";
import HomeProvider from "../store/context";

const HomeComponent = styled.div``;

const Home = () => {
  const { setPageHeader } = useAuth();

  useEffect(() => {
    setPageHeader("Home");
  }, []);

  return (
    <HomeComponent>
      <MonthlySummary />
    </HomeComponent>
  );
};

const HomePageWrapper = () => (
  <HomeProvider>
    <Home />
  </HomeProvider>
);

export default HomePageWrapper;
