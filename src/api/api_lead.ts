import axios from 'axios';

const apiLead = axios.create({
    baseURL: '/api',
});

export default apiLead;
