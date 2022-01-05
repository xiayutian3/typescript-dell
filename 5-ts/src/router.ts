import { Router, Request, Response } from "express";
import Crowller from './crowller';
import DellAnalyzer from './DellAnalyzer'
import fs from 'fs'
import path from 'path'

//扩展Request的约束范围
//解决：express库的类型定义文件 .d.ts文件类型描述不准确
interface RequestWidthBody extends Request {
  body: {
    // password: string | undefined;
    [key: string]: string | undefined;
  }
}


const router = Router();

router.get('/', (req: Request, res: Response) => {
  const isLogin = req.session ? req.session.login : false
  if (isLogin) {
    res.send(`
    <a href="/getdata">爬取内容</a>
    <a href="/showdata">展示内容</a>
    <a href="/logout">退出</a>
  `);
  } else {
    res.send(`
    <form action="/login" method="post">
      <input type="password" name="password"/>
      <button>登录</button>
    </form>
  `);
  }
})

//退出登录
router.get('/logout', (req: Request, res: Response) => {
  if (req.session) {
    req.session.login = undefined
  }
  res.redirect('/')
})

//登录
router.post('/login', (req: RequestWidthBody, res: Response) => {
  const { password } = req.body;
  //是否已经登陆过
  const isLogin = req.session ? req.session.login : false
  if (isLogin) {
    res.send('已经登陆过')
  } else {
    if (password === '123' && req.session) {
      //登录凭证
      req.session.login = true
      res.send('登陆成功！')
    } else {
      res.send('登陆失败')
    }
  }
})

//请求数据
router.get('/getdata', (req: RequestWidthBody, res: Response) => {
  //是否已经登陆过
  const isLogin = req.session ? req.session.login : false
  if (isLogin) {
    //爬取电影网站 
    const url = `https://www.xbshare.cc/hot/hotmovie.html`

    const analyzer = DellAnalyzer.getInstance()
    const crowller = new Crowller(url, analyzer)
    //类型融合后就会有自动提示 req.teacherName
    // res.send(`data sucess${req.teacherName}`);
    res.send(`data sucess`);
  } else {
    res.send(`请登录后爬取内容`);
  }

})

//展示内容
router.get('/showdata', (req: RequestWidthBody, res: Response) => {
  //是否已经登陆过
  const isLogin = req.session ? req.session.login : false
  if (isLogin) {
    try {
      const position = path.resolve(__dirname, '../data/course.json')
      // const result = fs.readFileSync(position, 'utf-8')
      const result = fs.readFileSync(position, 'utf8')  //一样的效果 'utf-8'   'utf8'
      res.json(JSON.parse(result))
    } catch (error) {
      res.send('尚未爬取到内容')
    }
  } else {
    res.send('用户尚未登录')
  }

})

export default router