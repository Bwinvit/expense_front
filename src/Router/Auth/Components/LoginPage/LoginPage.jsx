import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Button, Form, Input, Select, Space, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "Router/Auth/store/context";

const LoginComponent = styled(Form)`
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

const EmailComponent = styled(motion.div)`
  margin-bottom: 0.5rem;
`;

const PasswordComponent = styled(motion.div)``;

const StyledInput = styled(Input.Password)`
  .ant-input-group-addon {
    background-color: #f0f0f0;
    background-color: #fff;
    width: 25%;
  }

  .ant-input {
    padding-left: 10px;
  }
`;

const ButtonComponent = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
`;

const LoginButtonComponent = styled.div``;

const ForgetpasswordCompoent = styled.div`
  cursor: pointer;
  color: #c3b0a2;
  font-size: 0.8rem;
  text-decoration: underline;
  transition: 0.3s;

  &:hover {
    color: #241c17;
    transition: 0.3s;
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
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { login } = useAuth();

  const [loginData, setLoginData] = useState({
    credential: {
      type: "email",
      data: "",
    },
    password: "",
  });

  useEffect(() => {
    return () => {
      dispatch({ type: "CLEAR_ERROR" });
    };
  }, [dispatch]);

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

  const validateLoginData = () => {
    if (!loginData.credential.data) {
      message.error("Email or Username is required");
      return false;
    }
    if (!loginData.password) {
      message.error("Password is required");
      return false;
    }
    return true;
  };

  const handleLogin = () => {
    if (validateLoginData()) {
      login(loginData.credential.data, loginData.password);
    }
  };

  const displayErrorMessage = () => {
    if (auth.error) {
      message.error(auth.error);
      dispatch({ type: "CLEAR_ERROR" });
    }
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
            placeholder={
              loginData.credential.type === "email" ? "Email" : "Username"
            }
            value={loginData.credential.data}
            onChange={handleChangeCredential}
            className="input"
            type={"text"}
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
            addonBeforeWidth={25}
            addonBefore={<>Password</>}
            placeholder="Password"
            onChange={handleChangePassword}
          />
        </Space.Compact>
      </PasswordComponent>
      <ButtonComponent>
        <ForgetpasswordCompoent>forget password</ForgetpasswordCompoent>
        <LoginButtonComponent>
          <Button onClick={handleLogin} loading={auth.loading}>
            Login
          </Button>
        </LoginButtonComponent>
      </ButtonComponent>
      {displayErrorMessage()}
    </LoginComponent>
  );
};

export default LoginPage;
