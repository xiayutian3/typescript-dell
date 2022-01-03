interface Person {
  name: string;
  age: number;
  gender: string;
}

// // 类型也可以是字符串
// type NAME = 'name';
// const str: NAME = 'name';


class Teacher {
  constructor(private info: Person) { };

  // 类型保护
  // getInfo (key: string) {
  //   // return this.info[key];

  //   // 类型保护1
  //   // if (key === 'name' || key === 'age' || key === 'gender') {
  //   //   return this.info[key];
  //   // }
  // }



  //泛型做类型保护   keyof关键词
  // 注：第一次循环
  //    T extends 'name' 等价于 type T = 'name'
  //    key:name
  //    Person[name]
  
  getInfo<T extends keyof Person>(key: T): Person[T] {
    return this.info[key];
  }
}

const teacher: Teacher = new Teacher({
  name: 'lile',
  age: 18,
  gender: '女'
})
const res = teacher.getInfo('name')
console.log('res: ', res);