import axios from "configs/axios";

const APP_LIST = {
    getListData: "/api/csv-create-param-maintain/user-param-input0",
    deteteData: "/api/csv-create-param-maintain/user-param-input0/delete-data",
    saveData: "/api/csv-create-param-maintain/user-param-input0/save-data",
    f9: "/api/csv-create-param-maintain/user-param-input0/f9",
    f10: '/api/csv-create-param-maintain/user-param-input0/f10',
    GZoomBefore: "/api/csv-create-param-maintain/user-param-input0/gzoom-before",
    GzoomAfter: '/api/csv-create-param-maintain/user-param-input0/gzoom-after'
};

const UserParamInput0Service = {
    async getListData(params) {
        return axios.get(APP_LIST.getListData, { params});
    },

    async deleteData(params) {
        return axios.delete(APP_LIST.deteteData, { params });
    },

    async saveData(params) {
        return axios.post(APP_LIST.saveData, params);
    },

    async f9(params) {
        return axios.get(APP_LIST.f9, { params });
    },
    async f10(params) {
        return axios.get(APP_LIST.f10, { params });
    },
    async GZoomBefore(params) {
        return axios.get(APP_LIST.GZoomBefore, { params });
    },
    async GzoomAfter(params) {
        return axios.get(APP_LIST.GzoomAfter, { params });
    }
};

export default UserParamInput0Service;
