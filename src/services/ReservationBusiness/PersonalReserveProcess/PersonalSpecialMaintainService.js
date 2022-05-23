
import axios from "configs/axios";

const API_LIST = {
    getDataTable: "/api/personal-reserve-process/personal-special-maintain",
    updateData: "/api/personal-reserve-process/personal-special-maintain/update-or-create"
};

const PersonalSpecialMaintainService = {
    async getDataTable(params) {
        return axios.get(API_LIST.getDataTable, {params});
    },

    async updateData(params) {
        return axios.post(API_LIST.updateData, params);
    } 
};

export default PersonalSpecialMaintainService;