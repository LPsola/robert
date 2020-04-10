import React, {useEffect, useState} from "react";
import {Router} from "@reach/router";
import SignUp from "./components/feature/authentication/Signup";
import {User} from "./models";
import NavBar from "./components/ui/core/Navbar";
import AuthService from "./services/authentication";
import Login from "./components/feature/authentication/Login";
import MainContentWrapper from "./components/ui/core/MainContentWrapper";
import {makeStyles} from "@material-ui/core/styles";

// Hook
function useWindowSize() {
  const isClient = typeof window === 'object';

  function getSize() {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined
    };
  }

  const [windowSize, setWindowSize] = useState(getSize);

  // @ts-ignore
  useEffect(() => {
    if (!isClient) {
      return false;
    }

    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return windowSize;
}

const useStyles = makeStyles(() => ({
  root: {
    height: useWindowSize().height,
    width: useWindowSize().width,
    backgroundColor: '#edebe6'
  },
}));

function App() {
  const [loggedUser, setLoggedUser] = useState(new User());
  const authService = new AuthService();
  const size = useWindowSize();
  const classes = useStyles()

  useEffect(() => {
    getLoggedUser();
  });

  return (
    <div className={classes.root}>
      <NavBar setUser={setUser} username={loggedUser.username} />
      <MainContentWrapper>
        <Router>
          <SignUp path="/signup" setSignedUpUser={setUser} />
          <Login path="/login" setLoggedInUser={setUser} />
        </Router>
      </MainContentWrapper>
    </div>
  );

  function getLoggedUser() {
    if (loggedUser.id === undefined) {
      authService
        .getLoggedUser()
        .then((response) => {
          setLoggedUser(response);
        })
        .catch((err) => {
          setLoggedUser(new User({ id: "" }));
        });
    }
  }

  function setUser(user: User) {
    setLoggedUser(user);
  }
}

export default App;
