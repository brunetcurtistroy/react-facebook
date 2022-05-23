import axios from "configs/axios";

const apiPaths = {
    getScreenData: "/api/associate-insure-money-amount-setting/money-amount-added-general",
    updateRecord: "/api/associate-insure-money-amount-setting/money-amount-added-general",
};

const MoneyAmountAddedGeneralService = {
  async getScreenData(params) {
    return axios.get(apiPaths.getScreenData, {params});
  },

  async updateRecord(params) {
    return axios.put(apiPaths.updateRecord, params);
  }
};
  
export default MoneyAmountAddedGeneralService;