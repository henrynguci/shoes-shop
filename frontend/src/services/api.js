import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:5000/api', // Replace this with your API base URL
  headers: {
    'Content-Type': 'application/json', // Adjust headers as needed
  },
});

export default axiosClient;
