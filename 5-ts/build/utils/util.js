"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResponseData = void 0;
//返回类型固定的结果，接口标准化
const getResponseData = (data, errMsg) => {
    if (errMsg) {
        return {
            success: false,
            errMsg: errMsg,
            data
        };
    }
    return {
        success: true,
        data
    };
};
exports.getResponseData = getResponseData;
