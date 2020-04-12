import React, {useState} from "react";
import AuthService from "../../../services/authentication";
import {RouteComponentProps, useNavigate} from "@reach/router";
import {User} from "../../../models";
import {makeStyles} from "@material-ui/core/styles";
import {size} from "../../../helpers/styling/sizes";
import {Button, Card, CardHeader, TextField} from "@material-ui/core";

interface LoginProps extends RouteComponentProps {
  setLoggedInUser: (user: User) => void;
}

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    paddingTop: size(1),
    paddingBottom: size(1),
    paddingLeft: size(2),
    paddingRight: size(2),
    marginLeft: size(4),
    marginRight: size(4),
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: size(4),
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
    textAlign: 'center'
  }
}));
const Login: React.FC<LoginProps> = ({ setLoggedInUser }) => {
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
  const classes = useStyles();

  return (
    <Card className={classes.container}>
      <CardHeader className={classes.header} title="Connexion" />
      <form className={classes.form} onSubmit={(e) => handleFormSubmit(e)}>
        <TextField
          className={classes.field}
          required
          label="Username"
          name="username"
          variant="filled"
          value={userForm.username}
          onChange={handleFormValueChange}
        />
        <TextField
          className={classes.field}
          label="Password"
          type="password"
          name="password"
          variant="filled"
          autoComplete="current-password"
          onChange={handleFormValueChange}
        />

        <Button
          className={classes.action}
          type="submit"
          variant="contained"
          color="primary"
        >
          Se connecter
        </Button>
      </form>
    </Card>
  );

  function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const username = userForm.username;
    const password = userForm.password;
    login(username, password);
    setUserForm(userFormInit);
  }

  function handleFormValueChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setUserForm({ ...userForm, [name]: value });
  }

  function login(username: string, password: string) {
    authService.login(username, password).then((response) => {
      setLoggedInUser(response);
      routerNavigate("/");
    });
  }
};

export default Login;
