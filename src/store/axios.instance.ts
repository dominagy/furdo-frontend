import axios from "axios";

const $axios = axios.create({
  baseURL: "https://furdozok.herokuapp.com",
  withCredentials: true,
});

export default $axios;
