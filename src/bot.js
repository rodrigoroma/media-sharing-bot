// Dependencies
var Config = require('./config.js');
var TelegramBot = require('node-telegram-bot-api');

// Initialization
var bot = new TelegramBot(Config.bot_token, {polling: true});

var photos = [
	'AgADAQAEqDEbi4ZlCEomqoBDhkt2TfTnLwAECg1ROYvdacGJswACAg',
	'AgADAQADAqgxG4uGZQivfhvdkL9sfYfy5y8ABClkY73KyMSLmbEAAgI',
	'AgADAQADA6gxG4uGZQiJc1GbEWP6r1Kb5y8ABFo9i5JSzD2jgkUBAAEC',
	'AgADAQADBKgxG4uGZQhV3itPHHoZy3LD5y8ABPVCDQdLcG6--UIBAAEC'
];

// User sent an image
bot.on('photo', function (msg) {
	console.log("-------- PHOTO ---------");
	console.log(msg);
});

// User sent an opinion
bot.onText(/(No|Yes)/, function (msg, match) {
  var chatId = msg.chat.id;
  
  console.log("------------------");
  console.log("User "+chatId+" answer: " + match[0]);
  console.log(msg);
  
  var opts = {
      reply_markup: JSON.stringify({
		one_time_keyboard: true,
	    resize_keyboard: true,
        keyboard: [
          ['No', 'Yes']
		]
      })
    };
	var r = Math.floor(Math.random() * photos.length);
	
    bot.sendPhoto(chatId, photos[r], opts);
});

