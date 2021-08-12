import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "@reach/router";
import { makeStyles } from "@material-ui/core/styles";
import { User } from "../../models";
import { Address } from "../../models/address";
import { size } from "../../helpers/styling/sizes";
import { CareReceiver } from "../../models/careReceiver";
import { Button, Card, TextField, Typography } from "@material-ui/core";
import AuthService from "../../services/authentication";
import AddressForm from "./AddressForm";
import CreateOrderForm from "./CreateOrderForm";

interface CreateOrderProps extends RouteComponentProps {
  user: User;
}

const useStyles = makeStyles((theme) => ({}));

const CreateOrder: React.FC<CreateOrderProps> = ({ user, location }) => {
  const classes = useStyles();
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
            <CreateOrderForm />
          ) : (
            <div>
              <AddressForm user={user} confirmAddress={confirmAddress} />
            </div>
          )}
        </div>
      )}
    </div>
  );

  function confirmAddress(userId: string, address: Address) {
    authService.confirmAddress(user.id, address).then((response) => {
      setAddress(response);
    });
  }
};

export default CreateOrder;
