import React, {useState} from "react";
import {RouteComponentProps} from "@reach/router";
import {makeStyles} from "@material-ui/core/styles";
import {User} from "../../models";
import {Address} from "../../models/address";
import {size} from "../../helpers/styling/sizes";

interface CreateOrderProps extends RouteComponentProps {
  user: User;
}

const useStyles = makeStyles((theme) => ({
  header: {
    marginBottom: size(1),
  },
}));

const CreateOrder: React.FC<CreateOrderProps> = ({ user, location }) => {
  const classes = useStyles();
  // @ts-ignore
  const careReceiver = location && location.state
  const [address, setAddress] = useState(new Address(user.address));
  const isAdressCompleted =
    address.streetNumber && address.street && address.country && address.city;
  console.log('receiver', careReceiver);
  return <div>BLAHBLOY</div>;
};

export default CreateOrder;
