interface Result<T> {
  success: boolean;
  errMsg?: string;
  data: T;
}

//返回类型固定的结果，接口标准化
export const getResponseData = <T>(data: T, errMsg?: string): Result<T> => {
  if (errMsg) {
    return {
      success: false,
      errMsg: errMsg,
      data
    }
  }
  return {
    success: true,
    data
  }
}