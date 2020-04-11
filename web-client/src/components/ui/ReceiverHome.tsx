import React, {useEffect, useState} from "react";
import {Link, RouteComponentProps} from "@reach/router";
import {makeStyles} from "@material-ui/core/styles";
import {User} from "../../models";
import {Button, Typography} from "@material-ui/core";
import {size} from "../../helpers/styling/sizes";
import ReceiverService from "../../services/receiver";
import {CareReceiver} from "../../models/careReceiver";

interface ReceiverHomeProps extends RouteComponentProps {
  user: User;
}

const useStyles = makeStyles((theme) => ({
  header: {
    marginBottom: size(1),
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
}));

const ReceiverHome: React.FC<ReceiverHomeProps> = ({ user }) => {
  const classes = useStyles();
  const [careReceiver, setCareReceiver] = useState(new CareReceiver());
  const receiverService = new ReceiverService();

  useEffect(() => {
    fetchReceiver(user.careReceiverId);
  });

  return (
    <div>
      <div className={classes.header}>
        <Typography variant="h4">Bonjour {user.firstName} !</Typography>
        <Typography variant="subtitle1">
          Bienvenue sur votre page de commandes. Vous y trouverez vos commandes
          passées et la possibilité d'en créer de nouvelles
        </Typography>
      </div>
      <div>
        <Button variant="contained" color="primary">
          <Link className={classes.link} state={careReceiver} to="/create">
            Nouvelle commande
          </Link>
        </Button>
      </div>
    </div>
  );

  function fetchReceiver(receiverId: string) {
    if (!careReceiver._id) {
      receiverService
        .fetch(receiverId)
        .then((receiver) => setCareReceiver(receiver));
    }
  }
};

export default ReceiverHome;
