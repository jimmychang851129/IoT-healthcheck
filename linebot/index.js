const { LineBot } = require('bottender');
const { createServer } = require('bottender/express');
const { Line } = require('messaging-api-line');
const handler = require('./handler/handler.js');
require('dotenv').config()

const bot = new LineBot({
  channelSecret: process.env.Channel_secret,
  accessToken: process.env.Channel_token
});

// LISTEN TO ALL THE EVENT
bot.onEvent(handler);


// Create Server
const server = createServer(bot);

server.listen(process.env.PORT||3000, () => {
  console.log('server is running on 3000 port...');
});