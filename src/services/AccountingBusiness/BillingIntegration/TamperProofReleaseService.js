import axios from "configs/axios"; 
const API_LIST = {
  F12: "/api/billing-integration/invoice/get-screen-data",
};

const TamperProofReleaseService = {
  async F12(params) { 
    return axios.post(API_LIST.F12,  params );
  }
}; 
export default TamperProofReleaseService;
