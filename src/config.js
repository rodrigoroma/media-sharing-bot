module.exports = {

	// Language
	"interface": {
		"buttons": {
			"like": "boa",
			"dislike": "fraca"
		}
	},

	//Mysql connection
	"mysql":{
		"host"			: 'localhost',
		"database"	: 'media_sharing_bot',
		"user"      : process.env.MEDIA_BOT_DB_USER,
		"password"  : process.env.MEDIA_BOT_DB_PASS,
	}

};
