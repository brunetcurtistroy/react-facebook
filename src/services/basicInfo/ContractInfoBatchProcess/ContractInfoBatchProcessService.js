import axios from 'configs/axios';

const apiPaths = {
  getContractInfoBatchProcess: '/api/contract-info-batch-process/displayBtn',
  getInspectItemSearchQuerySingleSist : '/api/contract-info-batch-process/inspect-item-search-query-single',
  getSetInfoSearchList: '/api/contract-info-batch-process/set-info-search',
  SelectAllContractInfoBatchProcess: '/api/contract-info-batch-process/select-all',
  SelectOneContractInfoBatchProcess:'/api/contract-info-batch-process/w1-enabled-disabled-change',

  getScreenDataContractEditingSub: '/api/contract-info-batch-process/contract-editing-sub',
  getContractEditingSubSetInclude: '/api/contract-info-batch-process/contract-editing-sub/set-includes',
  getContractEditingSubInspectContent: '/api/contract-info-batch-process/contract-editing-sub/contract-inspect-content',
  addContractEditingSub: '/api/contract-info-batch-process/contract-editing-sub/add',
  removeContractEditingSub: '/api/contract-info-batch-process/contract-editing-sub/delete',
  saveAndUpdateContractEditingSub: '/api/contract-info-batch-process/contract-editing-sub/save-and-update',
  saveAmountSub: '/api/contract-info-batch-process/contract-editing-sub/money-amount-input-sub',
  contractList: '/api/contract-info-batch-process/contract-editing-sub/all-contract-list',

  getContractLineItemDisplay: '/api/contract-info-batch-process/contract-line-item-display',
  confirmDeleteLine: '/api/contract-info-batch-process/delete-line',
  deleteLine: '/api/contract-info-batch-process/delete-line/delete',
  getContractInspectInquiry: '/api/contract-info-batch-process/contract-inspect-inquiry',
  getContractInspectCondition: '/api/contract-info-batch-process/contract-inspect-condition',
  getScreenDataConditionSetting: '/api/contract-info-batch-process/condition-setting/get-screen-data',
  saveButtonConditionSetting: '/api/contract-info-batch-process/condition-setting/save-button',
  deleteButtonConditionSetting: '/api/contract-info-batch-process/condition-setting/delete-button',
  doubleClickDeleteContractEditingSub: '/api/contract-info-batch-process/contract-editing-sub/db-click',
  getScreenDataSetInfoSearch: '/api/contract-info-batch-process/set-info-search/get-screen-data',
};


const ContractInfoBatchProcessService = {
  // WS0331001_ContractInfoBatchProcess
  async getContractInfoBatchProcessService(params) {
    return axios.get(apiPaths.getContractInfoBatchProcess, {params});
  },

  async confirmDeleteLineService(params) {
    return axios.get(apiPaths.confirmDeleteLine, {params});
  },

  async deleteLineService(params) {
    return axios.delete(apiPaths.deleteLine, {params});
  },

  async SelectAllContractInfoBatchProcessService(params) {
    return axios.post(apiPaths.SelectAllContractInfoBatchProcess, params);
  },

  async SelectOneContractInfoBatchProcessService(params) {
    return axios.post(apiPaths.SelectOneContractInfoBatchProcess, params);
  },

  // WS0271001_InspectItemSearchQuerySingle
  async getInspectItemSearchQuerySingleSistService(params) {
    return axios.get(apiPaths.getInspectItemSearchQuerySingleSist, {params});
  },

  // WS0302001_SetInfoSearch
  async getSetInfoSearchListService(params) {
    return axios.get(apiPaths.getSetInfoSearchList, {params});
  },
  async getScreenDataSetInfoSearchService(params) {
    return axios.get(apiPaths.getScreenDataSetInfoSearch, {params});
  },

  // WS0310004_ContractEditingSub
  async getScreenDataContractEditingSubService(params) {
    return axios.get(apiPaths.getScreenDataContractEditingSub, {params});
  },

  async getContractEditingSubSetIncludeService(params) {
    return axios.get(apiPaths.getContractEditingSubSetInclude, {params});
  },

  async getContractEditingSubInspectContentService(params) {
    return axios.get(apiPaths.getContractEditingSubInspectContent, {params});
  },

  async addContractEditingSubService(params) {
    return axios.post(apiPaths.addContractEditingSub, params);
  },

  async removeContractEditingSubService(params) {
    return axios.delete(apiPaths.removeContractEditingSub, {params});
  },

  async saveAndUpdateContractEditingSubService(params) {
    return axios.post(apiPaths.saveAndUpdateContractEditingSub, params);
  },

  async saveAmountSub(params) {
    return axios.post(apiPaths.saveAmountSub, params);
  },

  async contractList(params) {
    return axios.get(apiPaths.contractList, {params});
  },

  // WS0605127_ContractLineItemDisplay
  async getContractLineItemDisplayService(params) {
    return axios.get(apiPaths.getContractLineItemDisplay, {params});
  },

  // WS0605162_ContractInspectInquiry
  async getContractInspectInquiryService(params) {
    return axios.get(apiPaths.getContractInspectInquiry, {params});
  },
  
  // WS0605130_ContractInspectCondition
  async getContractInspectConditionService(params) {
    return axios.get(apiPaths.getContractInspectCondition, {params});
  },

  // WS0310120_ConditionSetting
  async getScreenDataConditionSettingService(params) {
    return axios.get(apiPaths.getScreenDataConditionSetting, {params});
  },

  async saveButtonConditionSettingService(params) {
    return axios.post(apiPaths.saveButtonConditionSetting, params);
  },

  async deleteButtonConditionSettingService(params) {
    return axios.delete(apiPaths.deleteButtonConditionSetting, {params});
  },

  async doubleClickDeleteContractEditingSubService(params) {
    return axios.delete(apiPaths.doubleClickDeleteContractEditingSub, params);
  },
};

export default ContractInfoBatchProcessService;
