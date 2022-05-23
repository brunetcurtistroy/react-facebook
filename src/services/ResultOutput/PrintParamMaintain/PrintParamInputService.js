import axios from "configs/axios";

const APP_LIST = {
    instructionDivision:"/api/print-param-maintain/print-param-input/getInstructionDivision",
    code:"/api/print-param-maintain/print-param-input/code",
    getListData:"/api/print-param-maintain/print-param-input/",
    paramsitem : "/api/print-param-maintain/print-param-input/params-item",
    saveData: "/api/print-param-maintain/print-param-input/save-and-update",
    deleteData: "/api/print-param-maintain/print-param-input/delete",
    saveparamsitem: "/api/print-param-maintain/print-param-input/save-and-update-params-item",
    deleteparamsitem: "/api/print-param-maintain/print-param-input/delete-params-item",
    updatef12: "/api/print-param-maintain/print-param-input/update-f12",
    w1cdchange: "/api/print-param-maintain/print-param-input/w1-cd-change",
    w1instructionsectchange: "/api/print-param-maintain/print-param-input/w1-instruction-sect-change",
    w1parameterchange: "/api/print-param-maintain/print-param-input/w1-parameter-change",
    duplicationcheckf11: "/api/print-param-maintain/print-param-input/duplication-check-f11",
    nextsearchctrln: "/api/print-param-maintain/print-param-input/next-search-ctrl-n",
    zoomw1cd: "/api/print-param-maintain/print-param-input/zoom-w1-cd",
    zoomw1cd1: "/api/print-param-maintain/print-param-input/zoom-w1-cd-1",
    
};
const PrintParamInputService = {
  async getInstructionDivision(data) {
    return axios.get(APP_LIST.instructionDivision, data );
  },
  async getCode(data) {
      return axios.get(APP_LIST.code, data );
  },
  async getListData(params) {
    return axios.get(APP_LIST.getListData, {params});
  },
  async saveData(params) {
    return axios.post(APP_LIST.saveData, params);
  },
  async deleteData(params) {
    return axios.delete(APP_LIST.deleteData, { params });
  },
  async getParramItem(params) {
    return axios.get(APP_LIST.paramsitem, {params});
  },
  async saveParramItem(params) {
    return axios.post(APP_LIST.saveparamsitem, params);
  },
  async deleteParramItem(params) {
    return axios.delete(APP_LIST.deleteparamsitem, { params });
  },
  async updatef12(params) {
    return axios.post(APP_LIST.updatef12, params);
  },
  async w1cdchange(params) {
    return axios.post(APP_LIST.w1cdchange, params);
  },
  async w1instructionsectchange(params) {
    return axios.post(APP_LIST.w1instructionsectchange, params);
  },
  async w1parameterchange(params) {
    return axios.post(APP_LIST.w1parameterchange, params);
  },
  async duplicationcheckf11(params) {
    return axios.post(APP_LIST.duplicationcheckf11, params);
  },
  async nextsearchctrln(params) {
    return axios.post(APP_LIST.nextsearchctrln, params);
  },
  async zoomw1cd(params) {
    return axios.post(APP_LIST.zoomw1cd, params);
  },
  async zoomw1cd1(params) {
    return axios.post(APP_LIST.zoomw1cd1, params);
  },
};
  
  export default PrintParamInputService;