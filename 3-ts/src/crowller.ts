// 编写爬虫工具
// ts -> .d.ts 翻译文件 @types/superagent  -> js

import fs from 'fs'
import path from 'path'
import superagent from "superagent";
import cheerio from "cheerio"


//定义Cource接口
interface Cource {
  title: string;
  year: string;
}
interface CourceResult {
  time: number;
  data:Cource[]
}
interface Content {
  [propName:number]: Cource[];
}


class Crowller {
  private secret = 'secretKey'
  //模拟要爬取的网站
  // private url = `https://www.xbshare.cc/hot/hotmovie.html?secret=${this.secret}`
  //爬取电影网站 
  private url = `https://www.xbshare.cc/hot/hotmovie.html`

  //cheerio 转化后类似于，jq操作  爬取电影名
  getCourseInfo(html: string) {
    const courseInfos: Cource[] = []
    const $ = cheerio.load(html);
    const courseItems = $('.title-wrapper')
    // const courseItems = $('.title-wrapper h3 a')
    courseItems.map((index, element) => {
      //标题
      const title = $(element).find('a').text()
      //年份
      const year = $(element).find('.small').text()

      // console.log('title: ', title);
      courseInfos.push({ title, year })
    })

    //最后结果
    return {
      time: new Date().getTime(),
      data: courseInfos
    }
  }



  //爬取html
  async getRawHtml() {
    const result = await superagent.get(this.url)
    return result.text
    //爬出html返回的内容 result.text
    // console.log('result: ', result.text);
    // this.getCourseInfo(result.text)
  }

  //生成json文件
  generateJsonContent(content:CourceResult){
    const filePath = path.resolve(__dirname,'../data/course.json')
    let fileContent:Content = {}
    //如果文件存在，或者文件不存在
    if(fs.existsSync(filePath)){
      fileContent = JSON.parse(fs.readFileSync(filePath,'utf-8'))
    }
    fileContent[content.time] = content.data
    return {filePath,fileContent}
   
  }

  //入口，编码规范 减少耦合
  async initSpiderProcess() {
    const html = await this.getRawHtml()
    const courseContent = this.getCourseInfo(html)
    const {filePath,fileContent} = this.generateJsonContent(courseContent)
    fs.writeFileSync(filePath,JSON.stringify(fileContent))
  }

  constructor() {
    this.initSpiderProcess()
  }
}
const crowller = new Crowller()