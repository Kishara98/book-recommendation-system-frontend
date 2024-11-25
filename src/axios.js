import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://book-recommendation-system-wt3eo.ondigitalocean.app/api',  // Node.js backend base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
