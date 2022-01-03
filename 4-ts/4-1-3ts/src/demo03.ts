interface Bird {
  fly: boolean;
  sing: () => {};
}
interface Dog {
  fly: boolean;
  bark: () => {};
}

//类型断言 (联合类型和类型保护)
function trainAnial(animal: Bird | Dog) {
  if (animal.fly) {
    (animal as Bird).sing()
  } else {
    (animal as Dog).bark()
  }
}

// 类型保护 的另一种  in语法
function trainAnialSecond(animal: Bird | Dog) {
  if ('sing' in animal) {
    animal.sing()
  } else {
    animal.bark()
  }
}


//也是一种类型保护机制  typeof语法
function add(first:string|number,second:string|number){
  if(typeof first === "string" || typeof second === "string"){
    return `${first}${second}`
  }
  return first + second
}


//也是一种类型保护机制  instanceof语法
class NumberObj {
  count:number;
}
function addSecond(first:object|NumberObj,second:object|NumberObj){
  if(first instanceof NumberObj && second instanceof NumberObj ){
    return first.count + second.count
  }
  return 0
}