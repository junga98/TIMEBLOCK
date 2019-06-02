/* 封装对后端的路由请求 */
import axios from 'axios'

export function getFetch(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
                params: params
            })
            .then(response => {
                resolve(response.data);
            })
            .catch((error) => {
                console.log(error)
                reject(error)
            })
    })
}

export function postFetch(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(response => {
                resolve(response.data);
            })
            .catch((error) => {
                console.log(error)
                reject(error)
            })
    })
}

export function deleteFetch(url, params) {
    return new Promise((resolve, reject) => {
        axios.delete(url, {
                params: params
            })
            .then(response => {
                resolve(response.data);
            })
            .catch((error) => {
                console.log(error)
                reject(error)
            })
    })
}

export default {
    getPresets(params) { // 获取所有预设
        return getFetch('/api/getPresets', params);
    },
    addPresets(params) { // 新增预设
        return postFetch('/api/addPresets', params);
    },
    delPresets(params) { // 删除预设
        return deleteFetch('/api/delPresets', params);
    },

    getDayBlocks(params) { // 获取当天blocks
        return getFetch('/api/getDayBlocks', params);
    },
    getWeekBlocks(params) { // 获取当周blocks
        return getFetch('/api/getWeekBlocks', params);
    },
    getMonthBlocks(params) { //获取当月blocks
        return getFetch('/api/getDayBlocks', params);
    },
    addBlocks(params) { // 新增当天blocks
        return postFetch('/api/addBlocks', params);
    },

    getProgress(params) { // 获取所有目标
        return getFetch('/api/getProgress', params);
    },
    addProgress(params) { // 新增目标
        return postFetch('/api/addProgress', params);
    },
    delProgress(params) { // 删除目标
        return deleteFetch('/api/delProgress', params);
    },
}