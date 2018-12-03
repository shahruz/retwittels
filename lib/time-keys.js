const { format } = require('date-fns');

module.exports.currentTimeKey = () => {
  const time = new Date().toLocaleString('en-US', {
    timeZone: 'America/Los_Angeles'
  });
  return format(time, 'MMDDHHmm');
};

module.exports.timeKeyForTime = date => format(new Date(date), 'MMDDHHmm');
