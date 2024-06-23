import React from "react";
import styled from "styled-components";

import useWindowDimension from "hook/useWindowDimension";
import AuthPage from "../AuthPage/AuthPage";
import AuthDisplay from "../AuthDisplay/AuthDisplay";

const AuthContainer = styled.div`
    width: ${(props) => props.width}px;
    max-width: 1024px;
    height: ${(props) => props.height}px;
    border-radius: 0.5rem;
    display: grid;
    grid-template-columns: 1.25fr 1fr;

    @media (max-width: 1024px) {
        grid-template-columns: 1fr;
    }
`;

const AuthComponent = () => {
    const { width, height } = useWindowDimension();

    return (
        <AuthContainer
            width={width > 768 ? width * 0.75 : width}
            height={width > 768 ? height * 0.75 : height}
        >
            <AuthPage />
            {width > 1024 && <AuthDisplay />}
        </AuthContainer>
    );
};

export default AuthComponent;
