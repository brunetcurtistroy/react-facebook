import axios from "configs/axios";

const apiPaths = {
  getScreenData: "/api/receipt-pre-issue20/receipt-pre-issue/get-screen-data",
  searchBtn: "/api/receipt-pre-issue20/receipt-pre-issue/search-btn",
  displayList: "/api/receipt-pre-issue20/receipt-pre-issue/display-list",
  eventCtrlo: "/api/receipt-pre-issue20/receipt-pre-issue/event-ctrl-o",
  eventF3: "/api/receipt-pre-issue20/receipt-pre-issue/event-f3",
  eventF3After: "/api/receipt-pre-issue20/receipt-pre-issue/event-f3-after",
  runBtn: "/api/receipt-pre-issue20/receipt-pre-issue/run-btn",
  changeCheckbox: '/api/receipt-pre-issue20/receipt-pre-issue/change',
  changeOfficeCode: '/api/receipt-pre-issue20/receipt-pre-issue/change-office-code',
  exit: "/api/receipt-pre-issue20/receipt-pre-issue/exit",
};

const ReceiptPreIssueService = {
  async getScreenData() {
    return axios.get(apiPaths.getScreenData);
  },
  async searchBtn(params) {
    return axios.get(apiPaths.searchBtn, { params })
  },
  async displayList() {
    return axios.get(apiPaths.displayList)
  },
  async eventCtrlo() {
    return axios.get(apiPaths.eventCtrlo)
  },
  async eventF3(params) {
    return axios.get(apiPaths.eventF3, { params })
  },
  async eventF3After(params) {
    return axios.get(apiPaths.eventF3After, { params })
  },
  async runBtn(params = null) {
    return axios.get(apiPaths.runBtn, { params })
  },
  async changeCheckbox(params = null) {
    return axios.post(apiPaths.changeCheckbox, params)
  },
  async changeOfficeCode(params) {
    return axios.post(apiPaths.changeOfficeCode, params)
  },
  async exit() {
    return axios.get(apiPaths.exit)
  }
};

export default ReceiptPreIssueService;
