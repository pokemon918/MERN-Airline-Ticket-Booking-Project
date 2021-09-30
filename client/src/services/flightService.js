import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/flights";

export function getFlights() {
  return http.get(apiEndpoint + "/");
}

export function deleteFlight(flightId) {
  return http.delete(apiEndpoint + "/" + flightId);
}

export function getFlight(flightId) {
  return http.get(apiEndpoint + "/" + flightId);
}

export function editFlight(body) {
  if (body.id !== "new") {
    const flightData = { ...body };
    delete flightData.id;
    return http.put(apiEndpoint + "/" + body.id, flightData);
  } else {
    return http.post(apiEndpoint + "/", body);
  }
}
