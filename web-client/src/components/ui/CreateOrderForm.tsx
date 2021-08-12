import { RouteComponentProps, useNavigate } from "@reach/router";
import React, { useState } from "react";
import Fab from "@material-ui/core/Fab";
import PhoneIcon from "@material-ui/icons/Phone";
import { makeStyles } from "@material-ui/core/styles";
import ComputerIcon from "@material-ui/icons/Computer";
import { size } from "../../helpers/styling/sizes";
import { PreferredOrderMethod } from "../../models/preferredOrderMethod";
import MicIcon from "@material-ui/icons/Mic";
import CreateIcon from "@material-ui/icons/Create";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import { Button, TextField } from "@material-ui/core";
import OrderService from "../../services/order";
import { Order } from "../../models/order";
import { OrderStatus } from "../../models/orderStatus";

interface CreateOrderFormProps extends RouteComponentProps {}

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  fabButtons: {
    marginTop: size(2),
    display: "flex",
    justifyContent: "space-evenly",
  },
  field: {
    width: "100%",
  },
  action: {
    marginTop: size(0.5),
    backgroundColor: "#94CBEA",
    color: "white",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: size(7),
    justifyContent: "space-evenly",
  },
}));
const CreateOrderForm: React.FC<CreateOrderFormProps> = () => {
  const classes = useStyles();
  const routerNavigate = useNavigate();
  const orderService = new OrderService();
  const orderFormInit = {
    preferredMethod: "",
    status: "",
    ingredientList: "",
    groceryListImage: "",
    recording: "",
    receiptImage: "",
    deliveryDate: "",
    deliveryTime: "",
    carerId: "",
    receiverId: "",
    additionalComments: "",
  };
  const [orderForm, setOrderForm] = useState(orderFormInit);
  const [preferredOrderMethod, setPreferredOrderMethod] = useState("");
  //will be changed afterwards with enum just for demo
  const [preferredOption, setPreferredOption] = useState(false);
  console.log("state init", orderForm.preferredMethod);

  return (
    <div>
      {preferredOrderMethod ? (
        preferredOption ? (
          <form className={classes.form} onSubmit={(e) => handleFormSubmit(e)}>
            <TextField
              className={classes.field}
              required
              label="Eléments à acheter"
              name="ingredientList"
              value={orderForm.ingredientList}
              variant="filled"
              onChange={handleFormValueChange}
            />

            <Button
              className={classes.action}
              type="submit"
              variant="contained"
              color="primary"
            >
              Créer la commande
            </Button>
          </form>
        ) : (
          <div className={classes.fabButtons}>
            <Fab variant="extended">
              <CameraAltIcon className={classes.extendedIcon} />
              Prendre une photo de ma commande
            </Fab>

            <Fab variant="extended">
              <MicIcon className={classes.extendedIcon} />
              Dicter ma commande
            </Fab>
            <Fab
              variant="extended"
              color="primary"
              onClick={(e) => setPreferredOpt(true)}
            >
              <CreateIcon className={classes.extendedIcon} />
              Saisir ma commande par écrit
            </Fab>
          </div>
        )
      ) : (
        <div className={classes.fabButtons}>
          <Fab
            variant="extended"
            onClick={(e) => setPreferredMethod(PreferredOrderMethod.CALL)}
          >
            <PhoneIcon className={classes.extendedIcon} />
            Passer commande par téléphone
          </Fab>

          <Fab
            variant="extended"
            onClick={(e) => setPreferredMethod(PreferredOrderMethod.APP)}
            color="primary"
          >
            <ComputerIcon className={classes.extendedIcon} />
            Passer commande en ligne
          </Fab>
        </div>
      )}
    </div>
  );

  function setPreferredMethod(preferredMethod: PreferredOrderMethod) {
    if (preferredMethod === PreferredOrderMethod.CALL) {
      routerNavigate("/");
    } else {
      setPreferredOrderMethod(preferredMethod);
    }
  }

  function setPreferredOpt(preferredOption: boolean) {
    setPreferredOption(true);
  }

  function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    orderService.create(
      new Order({
        preferredMethod: PreferredOrderMethod.APP,
        status: OrderStatus.OPEN,
        ingredientList: [orderForm.ingredientList],
      })
    );
    routerNavigate('/')
    setOrderForm(orderForm);
  }

  function handleFormValueChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setOrderForm({ ...orderForm, [name]: value });
  }
};

export default CreateOrderForm;
