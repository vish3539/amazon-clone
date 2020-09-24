import axios from 'axios';

const instance = axios.create({
    baseURL: '...' // the API(cloud Function) URL
})

export default instance;