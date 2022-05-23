import axios from "configs/axios";

const API_LIST = {
    GetScreenData: "/api/spread-input/spread-input/get-screen-data",
    Display: "/api/spread-input/spread-input/display",
    DataUpdate: "/api/spread-input/spread-input/data-update",
    zoomProcess:"/api/spread-input/spread-input/zoom-process",
    Download: "/api/spread-input/spread-input/download",
    listData: "/api/spread-input/spread-input/get-list-data",
    dataUpdateConfirm: "/api/spread-input/data-update-confirm/update-yes",
}

const SpreadInputService = {
    async GetScreenData(params) {
        return axios.get(API_LIST.GetScreenData, { params });
    },
    async Display(params) {
        return axios.get(API_LIST.Display, { params });
    },
    async DataUpdate(params) {
        return axios.put(API_LIST.DataUpdate, params);
    },
    async zoomProcess(params) {
        return axios.post(API_LIST.zoomProcess, params);
    },
    async download(params) {
        return axios.post(API_LIST.Download, params, {responseType: 'blob'});
    },
    async listData(params) {
        return axios.post(API_LIST.listData, params);
    },
    async dataUpdateConfirmService(params) {
        return axios.post(API_LIST.dataUpdateConfirm, params);
      },

}

export default SpreadInputService;
