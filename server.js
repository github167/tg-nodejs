const TOKEN = process.env.TELEGRAM_TOKEN || 'YOUR_TELEGRAM_BOT_TOKEN';
const url = 'https://'+process.env.PROJECT_NAME+".glitch.me";
const port = process.env.PORT;

const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// No need to pass any parameters as we will handle the updates with Express
const bot = new TelegramBot(TOKEN);

// This informs the Telegram servers of the new webhook.
bot.setWebHook(`${url}/bot${TOKEN}`);

const app = express();

// parse the updates to JSON
app.use(bodyParser.json());

// Render the HTML game
app.get('/', function requestListener(req, res) {
  res.sendFile(path.join(__dirname, 'game.html'));
});


// We are receiving updates at the route below!
app.post(`/bot${TOKEN}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// Start Express Server
app.listen(port, () => {
  console.log(`Express server is listening on ${port}`);
});

// Just to ping!
/*
bot.on('message', msg => {
  var message = msg.text+''
  bot.sendMessage(msg.chat.id, '<i>Generic echo:</i> '+ message, {parse_mode : "HTML"});
  bot.sendLocation(msg.chat.id,22.2958231,114.1712396);
  var bye = "bye";
  if (message.toLowerCase().includes(bye)) {
    bot.sendMessage(msg.chat.id, "Have a nice day " + msg.from.first_name); 
  }
});
*/

// random pic
bot.onText(/\/sendpic/, (msg) => {
	bot.sendPhoto(msg.chat.id,"https://source.unsplash.com/random" );   
});

// help
bot.onText(/\/start/, (msg) => {
	bot.sendMessage(msg.chat.id, '/start\n/sendpic\nbye\nany message');  
});

// Matches /start
bot.onText(/\/sxyz/, function onPhotoText(msg) {
  bot.sendGame(msg.chat.id, "aaa");
});
