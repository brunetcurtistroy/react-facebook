import axios from "configs/axios";

const apiPaths = {
  getScreenData: "/api/receipt-pre-issue20/receipt-issue-online/get-screen-data",
  review: "/api/receipt-pre-issue20/receipt-issue-online/review",
  print: "/api/receipt-pre-issue20/receipt-issue-online/print",
};

const ReceiptIssueOnlineService = {
  async getScreenData(params) {
    return axios.get(apiPaths.getScreenData, {params});
  },
  
  async review(parram) {
    return axios.post(apiPaths.review, parram);
  },

  async print(parram) {
    return axios.post(apiPaths.print, parram);
  },
};

export default ReceiptIssueOnlineService;
