import React from "react";
import styled from "styled-components";

import { motion } from "framer-motion";

const AuthDisplayComponent = styled(motion.div)`
    width: 100%;
    background-color: #847447;
    filter: opacity(0.9);
    border-radius: 0.8rem;
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
`;

const AuthDisplay = () => {
    return (
        <AuthDisplayComponent
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.8,
                delay: 0.55,
                ease: [0, 0.71, 0.2, 1.01],
            }}
        >
            Auth Display Sep
        </AuthDisplayComponent>
    );
};

export default AuthDisplay;
