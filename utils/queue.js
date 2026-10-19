function makeTicketNumber(n) {
  return 'Q' + String(n).padStart(3, '0');
}
function isValidQueueStatus(s) {
  return ['waiting', 'called', 'serving', 'completed', 'cancelled', 'no_show'].includes(s);
}
module.exports = { makeTicketNumber, isValidQueueStatus };
