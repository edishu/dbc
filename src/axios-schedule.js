import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://dbtc-74557.firebaseio.com/'
});

export default instance;