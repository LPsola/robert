import React from "react";
import {RouteComponentProps, useNavigate} from "@reach/router";
import {User} from "../../../models";
import AuthService from "../../../services/authentication";
import AuthenticationForm from "./AuthenticationForm";

interface SignupProps extends RouteComponentProps {
  setSignedUpUser: (user: User) => void;
}

const SignUp: React.FC<SignupProps> = ({ setSignedUpUser }) => {
  const authService = new AuthService();
  const routerNavigate = useNavigate();

  return (
    <div>
      <AuthenticationForm
        action={signUp}
        callToAction="Signup"
        secondaryActionLabel="Log in"
        secondaryActionLink="/login"
        secondaryActionQuestion="Already have an account? "
      />
    </div>
  );

  function signUp(username: string, password: string) {
    authService.signup(username, password).then((response) => {
      setSignedUpUser(response);
      routerNavigate("/");
    });
  }
};

export default SignUp;
