import axios from "axios";

const Axios = axios.create({
    baseURL: 'http://localhost:3501/',
    timeout: 1000,
});

export default Axios