import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/bookings";

export function getBookings() {
  return http.get(apiEndpoint + "/");
}

export function saveBooking(data) {
  return http.post(apiEndpoint + "/", data);
}

export function getBookingByUserId(userId) {
  return http.get(apiEndpoint + "/" + userId);
}
