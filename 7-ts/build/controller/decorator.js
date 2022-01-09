"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.put = exports.post = exports.get = exports.controller = exports.router = void 0;
//decorators.ts
var express_1 = require("express");
//导出生成的路由
exports.router = (0, express_1.Router)();
//枚举类型
var Method;
(function (Method) {
    Method["get"] = "get";
    Method["post"] = "post";
})(Method || (Method = {}));
function controller(target) {
    //方法的元数据都在原型中，可以获取元数据
    for (var key in target.prototype) {
        // console.log(Reflect.getMetadata('path', target.prototype, key))
        var path = Reflect.getMetadata('path', target.prototype, key);
        // method 类型约束
        var method = Reflect.getMetadata('method', target.prototype, key);
        var handler = target.prototype[key];
        if (path && method && handler) {
            //自动生成，装饰的路由 和方法
            // router.get(path,handler)
            exports.router[method](path, handler);
        }
    }
}
exports.controller = controller;
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
// 、、、、、万一还有很多方法呢 put delete 。。。
// 统一用工厂函数生成
function getRequestDecorator(type) {
    return function (path) {
        //为每个方法设定路径到元数据中
        return function (target, key, desc) {
            Reflect.defineMetadata('path', path, target, key);
            Reflect.defineMetadata('method', type, target, key);
        };
    };
}
//get
exports.get = getRequestDecorator('get');
//post
exports.post = getRequestDecorator('post');
exports.put = getRequestDecorator('put');
