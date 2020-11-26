import axios from 'axios'
import qs from 'qs'


axios.interceptors.request.use(
    config => {
        // 此处添加config的操作，比如token
        return config;
    },
    error => Promise.reject(error)
);
axios.interceptors.response.use(response => {
    if (response.status === 200) {
        return response.data;
    } else {
        return Promise.reject(response.data)
    }
}, error => {
    return Promise.reject(error)
});


const http = function creatHttp(method, url, params, options = {}) {

    const option = {
        url: url,
        method: method,
        params: method === 'GET' || method === 'DELETE' ? params : null,
        data: method === 'POST' || method === 'PUT' ? qs.stringify(params) : null,
        headers: {'X-Requested-With': 'XMLHttpRequest'}, // , 'Content-Type': 'application/json'
        timeout: 5000,
        transformRequest: [() => JSON.stringify(params)] // 'Content-Type': 'application/json' 配置的
    };
    Object.assign(option, options);
    return new Promise((resolve, reject) => {
        axios(option)
            .then(res => {
                resolve(res)
            })
            .catch(response => {
                reject(response)
            })

    })

};
export default {
    get: (url, params, options ={}) => http('GET',url, params, options),
    post: (url, params, options ={}) => http('POST',url, params, options),
    put: (url, params, options ={}) => http('PUT',url, params, options),
    delete: ( url, params, options ={}) => http('DELETE',url, params, options)
}