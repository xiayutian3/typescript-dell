//函数泛型 τ

// function join(first: string | number, second: string | number) {
//   return `${first}${second}`
// }

//传入什么类型， 两个参数就是什么类型（类型同一）
function join<ABC>(first: ABC, second: ABC) {
  return `${first}${second}`
}
// join('1', 1);  //报错 类型不一致
join<string>('1', '2')


// function map<A>(params:Array<A>){ //数组的string,泛型的形式
function map<A>(params: A[]) { //也可以这么写  数组的string
  return params
}
map<string>(['12'])


//传两个泛型的情况
function join123<T,P>(first: T, second: P) {
  return `${first}${second}`
}
// join123<number,string>(1,'12')
join123(1,'12') //不屑也可以  ts 会自己推断