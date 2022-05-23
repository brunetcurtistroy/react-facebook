import axios from "configs/axios";

const pathMoreDetail = {
  getMoreDetail: "/api/personal-reserve-process/more-detail",
};

const MoreDetailService = {
  async getMoreDetailService(params) {
    return axios.get(pathMoreDetail.getMoreDetail , {params});
  },
};

export default MoreDetailService;
