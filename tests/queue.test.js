const test = require('node:test'),
  assert = require('node:assert/strict'),
  { makeTicketNumber, isValidQueueStatus } = require('../utils/queue');
test('ticket number padding', () => {
  assert.equal(makeTicketNumber(1), 'Q001');
  assert.equal(makeTicketNumber(24), 'Q024');
});
test('valid statuses', () => {
  assert.equal(isValidQueueStatus('waiting'), true);
  assert.equal(isValidQueueStatus('bogus'), false);
});
