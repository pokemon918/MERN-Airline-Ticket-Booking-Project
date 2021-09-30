export function filterByRoutes(flights, source, destination) {
  if (source !== "All" && destination === "All") {
    return flights.filter(
      (flight) => flight.source.toLowerCase() === source.toLowerCase()
    );
  } else if (source === "All" && destination !== "All") {
    return flights.filter(
      (flight) => flight.destination.toLowerCase() === destination.toLowerCase()
    );
  } else if (source !== "All" && destination !== "All") {
    return flights.filter(
      (flight) =>
        flight.source.toLowerCase() === source.toLowerCase() &&
        flight.destination.toLowerCase() === destination.toLowerCase()
    );
  } else if (source === "All" && destination === "All") {
    return flights;
  }
}
