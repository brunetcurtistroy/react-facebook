import axios from "configs/axios";

const API_LIST = {
  dataListAPI: "/api/e-medical-records-single-transmission/inspect-select",
};

const InspectSelectService = {
  async getDataListService() {
    return axios.get(API_LIST.dataListAPI);
  },
};

export default InspectSelectService;
