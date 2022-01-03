// // 定义全局变量
// // declare var $: (params: () => void) => void;


// // 定义全局函数 

// interface JqueryInstance {
//   //还是返回jq对象 JqueryInstance
//   html: (html: string) => JqueryInstance
// }

// // // 函数的重载，可以写多次函数声明
// declare function $(readyFunc: () => void): void;
// // declare function $(selector: string): {
// //   html: (html: string) => {}
// // }
// declare function $(selector: string): JqueryInstance


// //如何对对象进行类型定义，以及对类进行类型定义 以及命名空间的嵌套
// //比如 new $.fn.init();
// declare namespace $ {
//   namespace fn {
//     class init {}  //构造函数
//     // function init():void;  //普通方法
//   }
// }


// // 另一种方式 interface，使用interface实现函数重载
// // interface JQuery {
// //   (readyFunc: () => void):void;
// //   (selector: string): JqueryInstance;
// // }
// // declare var $:JQuery



// es6 模块定义文件

declare module "jquery" {
  interface JqueryInstance {
    //还是返回jq对象 JqueryInstance
    html: (html: string) => JqueryInstance
  }

  //混合类型 $

  // // 函数的重载，可以写多次函数声明
  function $(readyFunc: () => void): void;
  function $(selector: string): JqueryInstance
  namespace $ {
    namespace fn {
      class init { }  //构造函数
      // function init():void;  //普通方法
    }
  }

  export = $
}