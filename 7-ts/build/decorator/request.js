"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.del = exports.put = exports.post = exports.get = exports.Methods = void 0;
//枚举类型
var Methods;
(function (Methods) {
    Methods["get"] = "get";
    Methods["post"] = "post";
    Methods["put"] = "put";
    Methods["delete"] = "delete";
})(Methods = exports.Methods || (exports.Methods = {}));
// 、、、、、万一还有很多方法呢 put delete 。。。
// 统一用工厂函数生成
function getRequestDecorator(type) {
    return function (path) {
        //为每个方法设定路径到元数据中
        // CrowllerController | LoginController  联合类型
        return function (target, key, desc) {
            Reflect.defineMetadata('path', path, target, key);
            Reflect.defineMetadata('method', type, target, key);
        };
    };
}
//get
exports.get = getRequestDecorator(Methods.get);
//post
exports.post = getRequestDecorator(Methods.post);
exports.put = getRequestDecorator(Methods.put);
exports.del = getRequestDecorator(Methods.delete);
