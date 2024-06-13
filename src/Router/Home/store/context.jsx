import React, { createContext, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHomeData } from "./action";

const HomeContext = createContext();

export const useHome = () => useContext(HomeContext);

const HomeProvider = ({ children }) => {
    const dispatch = useDispatch();
    const home = useSelector((state) => state.home);

    useEffect(() => {
        dispatch(fetchHomeData());
    }, [dispatch]);

    return <HomeContext.Provider value={home}>{children}</HomeContext.Provider>;
};

export default HomeProvider;
