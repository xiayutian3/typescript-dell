"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResponseData = void 0;
//返回类型固定的结果，接口标准化
var getResponseData = function (data, errMsg) {
    if (errMsg) {
        return {
            success: false,
            errMsg: errMsg,
            data: data
        };
    }
    return {
        success: true,
        data: data
    };
};
exports.getResponseData = getResponseData;
