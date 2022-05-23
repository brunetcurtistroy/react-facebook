import axios from "configs/axios";

const API_LIST = {
  Run_F12_API:
    "/api/results-tbl-collect-output/course-based-determine-by-style-setting/pattan-copy/run-f12",
};

const WS0458010_PattanCopyService = {
  async run_F12_Service(params) {
    return axios.post(API_LIST.Run_F12_API, params);
  },
};

export default WS0458010_PattanCopyService;
