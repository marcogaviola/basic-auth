import axios from "axios";
export default () => {
  const instance = axios.create({
    baseURL: 'https://baseplate-api.appetiserdev.tech/api/v1/',
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  });
  // Add a request interceptor
  instance.interceptors.request.use(
    function (config) {
      // Do something before request is sent


      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );
  // Add a response interceptor
  instance.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
  if (localStorage.getItem('token')) {
    instance.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('token');
  }

  return instance;
};
