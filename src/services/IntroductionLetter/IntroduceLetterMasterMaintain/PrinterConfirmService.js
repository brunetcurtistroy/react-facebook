import axios from "configs/axios";

const API_LIST = {
  getScreenData: '/api/introduce-letter-issued-main/printer-confirm/get-screen-data',
  print: '/api/introduce-letter-issued-main/printer-confirm/print',
  review: '/api/introduce-letter-issued-main/printer-confirm/review',
};

const PrinterConfirmService = {
  async getScreenData() {
    return axios.get(API_LIST.getScreenData)
  },
  async print(params) {
    return axios.post(API_LIST.print, params)
  },
  async review(params) {
    return axios.post(API_LIST.review, params)
  }
};

export default PrinterConfirmService;
