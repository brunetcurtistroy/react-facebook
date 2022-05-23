import axios from "configs/axios";

const API_LIST = {
  GetScreenData:
    "/api/inspect-item-convert-internal/external-inspect-amount-of-qualitative-transformation/get-list-data",
  SaveData:
    "/api/inspect-item-convert-internal/external-inspect-amount-of-qualitative-transformation/save-data",
  DeleteData:
    "/api/inspect-item-convert-internal/external-inspect-amount-of-qualitative-transformation/delete-data",
};

const ExternalInspectAmountOfQualitativeTransformationService = {
  async GetScreenData(params) { 
    return axios.get(API_LIST.GetScreenData, { params });
  },
  async SaveData(params) { 
    return axios.post(API_LIST.SaveData, params );
  },
  async DeleteData(params) { 
    return axios.delete(API_LIST.DeleteData, { params });
  },
};

export default ExternalInspectAmountOfQualitativeTransformationService;
