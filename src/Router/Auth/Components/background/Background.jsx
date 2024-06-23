import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

import AuthBackground from "asset/background/Asset44.jpg";
import useWindowDimension from "hook/useWindowDimension";

const BackgroundContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: -1; /* Ensure background is behind all other content */
`;

const BackgroundImage = styled(motion.div)`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url(${AuthBackground}) repeat;
    background-size: cover;
`;

const scrollAnimation = {
    animate: {
        y: ["0%", "-100%"],
        transition: {
            y: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 60,
                ease: "linear",
            },
        },
    },
};

const ContainerChild = styled.div`
    position: relative;
    z-index: 1;
    display: flex;
    justify-content: center;
    transition: .5s;
`;

const AuthBackgroundComponent = ({ children }) => {
    const { width } = useWindowDimension();

    return (
        <>
            <BackgroundContainer>
                <BackgroundImage {...scrollAnimation} />
                <BackgroundImage style={{ top: "100%" }} {...scrollAnimation} />
            </BackgroundContainer>
            <ContainerChild style={width > 768 ? { marginTop: 100 } : {}}>
                {children}
            </ContainerChild>
        </>
    );
};

export default AuthBackgroundComponent;
