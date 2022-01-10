

import { RequestHandler } from 'express'
import { CrowllerController, LoginController } from '../controller'

//use装饰器
export function use(middleware: RequestHandler) {
  // CrowllerController | LoginController  联合类型
  return function (target: CrowllerController | LoginController, key: string) {
    Reflect.defineMetadata('middleware', middleware, target, key)
  }
}