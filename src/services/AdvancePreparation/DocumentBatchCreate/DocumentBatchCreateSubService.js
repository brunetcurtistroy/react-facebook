import axios from "configs/axios";

const APP_LIST = {
  GetScreenData: "/api/create-document-batch/document-batch-create-sub/get-screen-data",
  FromSetTable: "/api/create-document-batch/document-batch-create-sub/form-select",
  ChangePrint: "/api/create-document-batch/document-batch-create-sub/change-print",
  ChangeSpecifiedIssue: "/api/create-document-batch/document-batch-create-sub/change-specified-issue",
  ChangeOutputPattern: "/api/create-document-batch/document-batch-create-sub/change-out-put-pattern",
  ChangeOutputUnit: "/api/create-document-batch/document-batch-create-sub/change-output-unit",
  PrintProcess: '/api/create-document-batch/document-batch-create-sub/print-process',

};

const DocumentBatchCreateSubService = {
  async GetScreenData(params) {
    return axios.get(APP_LIST.GetScreenData, { params });
  },
  async FromSetTable(params) {
    return axios.get(APP_LIST.FromSetTable, { params });
  },
  async ChangePrint(params) {
    return axios.post(APP_LIST.ChangePrint, params);
  },
  async ChangeSpecifiedIssue(params) {
    return axios.post(APP_LIST.ChangeSpecifiedIssue, params);
  },
  async ChangeOutputPattern(params) {
    return axios.post(APP_LIST.ChangeOutputPattern, params);
  },
  async ChangeOutputUnit(params) {
    return axios.post(APP_LIST.ChangeOutputUnit, params);
  },
  async PrintProcess(params) {
    return axios.get(APP_LIST.PrintProcess, { params, responseType: 'blob' })
  }
};

export default DocumentBatchCreateSubService;
