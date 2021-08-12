import axios, { AxiosInstance } from "axios";
import { CareReceiver } from "../models/careReceiver";
import { Order } from "../models/order";

class OrderService {
  http: AxiosInstance;
  constructor() {
    this.http = axios.create({
      baseURL: "http://localhost:5000/api/orders",
      withCredentials: true,
    });
  }

  create(order: Order): Promise<Order> {
    return this.http
      .post("/create", order)
      .then((response) => new Order(response.data));
  }
}

export default OrderService;
