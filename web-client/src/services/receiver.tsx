import axios, {AxiosInstance} from "axios";
import {CareReceiver} from "../models/careReceiver";

class ReceiverService {
  http: AxiosInstance;
  constructor() {
    this.http = axios.create({
      baseURL: "http://localhost:5000/api/receiver",
      withCredentials: true,
    });
  }

  fetch(receiverId: string): Promise<CareReceiver> {
    return this.http
      .get(`/${receiverId}`)
      .then((response) => new CareReceiver(response.data));
  }
}

export default ReceiverService;
