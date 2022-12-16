import axios from 'axios';

const BASE_URL = 'https://dummyjson.com/';

export const getAxiosInstance = async () => {
  try {
  } catch (e) {
  } finally {
    const instance = axios.create({
      baseURL: BASE_URL,
      headers: {
        Accept: 'application/json',
        // 'Content-Type': 'multipart/form-data',
      },
    });

    instance.interceptors.request.use(
      function (config) {
        //   if (token) {
        //     config.headers = {
        //       ...config.headers,
        //       Authorization: `Bearer ${token}`,
        //     };
        //   }

        return config;
      },
      function (error) {
        return Promise.reject(error);
      },
    );

    instance.interceptors.response.use(
      response =>
        new Promise((resolve, reject) => {
          resolve(response);
        }),
      error => {
        if (!error.response) {
          return new Promise((resolve, reject) => {
            reject(error);
          });
        }
        // console.log('STATUS CODE======', error.response);
      },
    );

    return instance;
  }
};
