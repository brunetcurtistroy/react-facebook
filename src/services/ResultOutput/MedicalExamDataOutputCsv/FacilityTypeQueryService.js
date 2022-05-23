import axios from "configs/axios";

const APP_LIST = {
    GetScreenData: "/api/medical-exam-data-output-csv/facility-type-query",
};

const FacilityTypeQueryService = {
    async GetScreenData() {
        return axios.get(APP_LIST.GetScreenData);
    },
};

export default FacilityTypeQueryService;