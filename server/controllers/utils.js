module.exports.parseParticipants = function (participants) {
  return participants.map(user => {
    const participant_info = user.Participant;
    const seats = (participant_info.is_driver && user.car) ? user.car.seats : 0;
    delete user.Participant;
    delete user.car;
    return {
      ...user,
      departure_time: participant_info.departure_time,
      is_admin: participant_info.is_admin,
      is_driver: participant_info.is_driver,
      departure_location: {
        ...user.departure_location
      },
      seats
    };
  });
};