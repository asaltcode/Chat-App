import axios from "axios"
const AxiosService = axios.create({
    baseURL: "/api/v1/", //Produciton
})

export default AxiosService