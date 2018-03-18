import { NextFunction, Request, Response, Router } from "express";


class Oauth {
	public router : Router;

	public constructor(){
		this.router = express.Router();
		this.init();
	}

	private init() : void {
		this.router.get('/authorize', oauthController.authorize);
	}

}