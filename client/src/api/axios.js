import axios from "axios";

const api= axios.create({
    baseURL:"/api",
    withCredentials:true, // sends the httpOnly auth cookie with every request
});

export default api;