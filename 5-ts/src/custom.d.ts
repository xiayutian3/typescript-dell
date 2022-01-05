/**
 * 自定义的类型文件
 * 类型融合后就不会报错了
 * 解决 ：当我使用中间件的时候，对res req做了修改之后，实际上类型并不能实时改变，
 */
//  namespace Express {  //也可以这么写
declare namespace Express {
  interface Request {
    teacherName: string;
  }
}