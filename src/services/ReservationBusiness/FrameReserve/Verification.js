import axios from "configs/axios";

const API_LIST = {
  verification: "/api/frame-reserve/verification",
};

const VerificationService = {
  async updateVerification(params) {
    console.log(params);
    return axios.post(API_LIST.verification, params);
  },
};

export default VerificationService;
