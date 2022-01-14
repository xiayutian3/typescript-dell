

// 在定义类或者类方法的时候，可以设置一些元数据，我们可以获取 到在类与类方法上添加的元数据，用的方法就是 Reflect Metadata。 元数据指的是描述东西时用的数据。
// https://www.cnblogs.com/studyWeb/p/13181067.html
import fs from 'fs'
import path from 'path'
import 'reflect-metadata'
import { NextFunction, Request, Response } from "express";

// import { controller, get, post, use } from './decorator';
import { controller, use, get, post } from '../decorator'
import { getResponseData } from '../utils/util';
import DellAnalyzer from '../utils/DellAnalyzer';
import Crowller from '../utils/crowller';


//扩展Request的约束范围
//解决：express库的类型定义文件 .d.ts文件类型描述不准确
interface RequestWidthBody extends Request {
  body: {
    // password: string | undefined;
    [key: string]: string | undefined;
  }
}

// //返回的数据类型 
// interface CourseItem {
//   title: string;
//   year: string;
// }
// //爬取数据的类型
// interface DataStructure {
//   [key: string]: CourseItem[];
// }

//判断登录的中间件
const checkLogin = (req: RequestWidthBody, res: Response, next: NextFunction): void => {
  // console.log('我是checkLogin中间件')
  const isLogin = !!(req.session ? req.session.login : false) //添加两个！！，推断为boolean类型
  if (isLogin) {
    next()
  } else {
    // res.send('请先登录')
    //接口标准化
    res.json(getResponseData(null, '请先登录'))
  }
}

//test中间件
const test = (req: RequestWidthBody, res: Response, next: NextFunction): void => {
  console.log('我是test中间件')
  next()
}



@controller('/api')
export class CrowllerController {

  @get('/getdata')
  //use装饰器，使用中间件
  @use(checkLogin)
  // @use(test)
  getdata(req: RequestWidthBody, res: Response): void {
    //爬取电影网站 
    const url = `https://www.xbshare.cc/hot/hotmovie.html`

    const analyzer = DellAnalyzer.getInstance()
    const crowller = new Crowller(url, analyzer)
    //类型融合后就会有自动提示 req.teacherName
    // res.send(`data sucess${req.teacherName}`);
    // res.send(`data sucess`);
    //接口标准化
    res.json(getResponseData<resposeResult.getdata>(true))
  }

  @get('/showdata')
  //use装饰器，使用中间件
  @use(checkLogin)
  showdata(req: RequestWidthBody, res: Response): void {
    try {
      const position = path.resolve(__dirname, '../../data/course.json')
      // const result = fs.readFileSync(position, 'utf-8')
      const result = fs.readFileSync(position, 'utf8')  //一样的效果 'utf-8'   'utf8'
      // res.json(JSON.parse(result))
      //接口标准化
      res.json(getResponseData<resposeResult.showdata>(JSON.parse(result)))
    } catch (error) {
      // res.send('尚未爬取到内容')
      //接口标准化
      res.json(getResponseData<resposeResult.showdata>(false, '尚未爬取到内容'))
    }
  }
}