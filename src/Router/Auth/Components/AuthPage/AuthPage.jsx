import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";

import Logo from "asset/logo/loose_drawing_910.svg";

const AuthPageComponent = styled(motion.div)`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #ead474;
    filter: opacity(0.85);
    padding: 2rem 0;
    border-radius: 0.8rem;
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
`;

const LogoComponent = styled.div`
    width: 100px;
    height: 100px;
    background-color: #fff;
    border-radius: 100%;

    .logo {
        width: 100%;
        height: auto;
    }
`;

const AuthDescComponent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;

    .type {
        font-size: 1.5rem;
        font-weight: 700;
        color: #241c17;
    }

    .desc {
        font-size: 0.8rem;
        color: #241c17;
    }
`;

const AuthPageContent = styled(motion.div)`
    width: 100%;
    height: 100%;
`;

const AuthSwitch = styled.div`
    text-decoration: underline;
    cursor: pointer;
    color: #91824d;

    :hover {
        color: #241c17;
    }
`;

const AuthPage = () => {
    const [authPage, setAuthPage] = useState("login");

    const handleAuthPage = () => {
        setAuthPage((prevPage) =>
            prevPage === "login" ? "register" : "login"
        );
    };

    return (
        <AuthPageComponent
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.8,
                delay: 0.5,
                ease: [0, 0.71, 0.2, 1.01],
            }}
        >
            <LogoComponent>
                <motion.img
                    alt={"logo"}
                    src={Logo}
                    className="logo"
                    key={authPage}
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: .5,
                        type: "spring",
                    }}
                />
            </LogoComponent>
            <AuthDescComponent>
                <motion.div
                    className="type"
                    key={authPage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                        duration: 0.5,
                        delay: 0,
                    }}
                >
                    {authPage === "login" ? "Log in" : "Register"}
                </motion.div>
                <div className="desc">
                    See what Atlas is capable of for free
                </div>
            </AuthDescComponent>
            <AuthPageContent
                key={authPage}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 0.3,
                    delay: 0,
                    ease: [0, 0.71, 0.2, 1.01],
                }}
            >
                {authPage === "login" ? (
                    <LoginPage key={authPage} />
                ) : (
                    <RegisterPage key={authPage} />
                )}
            </AuthPageContent>
            <AuthSwitch onClick={handleAuthPage}>
                {authPage !== "login" ? "Log in" : "Register"}
            </AuthSwitch>
        </AuthPageComponent>
    );
};

export default AuthPage;
