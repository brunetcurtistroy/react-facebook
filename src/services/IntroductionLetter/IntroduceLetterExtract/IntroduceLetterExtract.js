import axios from "configs/axios";

const API_LIST = {
  onEventDisplayBtn: '/api/introduce-letter-extract/introduce-letter-extract/display-btn',
  onEventF12: '/api/introduce-letter-extract/introduce-letter-extract/f12',
  onGetScreenData: '/api/introduce-letter-extract/introduce-letter-extract/get-screen-data',
  onGetIssueList: '/api/introduce-letter-extract/introduce-letter-extract/issue-list',
  onSelectSingleSwitching:
    "/api/introduce-letter-extract/introduce-letter-extract/select-switching",
  onSelectAllSwitching: '/api/introduce-letter-extract/introduce-letter-extract/select-all',
};

const IntroduceLetterExtractService = {
  async onEventDisplayBtn(params) {
    return axios.get(API_LIST.onEventDisplayBtn, { params });
  },
  async onEventF12(params) {
    return axios.get(API_LIST.onEventF12, { params });
  },
  async onGetScreenData(params) {
    return axios.get(API_LIST.onGetScreenData, { params });
  },
  async onGetIssueList(params) {
    return axios.get(API_LIST.onGetIssueList, { params });
  },
  async onSelectSingleSwitching(params) {
    return axios.get(API_LIST.onSelectSingleSwitching, { params });
  },
  async onSelectAllSwitching(params) {
    return axios.get(API_LIST.onSelectAllSwitching, { params });
  },

};

export default IntroduceLetterExtractService;
