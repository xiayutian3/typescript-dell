"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
var router_1 = __importDefault(require("../router"));
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
function controller(root) {
    return function (target) {
        for (var key in target.prototype) {
            var path = Reflect.getMetadata('path', target.prototype, key);
            var method = Reflect.getMetadata('method', target.prototype, key);
            var handler = target.prototype[key];
            var middleware = Reflect.getMetadata('middleware', target.prototype, key);
            if (path && method && handler) {
                //完整路径
                var fullpath = '';
                if (root) {
                    fullpath = root === '/' ? "".concat(path) : "".concat(root).concat(path);
                }
                else {
                    fullpath = "".concat(path);
                }
                if (middleware) { //注册路由
                    router_1.default[method](fullpath, middleware, handler);
                }
                else {
                    router_1.default[method](fullpath, handler);
                }
            }
        }
    };
}
exports.controller = controller;
