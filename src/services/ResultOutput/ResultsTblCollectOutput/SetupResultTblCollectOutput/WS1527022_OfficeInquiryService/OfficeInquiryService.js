import axios from "configs/axios";

const apiPaths = {
  GetListData: "/api/results-tbl-collect-output/setup-result-tbl-collect-output/style-setting-hira/office-inquiry"
};

const OfficeInquiryService = {
  async GetListData(params) {
    return axios.get(apiPaths.GetListData, { params });
  }
};

export default OfficeInquiryService;
