import axios from "configs/axios";

const apiPaths = {
  getDataScreen: "/api/radiography-finding-input/radiography-finding-input/get-screen-data",
  retrieval: "/api/radiography-finding-input/radiography-finding-input/retrival",
  getDataTable: "/api/radiography-finding-input/radiography-finding-input/display",

  selectExpression_48: '/api/radiography-finding-input/radiography-finding-input/select-expression-48',
  updateSubEvent: ' /api/radiography-finding-input/radiography-finding-input/user-action-2',
  deleteSubEvent: '/api/radiography-finding-input/radiography-finding-input/user-action-5',
  updateData: '/api/radiography-finding-input/radiography-finding-input/event-f12',
};

const RadiographyFindingInputService = {
  async getDataScreen(params) {
    return axios.get(apiPaths.getDataScreen, { params });
  },

  async retrieval(params) {
    return axios.post(apiPaths.retrieval, params);
  },

  async getDataTable(params) {
    return axios.get(apiPaths.getDataTable, { params });
  },

  async selectExpression_48(params) {
    return axios.post(apiPaths.selectExpression_48, params);
  },

  async updateSubEvent(params) {
    return axios.post(apiPaths.updateSubEvent, params);
  },

  async deleteSubEvent(params) {
    return axios.post(apiPaths.deleteSubEvent, params);
  },

  async updateData(params) {
    return axios.post(apiPaths.updateData, params);
  },
};

export default RadiographyFindingInputService;
