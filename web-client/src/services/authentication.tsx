import axios, {AxiosInstance} from "axios";
import {User} from "../models";
import {Address} from "../models/address";

class AuthService {
  http: AxiosInstance;
  constructor() {
    this.http = axios.create({
      baseURL: "http://localhost:5000/api/auth",
      withCredentials: true,
    });
  }

  login(username: string, password: string): Promise<User> {
    return this.http
      .post("/login", { username, password })
      .then((response) => new User(response.data));
  }

  logout() {
    return this.http.post("/logout");
  }

  signup(user: User): Promise<User> {
    return this.http
      .post("/signup", { user })
      .then((response) => new User(response.data));
  }

  getLoggedUser(): Promise<User> {
    return this.http.get("/getLoggedUser").then((response) => {
      return new User(response.data);
    });
  }

  confirmAddress(userId: string, address: Address): Promise<Address> {
    return this.http
      .post("/confirm-address", { id: userId, address })
      .then((response) => {
        return new Address(response.data.address);
      });
  }
}

export default AuthService;
