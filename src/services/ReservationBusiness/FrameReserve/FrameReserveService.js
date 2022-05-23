import axios from "configs/axios";

const API_LIST = {
  getScreenData: "/api/frame-reserve/frame-reserve",
};

const FrameReserveService = {
  async getScreenDataService(params) {
    return axios.get(API_LIST.getScreenData, { params });
  },
};

export default FrameReserveService;
