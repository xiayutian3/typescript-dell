
import { CrowllerController, LoginController } from '../controller'


//枚举类型
export enum Methods {
  get = "get",
  post = "post",
  put = "put",
  delete = "delete"
}


// 、、、、、万一还有很多方法呢 put delete 。。。
// 统一用工厂函数生成
function getRequestDecorator(type: Methods) {
  return function (path: string) {
    //为每个方法设定路径到元数据中
    // CrowllerController | LoginController  联合类型
    return function (target: CrowllerController | LoginController, key: string, desc: PropertyDescriptor) {
      Reflect.defineMetadata('path', path, target, key)
      Reflect.defineMetadata('method', type, target, key)
    }
  }
}



//get
export const get = getRequestDecorator(Methods.get)
//post
export const post = getRequestDecorator(Methods.post)
export const put = getRequestDecorator(Methods.put)
export const del = getRequestDecorator(Methods.delete)