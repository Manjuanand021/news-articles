import * as Config from '../config/config';

/**
 * Returns promise which rejects after given timeout in seconds
 * @param {API timeout in seconds} s
 * @returns Promise
 */
const timeout = function (s = Config.API_TIMEOUT_IN_SECONDS) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};

/**
 *
 * @param {api inputs} partialUrl
 * @returns API's resolved response
 */
export default async function fetchData(partialUrl) {
    if (!partialUrl) return;
    console.log('API URL', `${Config.API_URL}/${partialUrl}`);
    try {
        const response = await Promise.race([fetch(`${Config.API_URL}/${partialUrl}`), timeout()]);
        const data = await response.json();
        if (!response.ok) {
            throw new Error(`${data.message}, ${response.status}`);
        }
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
