import { Button, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";
import { FCheckBox, FormProvider, FTextField } from "../form";
import useAuth from "../hooks/useAuth";

import { useForm } from "react-hook-form";
import Modal from "@mui/material/Modal";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const defaultValues = {
  username: "TriNguyen_FTW",
};
// const CustomForm = styled(FormProvider)`
//   background: #fff !important;
// `;

const LoginPage = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const LoginSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required")
  });

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  
  const { handleSubmit } = methods;

  const onSubmit = (data) => {
    // let from = location.state?.from?.pathname || "/";
    // let username = data.username;
    console.log(data)
    auth.setIsLogged(true)
    navigate("/");
    
  };
  const handleClose = () => {
    auth.setOpenLoginPage(false);
    navigate("/");
  };

  return (
    <Modal
      open={true}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      sx={{
        display: "flex",
        justifyContent: "center",
        zIndex: 999,
      }}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} sx={{ minWidth: "350px", width: "400px" }}>
          <Typography variant="h4" textAlign="center">
            Login
          </Typography>
          <FTextField name="username" label="Username" />
          <FTextField name="password" label="Password" />
          <FCheckBox name="remember" label="Remember me" />
          <Button type="submit" variant="contained">
            Login
          </Button>
        </Stack>
      </FormProvider>
    </Modal>
  );
};

export default LoginPage;
