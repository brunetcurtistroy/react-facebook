import axios from "configs/axios";

const apiPaths = {
  getInit:"/api/billing-inquiry/display-item/get-screen-data"
};

const DisplayItemService = {
  async getInit (params) {
    return axios.get(apiPaths.getInit, { params });
  }
};

export default DisplayItemService;
