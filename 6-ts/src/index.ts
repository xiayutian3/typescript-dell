// 4 访问器的装饰器
// /**
//  * 
//  * @param target 对应的是类的prototype
//  * @param key 对应的方法名字
//  * @param descriptor 存储描述符
//  */ 


// function visitDecorator(target: any, key: string, descriptor: PropertyDescriptor) {
//   console.log('target: ', target);
//   console.log('key: ', key);
//   console.log('descriptor: ', descriptor);
//   //不可修改的
//   descriptor.writable = false;
// }

// class Test {
//   private _name: string;
//   constructor(name: string) {
//     this._name = name
//   }
//   //get set不能同时用同一个访问器
//   get name() { return this._name }

//   @visitDecorator
//   set name(name: string) {
//     this._name = name
//   }
// }

// const test = new Test('hello');
// test.name ="123456"
// console.log('test: ', test.name);




/************************************************ */
//5 属性的装饰器
/**
 * 
 * @param target 对应的是类的prototype
 * @param key 对应的属性名字
 */ 

// //属性装饰器对属性进行装饰
//  function nameDecorator(target: any, key: string):any {
//   // console.log('target: ', target);
//   // console.log('key: ', key);

//   //由于装饰属性的时候没有descriptor选项对属性做一些修改，但是可以自定义加上descriptor 属性
//   //新创建的descriptor 会替换老的属性的descriptor
//   const descriptor:PropertyDescriptor = {
//     //不可修改
//     writable:false
//   };
//   return descriptor
// }


// //属性装饰器 直接  对属性进行装饰 . (是直接在原型在添加的属性)
// function nameDecorator(target: any, key: string):any {
//   target[key] = 'heelo'
// }
// class Test {
//   @nameDecorator
//   name: string = '123456';  //再实例上添加属性
// }

// const test = new Test();
// console.log('test: ', test.name);


/************************************************************8 */

//6 参数装饰器
/**
 * 
 * @param target 对应的是类的prototype
 * @param key  对应的方法名字
 * @param paramIndex 参数在第几个位置 从0开始
 */

function paramDecorator(target: any, key: string,paramIndex: number) {
  console.log('target: ', target);
  console.log('key: ', key);
  console.log('paramIndex: ', paramIndex);
}
class Test {
  getInfo(@paramDecorator name:string,age:number){ 
    console.log(name,age)
  }
}

const test = new Test();
console.log('test: ', test.getInfo('heelo',30));

