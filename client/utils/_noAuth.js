import axios from "axios";

const _noAuth = axios.create({
  baseURL: "http://localhost:8000",
});

export default _noAuth;
