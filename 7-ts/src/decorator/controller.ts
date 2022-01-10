
import { RequestHandler } from 'express';
import router from '../router';
import { Methods } from './request'

// //枚举类型
// enum Methods {
//   get = "get",
//   post = "post",
//   put = "put",
//   delete = "delete"
// }

// //构造函数类型 new (...args:any[]) => any
// export function controller(target: new (...args: any[]) => any) {
//   //方法的元数据都在原型中，可以获取元数据
//   for (let key in target.prototype) {
//     // console.log(Reflect.getMetadata('path', target.prototype, key))
//     const path: string = Reflect.getMetadata('path', target.prototype, key)
//     // method 类型约束
//     const method: Methods = Reflect.getMetadata('method', target.prototype, key)
//     const handler = target.prototype[key]
//     //中间件装饰器部分
//     const middleware: RequestHandler = Reflect.getMetadata('middleware', target.prototype, key)
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




//添加路由前缀 @controller('/asd')
export function controller(root?: string) {
  return function (target: new (...args: any[]) => any) {
    for (let key in target.prototype) {
      const path: string = Reflect.getMetadata('path', target.prototype, key)
      const method: Methods = Reflect.getMetadata('method', target.prototype, key)
      const handler = target.prototype[key]
      const middleware: RequestHandler = Reflect.getMetadata('middleware', target.prototype, key)

      if (path && method && handler) {
        //完整路径
        let fullpath = ''
        if (root) {
          fullpath = root === '/' ? `${path}` : `${root}${path}`
        } else {
          fullpath = `${path}`
        }

        if (middleware) { //注册路由
          router[method](fullpath, middleware, handler)
        } else {
          router[method](fullpath, handler)
        }
      }
    }
  }
}
