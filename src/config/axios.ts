import axios from "axios";

export const baseURL = process.env.REACT_APP_API_BASE_URL

const Axios = axios.create({
  baseURL: baseURL,
});

export default Axios;
