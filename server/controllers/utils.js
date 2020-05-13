module.exports.parseParticipants = function (participants) {
  return participants.map(user => {
    const participant_info = user.Participant;
    delete user.Participant;
    return {
      ...user,
      departure_time: participant_info.departure_time,
      is_admin: participant_info.is_admin,
      departure_location_id: participant_info.departure_location_id,
      car_id: participant_info.car_id,
      is_driver: participant_info.is_driver
    };
  });
};