import axios from "configs/axios";

const apiPaths = {
    setCsvCreate: "/api/set-info-maintain/set-csv-create/f12",
};

const SetCsvCreateService = {
    async setCsvCreate(params) {
        return axios.post(apiPaths.setCsvCreate, params, {responseType: 'blob'});
    }
};

export default SetCsvCreateService;
