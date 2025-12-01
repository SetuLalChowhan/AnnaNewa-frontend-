import axios from 'axios';

const useAxiosPublic = () => {
  const axiosPublic = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1',
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true, // Important: This sends cookies with requests
  });

  // Response interceptor
  axiosPublic.interceptors.response.use(
    (response) => response.data,
    (error) => {
      return Promise.reject(error.response?.data || error.message);
    }
  );

  return axiosPublic;
};

export default useAxiosPublic;