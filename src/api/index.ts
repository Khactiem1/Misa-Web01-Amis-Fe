import { environment } from "@/environments/environment.prod";
import axios from "axios";
const axiosAPI = axios.create({
  baseURL: environment.BASE_API,
});

//chưa cần đính token vào header
// axiosAPI.interceptors.request.use(
//   function (config) {
//     config.headers.tokenByClass = configs.tokenByClass;
//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );

axiosAPI.interceptors.request.use(
  function (config) {
    return config;
  },
);

axiosAPI.interceptors.response.use(
  function (response) {
    return response.data;
  },
);

export default axiosAPI;