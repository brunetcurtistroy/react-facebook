import axios from "configs/axios";

const API_LIST = {
  CopyAPI: "/api/spread-input/copy",
};

const CopyService = {
  async CopyService(params) {
    return axios.post(API_LIST.CopyAPI, params);
  },
};

export default CopyService;
