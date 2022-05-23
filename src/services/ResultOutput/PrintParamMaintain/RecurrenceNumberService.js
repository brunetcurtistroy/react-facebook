import axios from "configs/axios";

const APP_LIST = {
    getScreenData: "/api/print-param-maintain/recurrence-number/get-screen-data",
    f12: "/api/print-param-maintain/recurrence-number/f12",
};
const RecurrenceNumberService = {
    async getScreenData() {
        return axios.get(APP_LIST.getScreenData);
    },
    async F12(formData) {
        return axios.post(APP_LIST.f12, formData);
    },
};

export default RecurrenceNumberService;