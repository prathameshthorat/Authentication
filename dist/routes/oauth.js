"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Oauth = /** @class */ (function () {
    function Oauth() {
        this.router = express.Router();
        this.init();
    }
    Oauth.prototype.init = function () {
        this.router.get('/authorize', oauthController.authorize);
    };
    return Oauth;
}());
