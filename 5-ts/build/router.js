"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const crowller_1 = __importDefault(require("./crowller"));
const DellAnalyzer_1 = __importDefault(require("./DellAnalyzer"));
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    res.send(`
  <form action="/getdata" method="post">
    <input type="password" name="password"/>
    <button>提交</button>
  </form>
`);
});
router.post('/getdata', (req, res) => {
    // const { password } = req.body;
    console.log(req.body);
    if (req.body.password !== '123') {
        res.send('password error');
    }
    //爬取电影网站 
    const url = `https://www.xbshare.cc/hot/hotmovie.html`;
    const analyzer = DellAnalyzer_1.default.getInstance();
    const crowller = new crowller_1.default(url, analyzer);
    res.send('data sucess');
});
exports.default = router;
