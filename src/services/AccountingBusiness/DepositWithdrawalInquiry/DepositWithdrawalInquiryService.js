import axios from "configs/axios";

const apiPaths = {
  onSearch:"/api/deposit-withdrawal-inquiry/deposit-withdrawal-inquiry/retrieval"
};

const DepositWithdrawalInquiryService = {
  async getDataOnSearch (params) {
    return axios.get(apiPaths.onSearch, { params });
  }
};

export default DepositWithdrawalInquiryService;
