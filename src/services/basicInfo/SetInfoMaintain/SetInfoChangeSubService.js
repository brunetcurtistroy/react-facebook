import axios from "configs/axios";

const apiPaths = {
    getScreenData: "/api/set-info-maintain/set-info-change-sub",
    getCondition: "/api/set-info-maintain/set-info-change-sub/inspect-set/condition-etc",
    getComboboxStartDate: "/api/set-info-maintain/set-info-change-sub/combo-box-startdate",
    getLeftListData: "/api/set-info-maintain/set-info-change-sub/inspect-set/retrieval",
    getLeftExamListData: "/api/set-info-maintain/set-info-change-sub/inspect-set/left-exam-list-whole",
    getLeftSetListData: "/api/set-info-maintain/set-info-change-sub/inspect-set/left-set-list-whole",
    getRightListData: "/api/set-info-maintain/set-info-change-sub/inspect-set/right-exam-list",
    addInspectItem: "/api/set-info-maintain/set-info-change-sub/inspect-set/add-inspect-new",
    removeInspectItem: "/api/set-info-maintain/set-info-change-sub/inspect-set/remove-inspect",
    outputButton: "/api/set-info-maintain/set-info-change-sub/output-btn",
    updateButton: "/api/set-info-maintain/set-info-change-sub/update-data",
    createData: "/api/set-info-maintain/set-info-change-sub/insert-data",
    changeCondition: "/api/set-info-maintain/set-info-change-sub/inspect-set/condition-etc/condition-effective",
    getExamName: "/api/set-info-maintain/set-info-maintain/get-name-designated-inspect-code",
    historyDelete: "/api/set-info-maintain/set-info-change-sub/history-deletion",
};

const SetInfoChangeSubService = {
  async getScreenData(params) {
    return axios.get(apiPaths.getScreenData, {params});
  },

  async getComboboxStartDate(params) {
    return axios.get(apiPaths.getComboboxStartDate, {params});
  },

  async getCondition(params) {
    return axios.get(apiPaths.getCondition, {params});
  },

  async getLeftListData(params) {
    return axios.get(apiPaths.getLeftListData, {params});
  },

  async getLeftExamListData(params) {
    return axios.get(apiPaths.getLeftExamListData, {params});
  },

  async getLeftSetListData(params) {
    return axios.get(apiPaths.getLeftSetListData, {params});
  },

  async getRightListData(params) {
    return axios.get(apiPaths.getRightListData, {params});
  },

  async addInspectItem(params) {
    return axios.post(apiPaths.addInspectItem, params);
  },

  async removeInspectItem(params) {
    return axios.post(apiPaths.removeInspectItem, params);
  },

  async outputButton(params) {
    return axios.post(apiPaths.outputButton, params);
  },

  async updateButton(params) {
    return axios.post(apiPaths.updateButton, params);
  },

  async createData(params) {
    return axios.post(apiPaths.createData, params);
  },

  async changeCondition(params) {
    return axios.post(apiPaths.changeCondition, params);
  },

  async getExamName(params) {
    return axios.get(apiPaths.getExamName, {params});
  },

  async historyDelete(params) {
    return axios.post(apiPaths.historyDelete, params);
  },
};
  
export default SetInfoChangeSubService;
