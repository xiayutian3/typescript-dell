"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//分析的逻辑
var fs_1 = __importDefault(require("fs"));
var cheerio_1 = __importDefault(require("cheerio"));
var DellAnalyzer = /** @class */ (function () {
    function DellAnalyzer() {
    } //单例模式
    //单例模式，只能在类里面new
    DellAnalyzer.getInstance = function () {
        if (!DellAnalyzer.instance) {
            DellAnalyzer.instance = new DellAnalyzer();
        }
        return DellAnalyzer.instance;
    };
    //cheerio 转化后类似于，jq操作  爬取电影名
    DellAnalyzer.prototype.getCourseInfo = function (html) {
        var courseInfos = [];
        var $ = cheerio_1.default.load(html);
        var courseItems = $('.title-wrapper');
        // const courseItems = $('.title-wrapper h3 a')
        courseItems.map(function (index, element) {
            //标题
            var title = $(element).find('a').text();
            //年份
            var year = $(element).find('.small').text();
            // console.log('title: ', title);
            courseInfos.push({ title: title, year: year });
        });
        //最后结果
        return {
            time: new Date().getTime(),
            data: courseInfos
        };
    };
    //生成json文件
    DellAnalyzer.prototype.generateJsonContent = function (content, filePath) {
        var fileContent = {};
        //如果文件存在，或者文件不存在
        if (fs_1.default.existsSync(filePath)) {
            fileContent = JSON.parse(fs_1.default.readFileSync(filePath, 'utf-8'));
        }
        fileContent[content.time] = content.data;
        return { fileContent: fileContent };
    };
    DellAnalyzer.prototype.analyze = function (html, filePath) {
        var courseContent = this.getCourseInfo(html);
        var fileContent = this.generateJsonContent(courseContent, filePath).fileContent;
        return JSON.stringify(fileContent);
    };
    return DellAnalyzer;
}());
exports.default = DellAnalyzer;
