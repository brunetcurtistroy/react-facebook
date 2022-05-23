import axios from "configs/axios";

const APP_LIST = {
    getData: "/api/dispatch-manage/reserves-select-screen",
    updateData: "/api/dispatch-manage/reserves-select-screen/save",
    deleteRecord: "/api/dispatch-manage/reserves-select-screen/delete"
};

const ReservesSelectScreenService = {
    async getData(params) {
        return axios.get(APP_LIST.getData, {params});
    },

    async updateData(params) {
        return axios.post(APP_LIST.updateData, params);
    },

    async deleteRecord(params) {
        return axios.delete(APP_LIST.deleteRecord, { params });
    }
};

export default ReservesSelectScreenService;
