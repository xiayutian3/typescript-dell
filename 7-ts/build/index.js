"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import express, { Request, Response, NextFunction } from 'express';
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cookie_session_1 = __importDefault(require("cookie-session"));
// import router from './router'
// 更新后的路由(自动生成新的路由)
require("./controller/LoginController");
var decorator_1 = require("./controller/decorator");
// 问题1：express库的类型定义文件 .d.ts文件类型描述不准确
// 问题2：当我使用中间件的时候，对res req做了修改之后，实际上类型并不能实时改变，
// 如：在req.helloword = 123  Request类型上并没有helloword属性
var app = (0, express_1.default)();
//bodyParser 写在路由前面才有效果
//对form表单进行处理
app.use(body_parser_1.default.urlencoded({ extended: false }));
//登录凭证
app.use((0, cookie_session_1.default)({
    name: 'session',
    keys: ['hello'],
    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));
//自定义中间件
// app.use((req: Request, res: Response, next: NextFunction) => {
//   // 和我们自己定义的 Express  interface  类型融合后就不会报错了
//   req.teacherName = 'heelo'
//   next()
// })
app.use(decorator_1.router);
// app.get('/',(rq:Request,res:Response) => {
//   res.send('hello, world!');
// })
// app.get('/getdata',(rq:Request,res:Response) => {
//   res.send('getdata,!');
// })
app.listen(3000, function () {
    console.log('server is running at http://localhost:3000/');
});
