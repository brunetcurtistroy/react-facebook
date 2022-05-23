import axios from "configs/axios";

const apiPaths = {
  getDataContent: "/api/ocr-capture-start-up/setting-ocr-capture/ocr-check/content",
  getDataOcrCheck: "/api/ocr-capture-start-up/setting-ocr-capture/ocr-check",
  fileAcquisition_F12: "/api/ocr-capture-start-up/setting-ocr-capture/ocr-check/f12",
};

const OcrCheckService = {
  async getDataContent(params) {
    return axios.get(apiPaths.getDataContent, { params });
  },

  async getDataOcrCheck(params) {
    return axios.post(apiPaths.getDataOcrCheck, params);
  },

  async fileAcquisition_F12(params) {
    return axios.post(apiPaths.fileAcquisition_F12, params);
  }
};

export default OcrCheckService;
