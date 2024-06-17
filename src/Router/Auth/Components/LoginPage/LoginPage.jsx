import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import useWindowDimension from "hook/useWindowDimension";

import { Input, Select, Space } from "antd";
import { MailOutlined, UserOutlined, SearchOutlined } from "@ant-design/icons";
import { TbPassword } from "react-icons/tb";

const LoginComponent = styled.div`
    margin: 2rem;

    .form_component {
        .form_compact {
            width: 100%;
            .select {
                width: 25%;
            }
            .input {
                width: 75%;
            }
        }
    }
`;

const EmailComponent = styled(motion.div)``;

const PasswordComponent = styled(motion.div)``;

const StyledInput = styled(Input.Password)`
    .ant-input-group-addon {
        background-color: #f0f0f0;
        border: 1px solid #d9d9d9;
        background-color: #fff;
        width: 25%;
    }

    .ant-input {
        padding-left: 10px;
    }
`;

const Option = () => {
    return [
        {
            value: "email",
            label: (
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    Email
                </div>
            ),
        },
        {
            value: "username",
            label: (
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    Username
                </div>
            ),
        },
    ];
};

const LoginPage = ({ authPage }) => {
    const { width } = useWindowDimension();

    const [loginData, setLoginData] = useState({
        credential: {
            type: "email",
            data: "",
        },
        password: "",
    });

    const handleChangeCredentialType = (value) => {
        setLoginData({
            ...loginData,
            credential: {
                type: value,
                data: "",
            },
        });
    };

    const handleChangeCredential = (value) => {
        setLoginData({
            ...loginData,
            credential: {
                ...loginData.credential,
                data: value.target.value,
            },
        });
    };

    const handleChangePassword = (value) => {
        setLoginData({
            ...loginData,
            password: value.target.value,
        });
    };

    return (
        <LoginComponent>
            <EmailComponent
                key={authPage}
                initial={{ opacity: 0, scale: 1.25 }}
                transition={{ duration: 0.4, delay: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                className="form_component"
            >
                <Space.Compact className="form_compact">
                    <Select
                        options={Option()}
                        defaultValue={"email"}
                        className="select"
                        onChange={handleChangeCredentialType}
                    />
                    <Input
                        className="input"
                        value={loginData.credential.data}
                        placeholder={
                            loginData.credential.type === "email"
                                ? "Email"
                                : "Username"
                        }
                        onChange={handleChangeCredential}
                    />
                </Space.Compact>
            </EmailComponent>
            <PasswordComponent
                key={authPage}
                initial={{ opacity: 0, scale: 1.25 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                animate={{ opacity: 1, scale: 1 }}
                className="form_component"
            >
                <Space.Compact className="form_compact">
                    <StyledInput
                        addonBefore={<>Password</>}
                        placeholder="Password"
                        onChange={handleChangePassword}
                    />
                </Space.Compact>
            </PasswordComponent>
        </LoginComponent>
    );
};

export default LoginPage;
