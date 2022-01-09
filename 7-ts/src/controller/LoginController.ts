

// 在定义类或者类方法的时候，可以设置一些元数据，我们可以获取 到在类与类方法上添加的元数据，用的方法就是 Reflect Metadata。 元数据指的是描述东西时用的数据。
// https://www.cnblogs.com/studyWeb/p/13181067.html
import 'reflect-metadata'
import { Request, Response } from "express";

import { controller, get,post } from './decorator';
import { getResponseData } from '../utils/util';


//扩展Request的约束范围
//解决：express库的类型定义文件 .d.ts文件类型描述不准确
interface RequestWidthBody extends Request {
  body: {
    // password: string | undefined;
    [key: string]: string | undefined;
  }
}


@controller
class LoginController {
  
  @post('/login')
  login(req: RequestWidthBody, res: Response) {
    const { password } = req.body;
    //是否已经登陆过
    const isLogin = req.session ? req.session.login : false
    if (isLogin) {
      // res.send('已经登陆过')
      //接口标准化
      res.json(getResponseData(false, '已经登陆过'))
    } else {
      if (password === '123' && req.session) {
        //登录凭证
        req.session.login = true
        // res.send('登陆成功！')
        //接口标准化
        res.json(getResponseData(true))
      } else {
        // res.send('登陆失败')
        //接口标准化
        res.json(getResponseData(false, '登陆失败'))
      }
    }
  }

  @get('/logout')
  logout(req: RequestWidthBody, res: Response) {
    if (req.session) {
      req.session.login = undefined
    }
    // res.redirect('/')
    //接口标准化
    res.json(getResponseData(true))
  }

  @get('/')
  home(req: RequestWidthBody, res: Response) {
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
  }
}