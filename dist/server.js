"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var mongoose = require("mongoose");
var logger = require("morgan");
var bodyParser = require("body-parser");
var compression = require("compression");
var oauth_1 = require("./routes/oauth");
var App = /** @class */ (function () {
    function App() {
        this.express = express();
        this.launchConf();
        this.middleware();
        this.routes();
    }
    App.prototype.middleware = function () {
        this.express.set("port", process.env.PORT || 3000);
        this.express.use(compression());
        this.express.use(logger("dev"));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: true }));
        this.express.use(function (req, res, next) {
            res.locals.user = req.user;
            next();
        });
    };
    App.prototype.launchConf = function () {
        var _this = this;
        //mongoose.Promise = global.Promise;
        mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/CRMdb');
        console.log("here");
        mongoose.connection.on("error", function () {
            // tslint:disable-next-line:no-console
            console.log("MongoDB connection error. Please make sure MongoDB is running.");
            process.exit();
        });
        /**
        * Start Express server.
        */
        this.express.listen(this.express.get("port"), function () {
            // tslint:disable-next-line:no-console
            console.log(("  App is running at http://localhost:%d \ in %s mode"), _this.express.get("port"), _this.express.get("env"));
            // tslint:disable-next-line:no-console
            console.log("  Press CTRL-C to stop\n");
        });
    };
    App.prototype.routes = function () {
        this.express.use("/auth", oauth_1.default);
    };
    return App;
}());
exports.default = new App().express;
