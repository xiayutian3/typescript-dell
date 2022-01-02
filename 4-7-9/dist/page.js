// namespace Component {
define("component", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Footer = exports.Content = exports.Header = exports.SubComponent = void 0;
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
    var SubComponent;
    (function (SubComponent) {
        class Test {
        }
        SubComponent.Test = Test;
    })(SubComponent = exports.SubComponent || (exports.SubComponent = {}));
    class Header {
        constructor() {
            const elem = document.createElement('div');
            elem.innerText = 'this is header';
            document.body.appendChild(elem);
        }
    }
    exports.Header = Header;
    class Content {
        constructor() {
            const elem = document.createElement('div');
            elem.innerText = 'this is Content1';
            document.body.appendChild(elem);
        }
    }
    exports.Content = Content;
    class Footer {
        constructor() {
            const elem = document.createElement('div');
            elem.innerText = 'this is Footer';
            document.body.appendChild(elem);
        }
    }
    exports.Footer = Footer;
});
// //命名空间
define("page", ["require", "exports", "component"], function (require, exports, component_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Page {
        constructor() {
            new component_1.Header();
            new component_1.Content();
            new component_1.Footer();
        }
    }
    exports.default = Page;
});
