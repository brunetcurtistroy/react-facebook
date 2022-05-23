import axios from "configs/axios";

const apiPaths = {
    getListData: "/api/results-tbl-collect-output/course-specific-style-setting-extend/office-inquiry", 
};

const OfficeInquiryService = {
    async getListData() {
        return axios.get(apiPaths.getListData);
    }
};

export default OfficeInquiryService;
