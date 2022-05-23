import axios from "configs/axios";

const apiPaths = {
    getInfoMaintain : 'api-path',

    getListSetIdentify: "/api/set-info-maintain/set-info-maintain/get-screen-data",
    tableDataSubSet: "/api/set-info-maintain/set-info-maintain/sub-set",
    changeDivision: "/api/set-info-maintain/set-info-maintain/sub-set/expression-12",
    deleteData: "/api/set-info-maintain/set-info-maintain/sub-set/delete",

    cloneData: "/api/set-info-maintain/set-info-maintain/copy-set",
    searchInfoBatchProcess: "/api/set-info-maintain/set-info-batch-process/display",

    btnf09: "/api/set-info-maintain/set-info-maintain/btn-f09",
    outbtnf09: "/api/set-info-maintain/set-info-maintain/output-btn-f09",
};

const SetInfoMaintainService = {
  async getInfoMaintain () {
    return axios.get(apiPaths.getInfoMaintain);
  },

  async getListSetIdentify () {
    return axios.get(apiPaths.getListSetIdentify);
  },

  async getSetInfoTableDataSubSet (params) {
    return axios.get(apiPaths.tableDataSubSet, {params});
  },

  async changeDivision (params) {
    return axios.get(apiPaths.changeDivision, {params});
  },

  async deleteData (params) {
    return axios.delete(apiPaths.deleteData, {params});
  },

  async cloneSetManagementInfo (params) {
    return axios.post(apiPaths.cloneData, params);
  },

  async btnf09 (params) {
    return axios.post(apiPaths.btnf09, params);
  },

  async outbtnf09 (params) {
    return axios.post(apiPaths.outbtnf09, params,{responseType:'blob'});
  }
};
  
export default SetInfoMaintainService;
