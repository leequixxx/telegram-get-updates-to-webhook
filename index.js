const axios                 = require('axios');
const nconf                 = require('nconf');
const { setIntervalAsync }  = require('set-interval-async/fixed');

const config = nconf.file({ file: 'config.json' });

let lastUpdateId = 0;

setIntervalAsync(async () => {
  const { data } = await axios.get(`https://api.telegram.org/bot${config.get('bot:token')}/getUpdates?offset=${lastUpdateId}`);
  data.result.forEach(async (update) => {
    lastUpdateId = update.update_id;
    lastUpdateId++;
    console.log(update.message.text);
    await axios.post(config.get('bot:webhook'), update);
  });
}, 1000);
