"use strict";
//decorators.ts
// import { RequestHandler, Router } from 'express'
//导出生成的路由
// export const router = Router()
// import { RequestHandler } from 'express'
// import  router from '../router';
// //枚举类型
// enum Methods {
//   get = "get",
//   post = "post",
//   put = "put",
//   delete = "delete"
// }
// export function controller(target: any) {
//   //方法的元数据都在原型中，可以获取元数据
//   for (let key in target.prototype) {
//     // console.log(Reflect.getMetadata('path', target.prototype, key))
//     const path = Reflect.getMetadata('path', target.prototype, key)
//     // method 类型约束
//     const method: Methods = Reflect.getMetadata('method', target.prototype, key)
//     const handler = target.prototype[key]
//     //中间件装饰器部分
//     const middleware = Reflect.getMetadata('middleware', target.prototype, key)
//     if (path && method && handler) {
//       //自动生成，装饰的路由 和方法
//       // router.get(path,handler)
//       if (middleware) { //注册路由
//         router[method](path, middleware, handler)
//       } else {
//         router[method](path, handler)
//       }
//     }
//   }
// }
// // get 路由注册
// export function get(path: string) {
//   //为每个方法设定路径到元数据中
//   return function (target: any, key: string, desc: PropertyDescriptor) {
//       Reflect.defineMetadata('path', path, target, key)
//       Reflect.defineMetadata('method', 'get', target, key)
//   }
// }
// // post 路由注册
// export function post(path: string){
//     //为每个方法设定路径到元数据中
//     return function (target: any, key: string, desc: PropertyDescriptor) {
//       Reflect.defineMetadata('path', path, target, key)
//       Reflect.defineMetadata('method', 'post', target, key)
//   }
// }
// // 、、、、、万一还有很多方法呢 put delete 。。。
// // 统一用工厂函数生成
// function getRequestDecorator(type: Methods) {
//   return function (path: string) {
//     //为每个方法设定路径到元数据中
//     return function (target: any, key: string, desc: PropertyDescriptor) {
//       Reflect.defineMetadata('path', path, target, key)
//       Reflect.defineMetadata('method', type, target, key)
//     }
//   }
// }
// //use装饰器
// export function use(middleware: RequestHandler) {
//   return function (target: any, key: string) {
//     Reflect.defineMetadata('middleware', middleware, target, key)
//   }
// }
// //get
// export const get = getRequestDecorator(Methods.get)
// //post
// export const post = getRequestDecorator(Methods.post)
// export const put = getRequestDecorator(Methods.put)
// export const del = getRequestDecorator(Methods.delete)
