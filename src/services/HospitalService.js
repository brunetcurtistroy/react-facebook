import axios from 'configs/axios';

import ApiPaths from "../constants/ApiPaths";

const HospitalService = {
    getList() {
        return axios.get(ApiPaths.HOSPITAL.LIST);
    }
}

export default HospitalService;
