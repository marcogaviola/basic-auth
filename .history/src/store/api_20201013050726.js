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

      if (error.response.status === 404) {
        // window.location.replace('/404');
      }
      // if (error.response.status === 401 && localStorage.getItem('token')) {
      //   // delete local storage
      //   let loginUrl = "/user/login"
      //   localStorage.removeItem("token");
      //   if (window.location.pathname !== loginUrl) {
      //     window.location.replace(loginUrl);
      //   }
      // }
      // Do something with response error

      return Promise.reject(error);
    }
  );
  if (localStorage.getItem('token')) {
    instance.defaults.headers.common['Authorization'] = "bearer " + localStorage.getItem('token');
  }

  return instance;
};
