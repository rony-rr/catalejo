require("dotenv").config();

const { Keystone } = require("@keystonejs/keystone");
const { PasswordAuthStrategy } = require("@keystonejs/auth-password");
const { GraphQLApp } = require("@keystonejs/app-graphql");
const { AdminUIApp } = require("@keystonejs/app-admin-ui");
const { NextApp } = require("@keystonejs/app-next");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const { MongooseAdapter: Adapter } = require("@keystonejs/adapter-mongoose");
const initialiseData = require("./server/initial-data");
const multer = require("multer");
const bodyParser = require("body-parser");
const moment = require('moment-timezone');

moment().tz("America/Costa_Rica").format();

// custom server
const uploadFile = require("./services/customServer/uploadFile");
const createCSVFile = require("./services/customServer/createCSVFile");
const tryAldeamo = require("./services/customServer/tryAldeamo");
const { passwordReset } = require("./services/customServer/passwordReset");
const { verifyCodeReset } = require("./services/customServer/verifyCodeReset");

const isProd = process.env.NODE_ENV === "production";
const PROJECT_NAME = "Catalejo";
const adapterConfig = {
	mongoUri: process.env.MONGODB_URI,
	useNewUrlParser: true,
	useFindAndModify: false,
	useUnifiedTopology: true,
};

const sessionStore = new MongoStore({
	url: process.env.MONGODB_URI,
	autoReconnect: true,
	secret: process.env.SECRET,
	mongooseConnection: adapterConfig,
	autoRemove: "disabled",
});

const keystone = new Keystone({
	name: PROJECT_NAME,
	adapter: new Adapter(adapterConfig),
	onConnect: initialiseData,
	sessionStore: sessionStore,
	cookieSecret: process.env.COOKIE_SECRET,
	secureCookies: isProd,
});

//Schemas
require("./server/models")(keystone);

const authStrategy = keystone.createAuthStrategy({
	type: PasswordAuthStrategy,
	list: "User",
});

const upload = multer({
	storage: multer.diskStorage({
		destination: "./public/uploads",
		filename: (req, file, cb) => cb(null, file.originalname),
	}),
});

const keystoneMiddleware = (func) => {
	return (req, res) => {
		return func(req, res, keystone);
	};
};

module.exports = {
	keystone,
	apps: [
		new GraphQLApp(),
		new AdminUIApp({
			name: PROJECT_NAME,
			enableDefaultRoute: false,
			authStrategy,
			hooks: require.resolve("./server/admin/"),
		}),
		new NextApp({ dir: "app" }),
	],
	configureExpress: (app) => {
		app.post(
			"/api/reset-password",
			bodyParser.json(),
			keystoneMiddleware(passwordReset)
		);
		app.post(
			"/api/verify-code",
			bodyParser.json(),
			keystoneMiddleware(verifyCodeReset)
		);
		app.post("/api/create-csv", bodyParser.json(), createCSVFile);
		app.post("/api/process-csv", upload.single("csv"), uploadFile);
		if (isProd) {
			app.set("trust proxy", 1);
		} else {
			// available only in dev
			app.post("/api/try-aldeamo", bodyParser.json(), tryAldeamo);
		}
	},
};
