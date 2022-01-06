"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const express_1 = require("express");
const crowller_1 = __importDefault(require("./utils/crowller"));
const DellAnalyzer_1 = __importDefault(require("./utils/DellAnalyzer"));
const util_1 = require("./utils/util");
//判断登录的中间件
const checkLogin = (req, res, next) => {
    const isLogin = req.session ? req.session.login : false;
    if (isLogin) {
        next();
    }
    else {
        // res.send('请先登录')
        //接口标准化
        res.json((0, util_1.getResponseData)(null, '请先登录'));
    }
};
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    const isLogin = req.session ? req.session.login : false;
    if (isLogin) {
        res.send(`
    <a href="/getdata">爬取内容</a>
    <a href="/showdata">展示内容</a>
    <a href="/logout">退出</a>
  `);
    }
    else {
        res.send(`
    <form action="/login" method="post">
      <input type="password" name="password"/>
      <button>登录</button>
    </form>
  `);
    }
});
//退出登录
router.get('/logout', (req, res) => {
    if (req.session) {
        req.session.login = undefined;
    }
    // res.redirect('/')
    //接口标准化
    res.json((0, util_1.getResponseData)(true));
});
//登录
router.post('/login', (req, res) => {
    const { password } = req.body;
    //是否已经登陆过
    const isLogin = req.session ? req.session.login : false;
    if (isLogin) {
        // res.send('已经登陆过')
        //接口标准化
        res.json((0, util_1.getResponseData)(false, '已经登陆过'));
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
});
//请求数据
router.get('/getdata', checkLogin, (req, res) => {
    //爬取电影网站 
    const url = `https://www.xbshare.cc/hot/hotmovie.html`;
    const analyzer = DellAnalyzer_1.default.getInstance();
    const crowller = new crowller_1.default(url, analyzer);
    //类型融合后就会有自动提示 req.teacherName
    // res.send(`data sucess${req.teacherName}`);
    // res.send(`data sucess`);
    //接口标准化
    res.json((0, util_1.getResponseData)(true));
});
//展示内容
router.get('/showdata', checkLogin, (req, res) => {
    try {
        const position = path_1.default.resolve(__dirname, '../data/course.json');
        // const result = fs.readFileSync(position, 'utf-8')
        const result = fs_1.default.readFileSync(position, 'utf8'); //一样的效果 'utf-8'   'utf8'
        // res.json(JSON.parse(result))
        //接口标准化
        res.json((0, util_1.getResponseData)(JSON.parse(result)));
    }
    catch (error) {
        // res.send('尚未爬取到内容')
        //接口标准化
        res.json((0, util_1.getResponseData)(false, '尚未爬取到内容'));
    }
});
exports.default = router;
