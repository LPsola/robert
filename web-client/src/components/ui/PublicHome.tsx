import React from "react";
import {Link} from "@reach/router";
import {makeStyles} from "@material-ui/core/styles";
import {size} from "../../helpers/styling/sizes";
import robert from "../../assets/Robert_freetime.png";
import maria from "../../assets/Maria.png";
import all from "../../assets/all.png";
import {Button, Card, CardActions, CardHeader} from "@material-ui/core";
// @ts-ignore
import {UserRole} from "../../models/userRole";

const useStyles = makeStyles(() => ({
  header: {
    height: size(5.5),
    textAlign: "center",
    backgroundColor: "#94CBEA",
  },
  logo: {
    width: "50%",
    height: "auto",
  },
  card: {
    width: size(6),
    padding: size(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  persona: {
    height: size(4),
  },
  body: {
    display: "flex",
    justifyContent: "space-evenly",
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
  action: {
    backgroundColor: "#94CBEA",
    color: "white",
  },
}));

const PublicHome: React.FC = () => {
  const classes = useStyles();
  return (
    <div>
        <div className={classes.body}>
          <Card className={classes.card}>
            <CardHeader title="Je veux aider" />
            <img className={classes.persona} src={robert} alt="" />
            <CardActions>
              <Button
                className={classes.action}
                variant="contained"
                color="primary"
              >
                <Link
                  to="/signup"
                  state={{ role: UserRole.CARE_GIVER }}
                  className={classes.link}
                >
                  J'y vais
                </Link>
              </Button>
            </CardActions>
          </Card>

          <Card className={classes.card}>
            <CardHeader title="J'ai besoin d'aide" />
            <img className={classes.persona} src={all} alt="" />
            <CardActions>
              <Button
                className={classes.action}
                variant="contained"
                color="primary"
              >
                <Link
                  to="/signup"
                  state={{ role: UserRole.CARE_RECEIVER }}
                  className={classes.link}
                >
                  C'est parti
                </Link>
              </Button>
            </CardActions>
          </Card>
        </div>
    </div>
  );
};

export default PublicHome;
