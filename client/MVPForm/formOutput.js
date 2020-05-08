const userFormOutput = (user) => {

  const { departureDate, departureLocation, departureTime, isAdmin, isDriver, name, seats } = user;

  const localeDepartureTime = departureTime.toLocaleTimeString();
  const [hours, minutes, seconds] = localeDepartureTime.split(':');

  const reshapedDate = new Date(departureDate);
  reshapedDate.setHours(hours);
  reshapedDate.setMinutes(minutes);
  reshapedDate.setSeconds(seconds);

  const departureTimestamp = reshapedDate.getTime();

  const seatsAvailable = seats ? parseInt(seats) : 0;

  return {
    departureTimestamp,
    departureLocation,
    isAdmin,
    isDriver,
    name,
    seats: seatsAvailable,
  };
};

export default userFormOutput;