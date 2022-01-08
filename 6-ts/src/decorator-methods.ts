// 装饰方法
//普通方法 ，target 对应的是类的prototype
//静态方法 ， target 对应的是类的 构造函数
//key：对应的方法名字

// function getNameDecorator(target: any, key: string, descriptor: PropertyDescriptor) {
//   // console.log(target,key)
//   //不可修改
//   // descriptor.writable = false;
//   //对原来的方法做变更
//   descriptor.value = function () {
//     return 'descriptor';
//   }
// }

// class Test {
//   name: string;
//   constructor(name: string) { //先执行
//     this.name = name
//   }
//   @getNameDecorator
//   getName() { return this.name }
//   //  static getName() { return this.name }
// }

// const test = new Test('hello');
// // test.getName = function() { return '123'}
// console.log('test: ', test.getName());
