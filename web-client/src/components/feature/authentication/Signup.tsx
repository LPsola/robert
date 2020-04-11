import React, {useState} from "react";
import {RouteComponentProps, useNavigate} from "@reach/router";
import {User} from "../../../models";
import AuthService from "../../../services/authentication";
import {makeStyles} from "@material-ui/core/styles";
import {size} from "../../../helpers/styling/sizes";
import {Button, Card, CardHeader, TextField} from "@material-ui/core";

interface SignupProps extends RouteComponentProps {
  setSignedUpUser: (user: User) => void;
}

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    paddingLeft: size(2),
    paddingRight: size(2),
    marginLeft: size(4),
    marginRight: size(4),
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: size(8),
    justifyContent: 'space-evenly'
  },
  field: {
    width: "100%",

  },
  action: {
    marginTop: size(1),
    backgroundColor: "#94CBEA",
    color: "white",
  },
  header: {
    textAlign: 'center',
  }
}));

const SignUp: React.FC<SignupProps> = ({ setSignedUpUser, location }) => {
  const authService = new AuthService();
  const routerNavigate = useNavigate();
  const userFormInit = {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  };
  const [userForm, setUserForm] = useState(userFormInit);
  const classes = useStyles()
  // @ts-ignore
  const role = location && location.state && location.state.role;

  return (
      <Card className={classes.container}>
        <CardHeader className={classes.header} title="Créer un compte" />
        <form className={classes.form} onSubmit={(e) => handleFormSubmit(e)}>
          <TextField
              className={classes.field}
              required
              label="Prénom"
              name="firstName"
              value={userForm.firstName}
              variant="filled"
              onChange={handleFormValueChange}
          />
          <TextField
              className={classes.field}
              required
              label="Nom"
              name="lastName"
              value={userForm.lastName}
              variant="filled"
              onChange={handleFormValueChange}
          />
          <TextField
              className={classes.field}
              required
              label="e-mail"
              name="email"
              type="email"
              value={userForm.email}
              variant="filled"
              onChange={handleFormValueChange}
          />
          <TextField
              className={classes.field}
              required
              label="Pseudo"
              name="username"
              value={userForm.username}
              variant="filled"
              onChange={handleFormValueChange}
          />
          <TextField
              className={classes.field}
              label="Mot de passe"
              type="password"
              name="password"
              autoComplete="current-password"
              variant="filled"
              onChange={handleFormValueChange}
          />
          <Button
              className={classes.action}
              color="primary"
              variant="contained"
              type="submit"
          >
            Créer
          </Button>
        </form>
      </Card>
  );

  function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const newUser = new User({
      username: userForm.username,
      password: userForm.password,
      firstName: userForm.firstName,
      lastName: userForm.lastName,
      email: userForm.email,
      role: role
    });
    signUp(newUser);
    setUserForm(userFormInit);
  }

  function handleFormValueChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setUserForm({ ...userForm, [name]: value });
  }

  function signUp(user: User) {
    authService.signup(user).then((response) => {
      setSignedUpUser(response);
      routerNavigate("/");
    });
  }
};

export default SignUp;
