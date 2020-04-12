import React, {useEffect, useState} from "react";
import {RouteComponentProps} from "@reach/router";
import {makeStyles} from "@material-ui/core/styles";
import {User} from "../../models";
import {Address} from "../../models/address";
import {size} from "../../helpers/styling/sizes";
import {CareReceiver} from "../../models/careReceiver";
import {Button, Card, TextField, Typography,} from "@material-ui/core";
import AuthService from "../../services/authentication";

interface CreateOrderProps extends RouteComponentProps {
  user: User;
}

const useStyles = makeStyles((theme) => ({
  header: {
    marginTop: size(1),
    textAlign: 'justify'
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: size(7),
    justifyContent: "space-evenly",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    paddingLeft: size(2),
    paddingRight: size(2),
    marginLeft: size(4),
    marginRight: size(4),
  },
  field: {
    width: "100%",
  },
  action: {
    marginTop: size(0.5),
    backgroundColor: "#94CBEA",
    color: "white",
  },
}));

const CreateOrder: React.FC<CreateOrderProps> = ({ user, location }) => {
  const classes = useStyles();
  const addressFormInit = {
    city: "",
    street: "",
    areaCode: "",
    country: "",
  };
  const [addressForm, setAddressForm] = useState(addressFormInit);
  const careReceiver = location && (location.state as CareReceiver);
  const [address, setAddress] = useState(new Address(user.address));
  const isAdressCompleted =
    address?.street && address?.country && address?.city && address.areaCode;
  const authService = new AuthService();

  useEffect(() => {
    if (user.address) {
      setAddress(user.address);
    }
  });

  return (
    <div>
      {careReceiver?.orders?.length ? (
        <div>Has orders</div>
      ) : (
        <div>
          {isAdressCompleted ? (
            <div>address</div>
          ) : (
            <div>
              <Card className={classes.container}>
                <Typography className={classes.header} variant="subtitle1">
                  Afin d'honorer cette première commande, nous avons besoin de
                  votre addresse pour que nos Roberts proche de chez vous
                  puissent la prendre en charge.
                </Typography>

                <form
                  className={classes.form}
                  onSubmit={(e) => handleFormSubmit(e)}
                >
                  <TextField
                    className={classes.field}
                    required
                    label="Rue"
                    name="street"
                    value={addressForm.street}
                    variant="filled"
                    onChange={handleFormValueChange}
                  />
                  <TextField
                    className={classes.field}
                    label="Ville"
                    name="city"
                    value={addressForm.city}
                    variant="filled"
                    onChange={handleFormValueChange}
                  />
                  <TextField
                    className={classes.field}
                    label="Code postal"
                    name="areaCode"
                    value={addressForm.areaCode}
                    variant="filled"
                    onChange={handleFormValueChange}
                  />
                  <TextField
                    className={classes.field}
                    label="Pays"
                    name="country"
                    value={addressForm.country}
                    variant="filled"
                    onChange={handleFormValueChange}
                  />

                  <Button
                    className={classes.action}
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Enregistrer
                  </Button>
                </form>
              </Card>
            </div>
          )}
        </div>
      )}
    </div>
  );

  function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    authService
      .confirmAddress(user.id, new Address(addressForm))
      .then((response) => {
        setAddress(response);
      });
    setAddressForm(addressFormInit);
  }

  function handleFormValueChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setAddressForm({ ...addressForm, [name]: value });
  }
};

export default CreateOrder;
