import { ContractInfoBatchProcessTypes } from './ContractInfoBatchProcess.types';
import ContractInfoBatchProcessService from 'services/basicInfo/ContractInfoBatchProcess/ContractInfoBatchProcessService';
import { message, } from "antd";

// WS0331001_ContractInfoBatchProcess
export const getContractInfoBatchProcessAction = (params) => {
  return ContractInfoBatchProcessService.getContractInfoBatchProcessService(params)
    .then((res) => {
      //console.log(res);
      return res.data
    })
    .catch((err) => {
      console.log(err.response?.data?.message);
    });
};

export const setInfoMaintain = (infoMaintains) => {
  return { type: ContractInfoBatchProcessTypes.SET_CONTRACT_INFO, infoMaintains };
};

export const confirmDeleteLineAction = (params) => {
  return ContractInfoBatchProcessService.confirmDeleteLineService(params)
    .then((res) => {
      //console.log(res);
      return res.data
    })
    .catch((err) => {
      console.log(err.response.data.message);
    });
};

export const deleteLineAction = (params) => {
  return ContractInfoBatchProcessService.deleteLineService(params)
    .then((res) => {
      //console.log(res);
      return res.data
    })
    .catch((err) => {
      console.log(err.response.data.message);
    });
};

export const SelectAllContractInfoBatchProcessAction = (params) => {
  return ContractInfoBatchProcessService.SelectAllContractInfoBatchProcessService(params)
};

export const SelectOneContractInfoBatchProcessAction = (params) => {
  return ContractInfoBatchProcessService.SelectOneContractInfoBatchProcessService(params)
};

// WS0271001_InspectItemSearchQuerySingle
export const getInspectItemSearchQuerySingleSistAction = (params) => {
  return ContractInfoBatchProcessService.getInspectItemSearchQuerySingleSistService(params)
};

// WS0302001_SetInfoSearch
export const getSetInfoSearchListAction = (params) => {
  return ContractInfoBatchProcessService.getSetInfoSearchListService(params)
    .then((res) => {
      //console.log(res);
      return res.data
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getScreenDataSetInfoSearchAction = (params) => {
  return ContractInfoBatchProcessService.getScreenDataSetInfoSearchService(params)
};

// WS0310004_ContractEditingSub
export const getScreenDataContractEditingSubAction = (params) => {
  return ContractInfoBatchProcessService.getScreenDataContractEditingSubService(params)
    .then((res) => {
      //console.log(res);
      return res.data
    })
    .catch((err) => {
      const res = err.response;
      if (!res || !res.data || !res.data.message) {
        message.error("エラーが発生しました");
        return;
      }
      message.error(res.data.message);
    });
};

export const getContractEditingSubSetIncludeAction = (params) => {
  return ContractInfoBatchProcessService.getContractEditingSubSetIncludeService(params)
    .then((res) => {
      //console.log(res);
      return res.data
    })
    .catch((err) => {
      const res = err.response;
      if (!res || !res.data || !res.data.message) {
        message.error("エラーが発生しました");
        return;
      }
      message.error(res.data.message);
    });
};

export const getContractEditingSubInspectContentAction = (params) => {
  return ContractInfoBatchProcessService.getContractEditingSubInspectContentService(params)
    .then((res) => {
      //console.log(res);
      return res.data
    })
    .catch((err) => {
      const res = err.response;
      if (!res || !res.data || !res.data.message) {
        message.error("エラーが発生しました");
        return;
      }
      message.error(res.data.message);
    });
};

export const addContractEditingSubAction = (params) => {
  return ContractInfoBatchProcessService.addContractEditingSubService(params)
};

export const removeContractEditingSubAction = (params) => {
  return ContractInfoBatchProcessService.removeContractEditingSubService(params)
};

export const saveAndUpdateContractEditingSubAction = (params) => {
  return ContractInfoBatchProcessService.saveAndUpdateContractEditingSubService(params)
    .then((res) => {
      //console.log(res);
      return res.data
    })
    .catch((err) => {
      const res = err.response;
      if (!res || !res.data || !res.data.message) {
        message.error("エラーが発生しました");
        return;
      }
      message.error(res.data.message);
    });
};

export const saveAmountSub = (params) => {
  return ContractInfoBatchProcessService.saveAmountSub(params)
};

export const contractListAction = (params) => {
  return ContractInfoBatchProcessService.contractList(params)
};

// WS0605127_ContractLineItemDisplay 
export const getContractLineItemDisplayAction = (params) => {
  return ContractInfoBatchProcessService.getContractLineItemDisplayService(params)
    .then((res) => {
      //console.log(res);
      return res.data
    })
    .catch((err) => {
      //console.log(err);
    });
};

// WS0605162_ContractInspectInquiry
export const getContractInspectInquiryAction = (params) => {
  return ContractInfoBatchProcessService.getContractInspectInquiryService(params)
    .then((res) => {
      //console.log(res);
      return res.data
    })
    .catch((err) => {
      console.log(err);
    });
};

// WS0605130_ContractInspectCondition
export const getContractInspectConditionAction = (params) => {
  return ContractInfoBatchProcessService.getContractInspectConditionService(params)
    .then((res) => {
      //console.log(res);
      return res.data
    })
    .catch((err) => {
      console.log(err);
    });
};

// WS0310120_ConditionSetting
export const getScreenDataConditionSettingAction = (params) => {
  return ContractInfoBatchProcessService.getScreenDataConditionSettingService(params)
};

export const saveButtonConditionSettingAction = (params) => {
  return ContractInfoBatchProcessService.saveButtonConditionSettingService(params)
};

export const deleteButtonConditionSettingAction = (params) => {
  return ContractInfoBatchProcessService.deleteButtonConditionSettingService(params)
};

export const doubleClickDeleteContractEditingSubAction = (params) => {
  return ContractInfoBatchProcessService.doubleClickDeleteContractEditingSubService(params)
};