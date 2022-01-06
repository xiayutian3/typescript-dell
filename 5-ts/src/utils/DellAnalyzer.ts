//分析的逻辑
import fs from 'fs'
import cheerio from "cheerio"
import { Analyzer } from './crowller'

//定义Cource接口
interface Cource {
  title: string;
  year: string;
}
interface CourceResult {
  time: number;
  data: Cource[]
}
interface Content {
  [propName: number]: Cource[];
}


export default class DellAnalyzer implements Analyzer {
  // 访问static成员，用类(class)而不是实例化的对象。
  // static方法只能访问static属性
  private static instance: DellAnalyzer
  //单例模式，只能在类里面new
  static getInstance() {
    if (!DellAnalyzer.instance) {
      DellAnalyzer.instance = new DellAnalyzer();
    }
    return DellAnalyzer.instance
  }



  //cheerio 转化后类似于，jq操作  爬取电影名
  private getCourseInfo(html: string) {
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

  //生成json文件
  private generateJsonContent(content: CourceResult, filePath: string) {
    let fileContent: Content = {}
    //如果文件存在，或者文件不存在
    if (fs.existsSync(filePath)) {
      fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    }
    fileContent[content.time] = content.data
    return { fileContent }
  }

  public analyze(html: string, filePath: string) {
    const courseContent = this.getCourseInfo(html)
    const { fileContent } = this.generateJsonContent(courseContent, filePath)
    return JSON.stringify(fileContent)
  }
  private constructor() { } //单例模式
}

