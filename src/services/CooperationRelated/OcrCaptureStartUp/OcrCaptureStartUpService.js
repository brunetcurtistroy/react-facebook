import axios from "configs/axios";

const apiPaths = {
    getScreenData : "/api/ocr-capture-start-up/ocr-capture-start-up/get-screen-data",
    readButton : "/api/ocr-capture-start-up/ocr-capture-start-up/read",
    batchDeleteBefore : "/api/ocr-capture-start-up/ocr-capture-start-up/f7-before",
    batchDeleteAfter : "/api/ocr-capture-start-up/ocr-capture-start-up/f7-after",
    getInfoProcess : "/api/ocr-capture-start-up/ocr-capture-start-up/get-info-process-select",
};

const OcrCaptureStartUpService = {
  async ReadButton (params) {
    return axios.get(apiPaths.readButton, {params});
  },

  async getScreenData () {
    return axios.get(apiPaths.getScreenData);
  },

  async batchDeleteBefore () {
    return axios.get(apiPaths.batchDeleteBefore);
  },

  async batchDeleteAfter () {
    return axios.get(apiPaths.batchDeleteAfter);
  },

  async getInfoProcess (params) {
    return axios.get(apiPaths.getInfoProcess, {params});
  }
};
  
export default OcrCaptureStartUpService;
