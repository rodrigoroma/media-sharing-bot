// Dependencies
var Config = require('./config.js');
var TelegramBot = require('node-telegram-bot-api');
var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : Config.mysql.host,
  user     : Config.mysql.user,
  password : Config.mysql.password,
  database : Config.mysql.database
});

// Initialization
var bot = new TelegramBot(process.env.MEDIA_BOT_TOKEN, {polling: true});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});

// User sent an image
bot.on('photo', function (msg) {
	console.log("-------- MEDIA RECEIVED ---------");
  console.log(msg);
	var media = { file_id: msg.photo[msg.photo.length-1].file_id };
	connection.query('INSERT INTO media SET ?', media, function(err,res){
	  if(err) throw err;
	  console.log('Last insert ID:', res.insertId);
	});

	bot.sendMessage(msg.chat.id, 'Your media was added to list.')
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

	connection.query('select file_id from media order by rand() limit 1', function(err, rows, fields) {
	  if (!err){
			console.log("------------------");
			console.log("Sending: " + rows[0].file_id);
			bot.sendPhoto(chatId, rows[0].file_id, opts);
		}
	  else
	    console.log('Error while performing Query.');
	  });

});
