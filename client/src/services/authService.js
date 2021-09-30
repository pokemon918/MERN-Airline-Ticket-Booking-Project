import http from "./httpService";
import { apiUrl } from "../config.json";
import jwt_decode from "jwt-decode";

const apiEndpoint = apiUrl + "/auth";

export async function login(email, password) {
  const { data: jwt } = await http.post(apiEndpoint, { email, password });
  localStorage.setItem("token", jwt);
}

export function logout() {
  localStorage.removeItem("token");
}

export function loginWithJwt(jwt) {
  localStorage.removeItem("token", jwt);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem("token");
    return jwt_decode(jwt);
  } catch (ex) {
    return null;
  }
}

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
};
