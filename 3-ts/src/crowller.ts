// 编写爬虫工具
// ts -> .d.ts 翻译文件 @types/superagent  -> js

import fs from 'fs'
import path from 'path'
import superagent from "superagent";
// import cheerio from "cheerio"
import DellAnalyzer from './DellAnalyzer'

export interface Analyzer {
  analyze: (html: string, filePath: string) => string;
}


class Crowller {
  private filePath = path.resolve(__dirname, '../data/course.json')

  //爬取html
  private async getRawHtml() {
    const result = await superagent.get(this.url)
    return result.text
    //爬出html返回的内容 result.text
    // console.log('result: ', result.text);
    // this.getCourseInfo(result.text)
  }

  //写入文件
  private writeFile(content: string) {
    fs.writeFileSync(this.filePath, content)
  }

  //入口，编码规范 减少耦合
  private async initSpiderProcess() {
    const html = await this.getRawHtml()
    // const courseContent = this.getCourseInfo(html)
    // const {fileContent} = this.generateJsonContent(courseContent)
    const fileContent = this.analyzer.analyze(html, this.filePath)
    this.writeFile(fileContent)
  }

  constructor(private url: string, private analyzer: Analyzer) {
    this.initSpiderProcess()
  }
}

//模拟要爬取的网站
// private url = `https://www.xbshare.cc/hot/hotmovie.html`
//爬取电影网站 
const url = `https://www.xbshare.cc/hot/hotmovie.html`

//变成单例模式后，不能被外部new
// const analyzer = new DellAnalyzer()
const analyzer = DellAnalyzer.getInstance()
const crowller = new Crowller(url, analyzer)