/*
 * @Description: 这是api（组件）
 * @Date: 2023-01-19 17:41:28
 * @Author: linguanyuan
 * @LastEditors: linguanyuan
 * @LastEditTime: 2023-02-14 11:03:31
 */

/**
 * apiList 
 * @return: {../../api/user.js: Module}
 */
const apiList = import.meta.globEager("../../api/*.js") 
const keys = Object.keys(apiList) // @return ['../../api/user.js']

const api = keys.reduce((total, item) => {
    const apiName = item.substring(10, item.length - 3); // 包头不包尾@return /../api/user

    return Object.keys(apiList[item]).reduce((apiTotal, key) => {
        apiTotal[apiName + key.replace(key[0], key[0].toUpperCase())] =
            apiList[item][key];
        return apiTotal;
    }, total);
}, {});
export default api;