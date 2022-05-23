import axios from "configs/axios";

const apiPaths = {
    getListData: "/api/results-tbl-collect-output/setup-result-tbl-collect-output/classify-inquiry/list-data",
    deleteData: "/api/results-tbl-collect-output/setup-result-tbl-collect-output/classify-inquiry/delete-data",
};

const ClassifyInquiryService = {
    async getListData() {
        return axios.get(apiPaths.getListData);
    },
    async deleteData(params) {
        return axios.delete(apiPaths.deleteData, { params });
    },
};

export default ClassifyInquiryService;
