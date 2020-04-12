import {PreferredOrderMethod} from "./preferredOrderMethod";
import {OrderStatus} from "./orderStatus";
import {Ingredient} from "./ingredient";

export class Order {
  preferredMethod: PreferredOrderMethod;
  status: OrderStatus;
  ingredientList: Ingredient[];
  groceryListImage: string;
  recording: string;
  receiptImage: string;
  deliveryDate: string;
  deliveryTime: string;
  carerId: string;
  receiverId: string;
  additionalComments: string;

  constructor(order?: Partial<Order>) {
    if (order) {
      this.preferredMethod = order.preferredMethod!;
      this.status = order.status!;
      this.ingredientList = order.ingredientList!;
      this.groceryListImage = order.groceryListImage!;
      this.recording = order.recording!;
      this.receiptImage = order.receiptImage!;
      this.deliveryDate = order.deliveryDate!;
      this.deliveryTime = order.deliveryTime!;
      this.carerId = order.carerId!;
      this.receiverId = order.receiverId!;
      this.additionalComments = order.additionalComments!;
    }
  }
}
