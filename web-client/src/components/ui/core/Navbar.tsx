import React, {Fragment} from "react";
import {Link, RouteComponentProps} from "@reach/router";
import AuthService from "../../../services/authentication";
import {User} from "../../../models";
import {AppBar, Button, IconButton, Toolbar, Typography,} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import {makeStyles} from "@material-ui/core/styles";

interface NavbarProps extends RouteComponentProps {
  username: string;
  setUser: (user: User) => void;
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    textAlign: 'center',
    flexGrow: 1,
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
}));

const NavBar: React.FC<NavbarProps> = ({ username, setUser }) => {
  const authService = new AuthService();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" className={classes.title}>
            <Link to="/" className={classes.link}>
              Robert
            </Link>
          </Typography>
          {username ? (
            <Fragment>
              <Button onClick={logout} color="inherit">Logout</Button>
            </Fragment>
          ) : (
            <Fragment>
              <Button color="inherit">
                <Link to="/login" className={classes.link}>
                  Login
                </Link>
              </Button>
              <Button color="inherit">
                <Link to="/signup" className={classes.link}>
                  Sign up
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
