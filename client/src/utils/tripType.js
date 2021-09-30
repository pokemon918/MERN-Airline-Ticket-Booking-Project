export function filterByTripType(flights, tripType) {
  if (tripType !== "All") {
    return flights.filter(
      (flight) => flight.tripType.toLowerCase() === tripType.toLowerCase()
    );
  } else {
    return flights;
  }
}
