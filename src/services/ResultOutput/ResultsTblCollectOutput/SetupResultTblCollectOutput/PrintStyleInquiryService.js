import axios from "configs/axios";

const apiPaths = {
  GetListData: "/api/results-tbl-collect-output/setup-result-tbl-collect-output/print-style-inquiry"
};

const PrintStyleInquiryService = {
  async GetListData(params) {
    return axios.get(apiPaths.GetListData, { params });
  }
};

export default PrintStyleInquiryService;
