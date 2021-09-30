import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/users";

export function register(user) {
  return http.post(apiEndpoint, {
    name: user.name,
    email: user.email,
    password: user.password,
  });
}

export function getUsers() {
  return http.get(apiEndpoint + "/");
}

export function updateUser(userId, body) {
  return http.put(apiEndpoint + "/" + userId, body);
}

export function deleteUser(userId) {
  return http.delete(apiEndpoint + "/" + userId);
}
