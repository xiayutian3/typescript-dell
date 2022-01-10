"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.use = void 0;
//use装饰器
function use(middleware) {
    // CrowllerController | LoginController  联合类型
    return function (target, key) {
        Reflect.defineMetadata('middleware', middleware, target, key);
    };
}
exports.use = use;
