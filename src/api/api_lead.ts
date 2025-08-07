import axios from "axios";
const apiLead = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: false,
});

export default apiLead;
