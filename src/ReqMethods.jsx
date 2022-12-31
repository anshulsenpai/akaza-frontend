import axios from "axios"

export const BASE_URL = "http://localhost:8000"
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMDFiY2U2ZGYxY2Q3YjM3NzM0ZDg2NiIsImlhdCI6MTY2MTA2NTkxMiwiZXhwIjoxNjYyMzYxOTEyfQ.mKIFr2K3YJ5F4bkqhg4F2lYrNpiAa2NJYeBbeN8d_Ow"

export const publicRequest = axios.create({
    baseURL: BASE_URL,
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    header: { "auth-token" : TOKEN }
});