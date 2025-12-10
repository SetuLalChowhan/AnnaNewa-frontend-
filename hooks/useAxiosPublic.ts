import axios from 'axios';

const useAxiosPublic = () => {
  const axiosPublic = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1',
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true, // sends cookies
  });

  // Response interceptor
  axiosPublic.interceptors.response.use(
    (response) => response, // return full response, not just data
    (error) => {
      // safe fallback if error.response is undefined
      return Promise.reject(error.response?.data || error.message);
    }
  );

  return axiosPublic;
};

export default useAxiosPublic;
