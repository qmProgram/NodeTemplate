'use strict';

module.exports = {
	db: 'mongodb://localhost:27017/social',
	port: 3001,
	app: {
		name: 'FindPro - Test',
	},
	facebook: {
		clientID: 'APP_ID',
		clientSecret: 'APP_SECRET',
		callbackURL: 'http://localhost:3000/auth/facebook/callback',
	},
	twitter: {
		clientID: 'CONSUMER_KEY',
		clientSecret: 'CONSUMER_SECRET',
		callbackURL: 'http://localhost:3000/auth/twitter/callback',
	},
	github: {
		clientID: 'APP_ID',
		clientSecret: 'APP_SECRET',
		callbackURL: 'http://localhost:3000/auth/github/callback',
	},
	google: {
		clientID: 'APP_ID',
		clientSecret: 'APP_SECRET',
		callbackURL: 'http://localhost:3000/auth/google/callback',
	},
	cert: {
		keyPath: './cert/www_med-healthcare_com.pem',
		certPath: './cert/www_med-healthcare_com.crt',
		passphrase: 'findpro',
	},
};
