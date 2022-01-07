//类的装饰器
//类接受的参数是构造函数
//装饰器的本身是一个函数
//装饰器通过 @ 符号来使用
//多个装饰器的时候，装饰器执行的顺序从下到上，从右到左


// function testDecorator(constructor: any) {
//   // console.log('testDecorator')
//   constructor.prototype.getName = () => {
//     console.log('hello')
//   }
// }
// function testDecorator1(constructor: any) {
//   console.log('testDecorator1')
//   // constructor.prototype.getName = () => {
//   //   console.log('hello')
//   // }
// }


// //有时候我们需要或者不需要装饰的时候，可以做条件判断
// function testDecorator(flag: boolean) {
//   if (flag) {
//     return function (constructor: any) {
//       // console.log('testDecorator')
//       constructor.prototype.getName = () => {
//         console.log('hello')
//       }
//     }
//   } else {
//     //返回一个空的装饰器
//     return function (constructor: any) { }
//   }

// }

// @testDecorator(true)
// // @testDecorator1
// class Test {

// }
// const test = new Test();
// (test as any).getName()