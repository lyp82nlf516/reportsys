import './fetch-min.js';
import { Message } from 'element-ui';
import { base } from '@/utils/mUtils.js';
let baseUrl;
let routerMode;

if (process.env.NODE_ENV === 'development') {
    baseUrl = '';
    routerMode = 'hash'
} else {
    baseUrl = base;
    routerMode = 'hash'
}

function parseJSON(response) {
    try {
        let json = response.json();
        return json;
    } catch (e) {
        Message.error('登录超时');
    }
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }

    const error = new Error(response.statusText);
    error.response = response;
    throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
    return fetch(baseUrl + url, options)
        .then(checkStatus)
        .then(parseJSON)
        .then((data) => {
            if (data.code !== '0') {
                throw new Error(data.msg);
            }
            return {
                success: true,
                ...data
            }
        })
        .catch((error) => {
            let msg = error.message || 'Network Error'
                //  Message.error('请登录');
            return { success: false, message: msg }
        });
}