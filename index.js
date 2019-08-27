const axios                 = require('axios');
const { setIntervalAsync }  = require('set-interval-async/fixed');

let lastUpdateId = 0;

setIntervalAsync(async () => {
  const { data } = await axios.get(`https://api.telegram.org/${process.env.BOT_TOKEN}/getUpdates?offset=${lastUpdateId}`);
  data.result.forEach(async (update) => {
    lastUpdateId = update.update_id;
    lastUpdateId++;
    console.log(update.message.text);
    await axios.post(process.env.BOT_WEBHOOK, update);
  });
}, 1000);