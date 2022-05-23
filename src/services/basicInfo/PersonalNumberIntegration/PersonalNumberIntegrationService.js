import axios from "configs/axios";

const apiPaths = {
    getScreenData : '/api/personal-number-integration/getScreenData',
    changePersonalNumber: '/api/personal-number-integration/change-personal-number',
    buttonF12: '/api/personal-number-integration/f12',
};

const PersonalNumberIntegrationService = {
  async getScreenDataService (params) {
    return axios.get(apiPaths.getScreenData, {params});
  },
  async changePersonalNumberService (params) {
    return axios.get(apiPaths.changePersonalNumber, {params});
  },
  async buttonF12Service (params) {
    return axios.post(apiPaths.buttonF12, params);
  }
};
export default PersonalNumberIntegrationService;