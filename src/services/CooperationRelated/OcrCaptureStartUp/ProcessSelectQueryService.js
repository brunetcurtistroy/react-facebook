import axios from "configs/axios";

const apiPaths = {
    getListData: "/api/ocr-capture-start-up/process-select-query",
};

const ProcessSelectQueryService = {
    async getListData() {
        return axios.get(apiPaths.getListData);
    }
};

export default ProcessSelectQueryService;
