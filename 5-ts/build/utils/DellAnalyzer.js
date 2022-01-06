"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//分析的逻辑
const fs_1 = __importDefault(require("fs"));
const cheerio_1 = __importDefault(require("cheerio"));
class DellAnalyzer {
    constructor() { } //单例模式
    //单例模式，只能在类里面new
    static getInstance() {
        if (!DellAnalyzer.instance) {
            DellAnalyzer.instance = new DellAnalyzer();
        }
        return DellAnalyzer.instance;
    }
    //cheerio 转化后类似于，jq操作  爬取电影名
    getCourseInfo(html) {
        const courseInfos = [];
        const $ = cheerio_1.default.load(html);
        const courseItems = $('.title-wrapper');
        // const courseItems = $('.title-wrapper h3 a')
        courseItems.map((index, element) => {
            //标题
            const title = $(element).find('a').text();
            //年份
            const year = $(element).find('.small').text();
            // console.log('title: ', title);
            courseInfos.push({ title, year });
        });
        //最后结果
        return {
            time: new Date().getTime(),
            data: courseInfos
        };
    }
    //生成json文件
    generateJsonContent(content, filePath) {
        let fileContent = {};
        //如果文件存在，或者文件不存在
        if (fs_1.default.existsSync(filePath)) {
            fileContent = JSON.parse(fs_1.default.readFileSync(filePath, 'utf-8'));
        }
        fileContent[content.time] = content.data;
        return { fileContent };
    }
    analyze(html, filePath) {
        const courseContent = this.getCourseInfo(html);
        const { fileContent } = this.generateJsonContent(courseContent, filePath);
        return JSON.stringify(fileContent);
    }
}
exports.default = DellAnalyzer;
