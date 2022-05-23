import axios from "configs/axios";

const apiPaths = {
    getScreenData: "/api/associate-insure-money-amount-setting/non-money-amount-general",
    updateRecord: "/api/associate-insure-money-amount-setting/non-money-amount-general",
};

const NonMoneyAmountGeneralService = {
  async getScreenData(params) {
    return axios.get(apiPaths.getScreenData, {params});
  },

  async updateRecord(params) {
    return axios.put(apiPaths.updateRecord, params);
  }
};
  
export default NonMoneyAmountGeneralService;