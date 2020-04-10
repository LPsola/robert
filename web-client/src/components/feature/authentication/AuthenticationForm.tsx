import React, {useState} from "react";
import {Link, RouteComponentProps} from "@reach/router";
import {makeStyles} from "@material-ui/core/styles";
import {Button, TextField} from "@material-ui/core";
import {size} from "../../../helpers/styling/sizes";

interface AuthenticationFormProps extends RouteComponentProps {
  action: (username: string, password: string) => void;
  callToAction: string;
  secondaryActionLabel: string;
  secondaryActionLink: string;
  secondaryActionQuestion: string;
}

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    marginLeft: size(4),
    marginRight: size(4),
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  field: {
    width: "100%",
  },
}));

const AuthenticationForm: React.FC<AuthenticationFormProps> = ({
  action,
  callToAction,
  secondaryActionLabel,
  secondaryActionLink,
  secondaryActionQuestion,
}) => {
  const userFormInit = { username: "", password: "" };
  const [userForm, setUserForm] = useState(userFormInit);
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <form className={classes.form} onSubmit={(e) => handleFormSubmit(e)}>
        <TextField
          className={classes.field}
          required
          id="standard-required"
          label="Username"
          name="username"
          value={userForm.username}
          onChange={handleFormValueChange}
        />
        <TextField
          className={classes.field}
          id="standard-password-input"
          label="Password"
          type="password"
          name="password"
          autoComplete="current-password"
          onChange={handleFormValueChange}
        />

        <Button type="submit">{callToAction}</Button>
      </form>
      <div>
        <span>{secondaryActionQuestion}</span>
        <Link to={secondaryActionLink}>{secondaryActionLabel}</Link>
      </div>
    </div>
  );

  function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const username = userForm.username;
    const password = userForm.password;
    action(username, password);
    setUserForm(userFormInit);
  }

  function handleFormValueChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setUserForm({ ...userForm, [name]: value });
  }
};

export default AuthenticationForm;
