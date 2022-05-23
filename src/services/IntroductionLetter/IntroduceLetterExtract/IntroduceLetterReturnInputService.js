import axios from "configs/axios";

const API_LIST = {
  getScreenDataAPI:
    "/api/introduce-letter-extract/introduce-letter-return-input/get-screen-data",
  getDataInputSubAPI:
    "/api/introduce-letter-extract/introduce-letter-return-input/inputsub",
  saveRecordAPI:
    "/api/introduce-letter-extract/introduce-letter-return-input/save-data",
  deleteRecordAPI:
    "/api/introduce-letter-extract/introduce-letter-return-input/delete-data",
  closeScreenSaveDataAPI:
    "/api/introduce-letter-extract/introduce-letter-return-input/close-screen",
};

const IntroduceLetterReturnInputService = {
  async getScreenDataService(params) {
    return axios.get(API_LIST.getScreenDataAPI, { params });
  },
  async getDataInputSubService(params) {
    return axios.get(API_LIST.getDataInputSubAPI, { params });
  },
  async saveRecordService(params) {
    return axios.post(API_LIST.saveRecordAPI, params);
  },
  async deleteRecordService(params) {
    return axios.delete(API_LIST.deleteRecordAPI, { params });
  },
  async closeScreenSaveDataService(params) {
    return axios.post(API_LIST.closeScreenSaveDataAPI, params);
  },
};

export default IntroduceLetterReturnInputService;
