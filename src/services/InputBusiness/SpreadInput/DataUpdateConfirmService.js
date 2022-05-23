import axios from "configs/axios";

const API_LIST = {
    dataUpdateConfirm: "/api/spread-input/data-update-confirm/update-yes",
};

const DataUpdateConfirmService = {
  async dataUpdateConfirmService(params) {
    return axios.post(API_LIST.dataUpdateConfirm, params);
  },
};

export default DataUpdateConfirmService;