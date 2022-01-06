interface Result {
  success: boolean;
  errMsg?: string;
  data: any;
}

//返回类型固定的结果，接口标准化
export const getResponseData = (data: any, errMsg?: string): Result => {
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