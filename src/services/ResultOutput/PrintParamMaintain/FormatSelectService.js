import axios from "configs/axios";

const APP_LIST = {
    OpenFolder: "/api/print-param-maintain/format-select/OpenFolder",
    BackupCreate: "/api/print-param-maintain/format-select/BackupCreate",
    Select:"/api/print-param-maintain/format-select/Select"
};
const FormatSelectService = {
    async OpenFolder() {
        return axios.get(APP_LIST.OpenFolder);
    },
    async BackupCreate(data) {
        return axios.get(APP_LIST.BackupCreate, data);
    },
    async OpeningAFile() {
        return axios.get(APP_LIST.Select);
    }
};

export default FormatSelectService;