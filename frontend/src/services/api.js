import axios from 'axios';


const axiosClient = axios.create({
  baseURL: "http://localhost:5000/api", 
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosClient.interceptors.request.use(
  
);

// interceptor cho các phản hồi
axiosClient.interceptors.response.use(
  (response) => {
    return response.data; 
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosClient;
