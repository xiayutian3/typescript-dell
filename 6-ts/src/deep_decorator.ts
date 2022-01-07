//类的装饰器
//类接受的参数是构造函数
//装饰器的本身是一个函数
//装饰器通过 @ 符号来使用
//多个装饰器的时候，装饰器执行的顺序从下到上，从右到左


//(...args:any[]) => any  表示一个函数
//new (...args:any[]) => any   表示为一个构造函数
// T extends new (...args:any[]) => any    
// T可以通过这种构造函数被实例化出来,所以说T可以说是一个类，或者说包含构造函数的这么一个东西

// //工厂函数
// function testDecorator() {
//   return function <T extends new (...args: any[]) => any>(constructor: T) {
//     //扩展
//     return class extends constructor { //在执行
//       name = "world";
//       getName() { return this.name }
//     }
//   }
// }
// // 装饰器去修饰匿名类
// const Test = testDecorator()(
//   class {
//     name: string;
//     constructor(name: string) { //先执行
//       this.name = name
//     }
//   })

// const test = new Test('hello');
// console.log('test: ', test.getName());
