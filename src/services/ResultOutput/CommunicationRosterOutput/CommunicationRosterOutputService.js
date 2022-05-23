import axios from "configs/axios";

const APP_LIST = {
  screenData: "/api/communication-roster-output/communication-roster-output",
  getDataIssueList: "/api/communication-roster-output/communication-roster-output/issue-list",
  print: "/api/communication-roster-output/communication-roster-output/print",
  printAfter: "/api/communication-roster-output/communication-roster-output/print-after",
  getInfoStyle: "/api/communication-roster-output/communication-roster-output/get-info-gstyle-code",
};

const CommunicationRosterOutputService = {
  async getScreenData() {
    return axios.get(APP_LIST.screenData);
  },

  async getDataIssueList(params) {
    return axios.get(APP_LIST.getDataIssueList, { params });
  },

  async print(params) {
    return axios.post(APP_LIST.print, params);
  },

  async printAfter(params) {
    return axios.post(APP_LIST.printAfter, params,{responseType: 'blob'});
  },

  async getInfoStyle(params) {
    return axios.get(APP_LIST.getInfoStyle, { params });
  },

};

export default CommunicationRosterOutputService;
