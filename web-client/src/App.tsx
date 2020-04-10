import React, {useEffect, useState} from "react";
import {Router} from "@reach/router";
import SignUp from "./components/feature/authentication/Signup";
import {User} from "./models";
import NavBar from "./components/ui/core/Navbar";
import AuthService from "./services/authentication";
import Login from "./components/feature/authentication/Login";
import MainContentWrapper from "./components/ui/core/MainContentWrapper";

function App() {
  const [loggedUser, setLoggedUser] = useState(new User());
  const authService = new AuthService();

  useEffect(() => {
    getLoggedUser();
  });

  return (
    <div className="App">
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
