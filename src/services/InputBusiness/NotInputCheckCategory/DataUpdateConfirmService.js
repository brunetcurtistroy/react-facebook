import axios from "configs/axios";

const APP_LIST = {
    updateYes: "/api/not-input-check-category/data-update-confirm/update-yes",
    changeUpdate: "/api/not-input-check-category/data-update-confirm/change-update",
    DataUpdateConfirm: "/api/not-input-check-category/overall-result-display-input/data-update-confirm"
};

const DataUpdateConfirmService = {
    async updateYes(params) {
        return axios.post(APP_LIST.updateYes, params);
    },

    async changeUpdate(params) {
        return axios.post(APP_LIST.changeUpdate, params);
    },
    
    async DataUpdateConfirm(params) {
        return axios.post(APP_LIST.DataUpdateConfirm, params);
    }
};

export default DataUpdateConfirmService;
