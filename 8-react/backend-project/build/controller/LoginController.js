"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginController = void 0;
// 在定义类或者类方法的时候，可以设置一些元数据，我们可以获取 到在类与类方法上添加的元数据，用的方法就是 Reflect Metadata。 元数据指的是描述东西时用的数据。
// https://www.cnblogs.com/studyWeb/p/13181067.html
require("reflect-metadata");
// import { controller, get,post } from './decorator';
var decorator_1 = require("../decorator");
var util_1 = require("../utils/util");
var LoginController = /** @class */ (function () {
    function LoginController() {
    }
    LoginController_1 = LoginController;
    LoginController.isLogin = function (req) {
        return !!(req.session ? req.session.login : false);
    };
    LoginController.prototype.isLogin = function (req, res) {
        //是否已经登陆过
        var isLogin = LoginController_1.isLogin(req);
        var result = (0, util_1.getResponseData)(isLogin);
        res.json(result);
    };
    LoginController.prototype.login = function (req, res) {
        var password = req.body.password;
        //是否已经登陆过
        var isLogin = LoginController_1.isLogin(req);
        if (isLogin) {
            // res.send('已经登陆过')
            //接口标准化
            res.json((0, util_1.getResponseData)(true));
        }
        else {
            if (password === '123' && req.session) {
                //登录凭证
                req.session.login = true;
                // res.send('登陆成功！')
                //接口标准化
                res.json((0, util_1.getResponseData)(true));
            }
            else {
                // res.send('登陆失败')
                //接口标准化
                res.json((0, util_1.getResponseData)(false, '登陆失败'));
            }
        }
    };
    LoginController.prototype.logout = function (req, res) {
        if (req.session) {
            req.session.login = undefined;
        }
        // res.redirect('/')
        //接口标准化
        res.json((0, util_1.getResponseData)(true));
    };
    var LoginController_1;
    __decorate([
        (0, decorator_1.get)('/isLogin'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], LoginController.prototype, "isLogin", null);
    __decorate([
        (0, decorator_1.post)('/login'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], LoginController.prototype, "login", null);
    __decorate([
        (0, decorator_1.get)('/logout'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], LoginController.prototype, "logout", null);
    LoginController = LoginController_1 = __decorate([
        (0, decorator_1.controller)('/api')
    ], LoginController);
    return LoginController;
}());
exports.LoginController = LoginController;
