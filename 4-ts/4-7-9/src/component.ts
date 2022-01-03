// namespace Component {

//   //子命名空间
//   export namespace SubComponent {
//     export class Test {}
//   }

//   //导出interface 
//   export interface User {
//     name: string;
//   }
//   export class Header {
//     constructor() {
//       const elem = document.createElement('div');
//       elem.innerText = 'this is header'
//       document.body.appendChild(elem)
//     }
//   }

//   export class Content {
//     constructor() {
//       const elem = document.createElement('div');
//       elem.innerText = 'this is Content1'
//       document.body.appendChild(elem)
//     }
//   }

//   export class Footer {
//     constructor() {
//       const elem = document.createElement('div');
//       elem.innerText = 'this is Footer'
//       document.body.appendChild(elem)
//     }
//   }
// }



// 使用es6后


//子命名空间
export namespace SubComponent {
  export class Test {

  }
}

//导出interface 
export interface User {
  name: string;
}
export class Header {
  constructor() {
    const elem = document.createElement('div');
    elem.innerText = 'this is header'
    document.body.appendChild(elem)
  }
}

export class Content {
  constructor() {
    const elem = document.createElement('div');
    elem.innerText = 'this is Content1'
    document.body.appendChild(elem)
  }
}

export class Footer {
  constructor() {
    const elem = document.createElement('div');
    elem.innerText = 'this is Footer'
    document.body.appendChild(elem)
  }
}