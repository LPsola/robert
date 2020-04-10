import React from "react";
import AuthService from "../../../services/authentication";
import {RouteComponentProps, useNavigate} from "@reach/router";
import {User} from "../../../models";
import AuthenticationForm from "./AuthenticationForm";

interface LoginProps extends RouteComponentProps {
  setLoggedInUser: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ setLoggedInUser }) => {
  const authService = new AuthService();
  const routerNavigate = useNavigate();

  return (
    <div>
      <AuthenticationForm
        action={login}
        callToAction="Login"
        secondaryActionLabel="Sign up"
        secondaryActionLink="/signup"
        secondaryActionQuestion="Don't have an account yet? "
      />
    </div>
  );

  function login(username: string, password: string) {
    authService.login(username, password).then((response) => {
      setLoggedInUser(response);
      routerNavigate("/");
    });
  }
};

export default Login;
