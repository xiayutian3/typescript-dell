
//定义全局变量
declare namespace resposeResult {

  //返回的数据类型 
  interface CourseItem {
    title: string;
    year: string;
  }
  //爬取数据的类型
  interface DataStructure {
    [key: string]: CourseItem[];
  }

  // export type isLogin = boolean;
   type isLogin = boolean;
   type login = boolean;
   type logout = boolean;

   type getdata = boolean;
   type showdata = DataStructure | boolean;
} 