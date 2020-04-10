import axios, {AxiosInstance} from "axios";
import {User} from "../models";

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

  signup(username: string, password: string): Promise<User> {
    return this.http
      .post("/signup", { username, password })
      .then((response) => new User(response.data));
  }

  getLoggedUser(): Promise<User> {
    return this.http.get("/getLoggedUser").then((response) => {
      return new User(response.data);
    });
  }
}

export default AuthService;
