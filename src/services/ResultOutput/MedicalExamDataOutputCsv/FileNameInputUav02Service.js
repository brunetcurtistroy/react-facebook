import axios from "configs/axios";

const APP_LIST = {
    GetScreenData: "/api/medical-exam-data-output-csv/file-name-input-uav02",
    useaction1: "/api/medical-exam-data-output-csv/file-name-input-uav02/user-action-1"
};

const FileNameInputUav02Service = {
    async GetScreenData(params) {
        return axios.get(APP_LIST.GetScreenData, {params});
    },
    async useaction1(params) {
        return axios.get(APP_LIST.useaction1, {params});
    },

};

export default FileNameInputUav02Service;