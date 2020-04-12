import React from "react";
import {RouteComponentProps} from "@reach/router";
import {User} from "../../models";
import PublicHome from "./PublicHome";
// @ts-ignore
import {UserRole} from "../../models/userRole";
import ReceiverHome from "./ReceiverHome";

interface HomeProps extends RouteComponentProps {
  loggedUser: User;
}

const Home: React.FC<HomeProps> = ({ loggedUser }) => {
  return (
    <div>
      {loggedUser.id ? (
          loggedUser.role === UserRole.CARE_RECEIVER ?
              <ReceiverHome user={loggedUser} /> :
              <div>Giver</div>
      ) : (
        <PublicHome />
      )}
    </div>
  );
};

export default Home;
