"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const router_1 = __importDefault(require("./router"));
// 问题1：express库的类型定义文件 .d.ts文件类型描述不准确
// 问题2：当我使用中间件的时候，对res req做了修改之后，实际上类型并不能实时改变，
// 如：在req.helloword = 123  Request类型上并没有helloword属性
const app = (0, express_1.default)();
//bodyParser 写在路由前面才有效果
//对form表单进行处理
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(router_1.default);
// app.get('/',(rq:Request,res:Response) => {
//   res.send('hello, world!');
// })
// app.get('/getdata',(rq:Request,res:Response) => {
//   res.send('getdata,!');
// })
app.listen(3000, () => {
    console.log('server is running');
});
