import axios from "configs/axios";

const apiPaths = {
    getDataScreen: "/api/results-tbl-collect-output/course-specific-style-setting-extend/pattan-copy/get-screen-data",
    run_F12: "/api/results-tbl-collect-output/course-specific-style-setting-extend/pattan-copy/run-f12", 
};

const PattanCopyService = {
    async getDataScreen(params) {
        return axios.get(apiPaths.getDataScreen, { params });
    },

    async run_F12(params) {
        return axios.post(apiPaths.run_F12, params);
    } 
};

export default PattanCopyService;
