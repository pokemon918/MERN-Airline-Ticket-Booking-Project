export function filterByClassType(flights, classType) {
  if (classType !== "All") {
    return flights.filter(
      (flight) => flight.flightClass.toLowerCase() === classType.toLowerCase()
    );
  } else {
    return flights;
  }
}
