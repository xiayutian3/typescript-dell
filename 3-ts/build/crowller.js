"use strict";
// 编写爬虫工具
// ts -> .d.ts 翻译文件 @types/superagent  -> js
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const superagent_1 = __importDefault(require("superagent"));
// import cheerio from "cheerio"
const DellAnalyzer_1 = __importDefault(require("./DellAnalyzer"));
class Crowller {
    constructor(url, analyzer) {
        this.url = url;
        this.analyzer = analyzer;
        this.filePath = path_1.default.resolve(__dirname, '../data/course.json');
        this.initSpiderProcess();
    }
    //爬取html
    getRawHtml() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield superagent_1.default.get(this.url);
            return result.text;
            //爬出html返回的内容 result.text
            // console.log('result: ', result.text);
            // this.getCourseInfo(result.text)
        });
    }
    //写入文件
    writeFile(content) {
        fs_1.default.writeFileSync(this.filePath, content);
    }
    //入口，编码规范 减少耦合
    initSpiderProcess() {
        return __awaiter(this, void 0, void 0, function* () {
            const html = yield this.getRawHtml();
            // const courseContent = this.getCourseInfo(html)
            // const {fileContent} = this.generateJsonContent(courseContent)
            const fileContent = this.analyzer.analyze(html, this.filePath);
            this.writeFile(fileContent);
        });
    }
}
//模拟要爬取的网站
// private url = `https://www.xbshare.cc/hot/hotmovie.html`
//爬取电影网站 
const url = `https://www.xbshare.cc/hot/hotmovie.html`;
//变成单例模式后，不能被外部new
// const analyzer = new DellAnalyzer()
const analyzer = DellAnalyzer_1.default.getInstance();
const crowller = new Crowller(url, analyzer);
console.log('s');
