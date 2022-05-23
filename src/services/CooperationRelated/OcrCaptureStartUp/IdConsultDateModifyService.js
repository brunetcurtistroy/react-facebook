import axios from "configs/axios";

const apiPaths = {
  DataConsultHistorySub:
    "/api/ocr-capture-start-up/id-consult-date-modify/consult-history-sub",
  GetScreenData: "/api/ocr-capture-start-up/id-consult-date-modify/",
  Update: "/api/ocr-capture-start-up/id-consult-date-modify/update",
  User_Action_4: "/api/ocr-capture-start-up/id-consult-date-modify/action-4",
};

const IdConsultDateModifyService = {
  async dataConsultHistorySubService(params) {
    return axios.get(apiPaths.DataConsultHistorySub, { params });
  },
  async getScreenDataService(params) {
    return axios.get(apiPaths.GetScreenData, { params });
  },
  async updateService(params) {
    return axios.post(apiPaths.Update, { params });
  },
  async user_Action_4Service(params) {
    return axios.get(apiPaths.User_Action_4, { params });
  },
};

export default IdConsultDateModifyService;
