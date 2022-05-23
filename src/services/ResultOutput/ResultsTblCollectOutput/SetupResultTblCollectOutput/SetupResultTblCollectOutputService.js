import axios from "configs/axios";

const apiPaths = {
    getScreenData: "/api/results-tbl-collect-output/setup-result-tbl-collect-output/get-screen-data",
};

const SetupResultTblCollectOutputService = {
    async getScreenData() {
        return axios.get(apiPaths.getScreenData);
    },
};

export default SetupResultTblCollectOutputService;
