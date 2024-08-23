// lib/axiosClient.ts
import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://tech.jayacm.co.id:8081/jayacm/jayacm/api', // Root URL
  headers: {
    'Authorization': 'Bearer 6b9a204b88d55ee305500f8b6afe2d81f5fb66675316802add4b4a2c239e4f0b'
  }
});

export default axiosClient;
