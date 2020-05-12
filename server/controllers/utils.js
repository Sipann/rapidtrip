module.exports.parseParticipants = function (participants) {
  return participants.map(user => {
    const participant_info = user.Participant;
    delete user.Participant;
    return {
      ...user,
      ...participant_info
    };
  });
};