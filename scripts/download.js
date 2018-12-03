const Timeline = require('../lib/timeline');

const run = async () => {
  console.log('Starting timeline download.');
  await Timeline.downloadTimeline('twittels');
  console.log('Finished downloading timeline.');
};

run();
