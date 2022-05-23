import axios from "configs/axios";

const APP_LIST = {
    inputexec: "/api/print-param-maintain/uptake-file-list/input-exec",
};
const UptakeFileListService = {
    async inputexec(params) {
        return axios.post(APP_LIST.inputexec, params);
    },
};

export default UptakeFileListService;