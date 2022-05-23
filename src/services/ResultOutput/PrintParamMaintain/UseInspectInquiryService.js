import axios from "configs/axios";

const APP_LIST = {
    getScreenData: "/api/print-param-maintain/use-inspect-inquiry",
    getMaintain: "/api/print-param-maintain/use-inspect-inquiry/main-tain",
};
const UseInspectInquiryService = {
    async getScreenData(params) {
        return axios.get(APP_LIST.getScreenData , { params });
    },
    async getMaintain(params) {
        return axios.get(APP_LIST.getMaintain,{ params });
    },
};

export default UseInspectInquiryService;