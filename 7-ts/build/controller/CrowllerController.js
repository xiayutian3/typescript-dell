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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrowllerController = void 0;
// 在定义类或者类方法的时候，可以设置一些元数据，我们可以获取 到在类与类方法上添加的元数据，用的方法就是 Reflect Metadata。 元数据指的是描述东西时用的数据。
// https://www.cnblogs.com/studyWeb/p/13181067.html
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
require("reflect-metadata");
// import { controller, get, post, use } from './decorator';
var decorator_1 = require("../decorator");
var util_1 = require("../utils/util");
var DellAnalyzer_1 = __importDefault(require("../utils/DellAnalyzer"));
var crowller_1 = __importDefault(require("../utils/crowller"));
//判断登录的中间件
var checkLogin = function (req, res, next) {
    var isLogin = !!(req.session ? req.session.login : false); //添加两个！！，推断为boolean类型
    if (isLogin) {
        next();
    }
    else {
        // res.send('请先登录')
        //接口标准化
        res.json((0, util_1.getResponseData)(null, '请先登录'));
    }
};
var CrowllerController = /** @class */ (function () {
    function CrowllerController() {
    }
    CrowllerController.prototype.getdata = function (req, res) {
        //爬取电影网站 
        var url = "https://www.xbshare.cc/hot/hotmovie.html";
        var analyzer = DellAnalyzer_1.default.getInstance();
        var crowller = new crowller_1.default(url, analyzer);
        //类型融合后就会有自动提示 req.teacherName
        // res.send(`data sucess${req.teacherName}`);
        // res.send(`data sucess`);
        //接口标准化
        res.json((0, util_1.getResponseData)(true));
    };
    CrowllerController.prototype.showdata = function (req, res) {
        try {
            var position = path_1.default.resolve(__dirname, '../../data/course.json');
            // const result = fs.readFileSync(position, 'utf-8')
            var result = fs_1.default.readFileSync(position, 'utf8'); //一样的效果 'utf-8'   'utf8'
            // res.json(JSON.parse(result))
            //接口标准化
            res.json((0, util_1.getResponseData)(JSON.parse(result)));
        }
        catch (error) {
            // res.send('尚未爬取到内容')
            //接口标准化
            res.json((0, util_1.getResponseData)(false, '尚未爬取到内容'));
        }
    };
    __decorate([
        (0, decorator_1.get)('/getdata')
        //use装饰器，使用中间件
        ,
        (0, decorator_1.use)(checkLogin),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], CrowllerController.prototype, "getdata", null);
    __decorate([
        (0, decorator_1.get)('/showdata')
        //use装饰器，使用中间件
        ,
        (0, decorator_1.use)(checkLogin),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], CrowllerController.prototype, "showdata", null);
    CrowllerController = __decorate([
        (0, decorator_1.controller)('/')
    ], CrowllerController);
    return CrowllerController;
}());
exports.CrowllerController = CrowllerController;
