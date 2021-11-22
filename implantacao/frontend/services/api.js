import axios from "axios";

export const BASE_URL = "http://localhost:3000/api"

export const Client = axios.create({
  baseURL: BASE_URL
})