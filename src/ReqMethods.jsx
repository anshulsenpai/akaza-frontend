import axios from "axios"

export const BASE_URL = "https://akaza-games-api.onrender.com"  //prod
// export const BASE_URL = "http://localhost:8000" // local
const TOKEN = null

export const publicRequest = axios.create({
    baseURL: BASE_URL,
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    header: { "auth-token" : TOKEN }
});