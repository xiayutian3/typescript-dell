// //命名空间

// // 引入的命名空间Component路径 (3个斜杆),这样写只是让开发者知道文件从哪里引入的 ，其他就没有实际意义
// ///<reference path="./component.ts" />

// namespace Home {
//   export class Page {
//     user:Component.User = {
//       name:'dell'
//     }
//     constructor() {
//       new Component.Header()
//       new Component.Content()
//       new Component.Footer()
//     }
//   }
// }



// 使用es6后

import { Header, Content, Footer } from './component'
export default class Page {
  constructor() {
    new Header()
    new Content()
    new Footer()
  }
} 



