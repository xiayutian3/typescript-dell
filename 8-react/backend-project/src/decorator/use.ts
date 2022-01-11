

import { RequestHandler } from 'express'
import { CrowllerController, LoginController } from '../controller'

//use装饰器 (使用单个中间件情况)
// export function use(middleware: RequestHandler) {
//   console.log('use')
//   // CrowllerController | LoginController  联合类型
//   return function (target: CrowllerController | LoginController, key: string) {
//     Reflect.defineMetadata('middleware', middleware, target, key)
//   }
// }

//use装饰器(使用多个个中间件情况)
export function use(middleware: RequestHandler) {
  // CrowllerController | LoginController  联合类型
  return function (target: CrowllerController | LoginController, key: string) {
    //使用多个中间件的时候，多次使用use
    const originMiddlewares = Reflect.getMetadata('middlewares', target, key) || []
    originMiddlewares.push(middleware)
    Reflect.defineMetadata('middlewares', originMiddlewares, target, key)
  }
}