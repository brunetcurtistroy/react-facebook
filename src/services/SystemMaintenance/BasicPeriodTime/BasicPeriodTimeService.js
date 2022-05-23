import axios from "configs/axios";

const API_LIST = {
  BasicPeriodTime: "/api/basic-period-time/basic-period-time",
  DeleteBasicPeriodTime: "/api/basic-period-time/basic-period-time/delete",
  RegisterButtonSelectBasicPeriodTime:
    "/api/basic-period-time/basic-period-time/register-button-select",
  SaveAndUpdateBasicPeriodTime:
    "/api/basic-period-time/basic-period-time/save-and-update",
};

const BasicPeriodTimeService = {
  async getBasicPeriodTimeService() {
    return axios.get(API_LIST.BasicPeriodTime);
  },
  async deleteBasicPeriodTimeService(params) {
    console.log(params);
    return axios.delete(API_LIST.DeleteBasicPeriodTime, { params });
  },
  async registerButtonSelectBasicPeriodTimeService(params) {
    console.log(params);
    return axios.post(API_LIST.RegisterButtonSelectBasicPeriodTime, params);
  },
  async saveAndUpdateBasicPeriodTimeService(params) {
    console.log(params);
    return axios.post(API_LIST.SaveAndUpdateBasicPeriodTime, params);
  },
};

export default BasicPeriodTimeService;
