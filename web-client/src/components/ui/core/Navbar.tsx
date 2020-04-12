import React, {Fragment} from "react";
import {Link, RouteComponentProps} from "@reach/router";
import AuthService from "../../../services/authentication";
import {User} from "../../../models";
import {AppBar, Button, IconButton, Toolbar, Typography,} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import logo from "../../../assets/logo.png";
import {size} from "../../../helpers/styling/sizes";

interface NavbarProps extends RouteComponentProps {
  username: string;
  setUser: (user: User) => void;
}

const useStyles = makeStyles((theme) => ({
  navBar: {
    backgroundColor: "#94CBEA",
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    textAlign: "center",
    flexGrow: 1,
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
  logo: {
    marginLeft: '10px',
    width: "100%",
    height: "100%",
  },
  logoWrapper: {
    width: size(2),
    height: "auto",
  },
  logoButton: {
    padding: 0,
    borderRadius: 0,
  },
}));

const NavBar: React.FC<NavbarProps> = ({ username, setUser }) => {
  const authService = new AuthService();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar className={classes.navBar} position="static">
        <Toolbar>
          <IconButton className={classes.logoButton} edge="start">
            <div className={classes.logoWrapper}>
              <Link to="/">
                <img className={classes.logo} src={logo} alt=""/>
              </Link>
            </div>
          </IconButton>
          <Typography variant="h5" className={classes.title}></Typography>
          {username ? (
            <Fragment>
              <Button onClick={logout} color="inherit">
                Déconnexion
              </Button>
            </Fragment>
          ) : (
            <Fragment>
              <Button color="inherit">
                <Link to="/login" className={classes.link}>
                  Se connecter
                </Link>
              </Button>
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );

  function logout() {
    authService.logout().then(() => setUser(new User({ id: "" })));
  }
};

export default NavBar;
