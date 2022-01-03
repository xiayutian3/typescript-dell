// 类的泛型

// //一般函数
// class DataManager {
//   constructor(private data:string[] |number[]){}
//   getItem(index:number):string|number{
//     return this.data[index];
//   }
// }


// // 用泛型改变后的（基础使用）
// class DataManager<T> {
//   constructor(private data: T[]) { }
//   getItem(index: number): T {
//     return this.data[index];
//   }
// }


// //进阶1 使用1 泛型

// interface Item {
//   name: string;
// }
// class DataManager<T extends Item> {
//   constructor(private data: T[]) { }
//   getItem(index: number): string {
//     return this.data[index].name;
//   }
// }


//进阶2 使用2 泛型
interface Test {
  name: string;
}
class DataManager<T extends string | number> {
  constructor(private data: T[]) { }
  getItem(index: number): T {
    return this.data[index];
  }
}


// const data = new DataManager([1]);
// const data = new DataManager<number>([1]);  //也可以这么写

// const data = new DataManager<Test>([]);
const data = new DataManager<string>([]);
data.getItem(0)


// 泛型作为类型的声明, 类型注解

function hello<T>(params: T) {
  return params;
}
const func: <T>(params: T) => T = hello