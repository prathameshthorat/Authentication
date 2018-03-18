import * as express from 'express';
import * as mongoose from 'mongoose';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';


import oauthRouter from "./routes/oauth";


class App {
	
	public express: express.Application;

	constructor() {
		this.express = express();
		this.launchConf();
		this.middleware();
		this.routes();
	}

	private middleware(): void {
		this.express.set("port", process.env.PORT || 3000);
		this.express.use(compression());
    	this.express.use(logger("dev"));
    	this.express.use(bodyParser.json());
    	this.express.use(bodyParser.urlencoded({ extended: true }));
    	this.express.use((req, res, next) => {
      		res.locals.user = req.user;
      		next();
    	});
	}

	private launchConf() : void {
    	//mongoose.Promise = global.Promise;
    	mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/CRMdb');
    	console.log("here");

    	mongoose.connection.on("error", () => {
      		// tslint:disable-next-line:no-console
      		console.log("MongoDB connection error. Please make sure MongoDB is running.");
      		process.exit();
    	});

    	/**
     	* Start Express server.
     	*/
    	this.express.listen(this.express.get("port"), () => {
      		// tslint:disable-next-line:no-console
      		console.log(("  App is running at http://localhost:%d \ in %s mode"), this.express.get("port"), this.express.get("env"));
      		// tslint:disable-next-line:no-console
      		console.log("  Press CTRL-C to stop\n");
    	});
  	}

  	private routes() : void {
  		this.express.use("/auth", oauthRouter);	
  	} 

}
export default new App().express;