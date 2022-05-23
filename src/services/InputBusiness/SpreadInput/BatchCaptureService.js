import axios from "configs/axios";

const API_LIST = {
  BatchCaptureAPI: "/api/spread-input/batch-capture/exec",
};

const BatchCaptureService = {
  async BatchCaptureService(params) {
    return axios.post(API_LIST.BatchCaptureAPI, params);
  },
};

export default BatchCaptureService;
