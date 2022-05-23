import axios from "configs/axios";

const APP_LIST = { 
    getListData: "/api/csv-create-param-maintain/inquiry",
    selectData: "/api/csv-create-param-maintain/inquiry/select",
};

const InquiryService = { 
    async getListData() {
        return axios.get(APP_LIST.getListData);
    },

    async selectData(params) {
        return axios.get(APP_LIST.selectData, {params});
    }
};

export default InquiryService;
