// import fs from 'fs'
// import path from 'path'
// import { Router, Request, Response, NextFunction } from "express";
// import Crowller from './utils/crowller';
// import DellAnalyzer from './utils/DellAnalyzer'
// import { getResponseData } from './utils/util'

// //扩展Request的约束范围
// //解决：express库的类型定义文件 .d.ts文件类型描述不准确
// interface RequestWidthBody extends Request {
//   body: {
//     // password: string | undefined;
//     [key: string]: string | undefined;
//   }
// }

// //判断登录的中间件
// const checkLogin = (req: RequestWidthBody, res: Response, next: NextFunction) => {
//   const isLogin = req.session ? req.session.login : false
//   if (isLogin) {
//     next()
//   } else {
//     // res.send('请先登录')
//     //接口标准化
//     res.json(getResponseData(null, '请先登录'))
//   }
// }


// const router = Router();

// router.get('/', (req: RequestWidthBody, res: Response)=>{
//   const isLogin = req.session ? req.session.login : false
//     if (isLogin) {
//       res.send(`
//       <a href="/getdata">爬取内容</a>
//       <a href="/showdata">展示内容</a>
//       <a href="/logout">退出</a>
//     `);
//     } else {
//       res.send(`
//       <form action="/login" method="post">
//         <input type="password" name="password"/>
//         <button>登录</button>
//       </form>
//     `);
//     }
// })

// //退出登录
// router.get('/logout', (req: RequestWidthBody, res: Response) => {
//   if (req.session) {
//     req.session.login = undefined
//   }
//   // res.redirect('/')
//   //接口标准化
//   res.json(getResponseData(true))
// })

// //登录
// router.post('/login', (req: RequestWidthBody, res: Response) => {
  // const { password } = req.body;
  // //是否已经登陆过
  // const isLogin = req.session ? req.session.login : false
  // if (isLogin) {
  //   // res.send('已经登陆过')
  //   //接口标准化
  //   res.json(getResponseData(false, '已经登陆过'))
  // } else {
  //   if (password === '123' && req.session) {
  //     //登录凭证
  //     req.session.login = true
  //     // res.send('登陆成功！')
  //     //接口标准化
  //     res.json(getResponseData(true))
  //   } else {
  //     // res.send('登陆失败')
  //     //接口标准化
  //     res.json(getResponseData(false, '登陆失败'))
  //   }
  // }
// })

// //请求数据
// router.get('/getdata', checkLogin, (req: RequestWidthBody, res: Response) => {
//   //爬取电影网站 
//   const url = `https://www.xbshare.cc/hot/hotmovie.html`

//   const analyzer = DellAnalyzer.getInstance()
//   const crowller = new Crowller(url, analyzer)
//   //类型融合后就会有自动提示 req.teacherName
//   // res.send(`data sucess${req.teacherName}`);
//   // res.send(`data sucess`);
//   //接口标准化
//   res.json(getResponseData(true))

// })

// //展示内容
// router.get('/showdata', checkLogin, (req: RequestWidthBody, res: Response) => {
//   try {
//     const position = path.resolve(__dirname, '../data/course.json')
//     // const result = fs.readFileSync(position, 'utf-8')
//     const result = fs.readFileSync(position, 'utf8')  //一样的效果 'utf-8'   'utf8'
//     // res.json(JSON.parse(result))
//     //接口标准化
//     res.json(getResponseData(JSON.parse(result)))
//   } catch (error) {
//     // res.send('尚未爬取到内容')
//     //接口标准化
//     res.json(getResponseData(false, '尚未爬取到内容'))
//   }

// })

// export default router