import axios from "configs/axios";

const APP_LIST = {
    copy: "/api/xml-param-maintain/copy/f12"
};

const CopyService = {
    async copyDataService(params) {
        return axios.post(APP_LIST.copy, params);
    }
};

export default CopyService;
