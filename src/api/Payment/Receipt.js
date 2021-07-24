import axios from "axios";

export default axios.create({
    baseURL: 'https://kota201.xyz/aplikasi_spp/public/api/',
    headers: {
        'Accept': 'multipart/form-data'
    }
});