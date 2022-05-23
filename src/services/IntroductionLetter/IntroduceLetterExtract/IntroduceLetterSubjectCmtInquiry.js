import axios from "configs/axios";

const API_LIST = {
  getScreenData:
    "/api/introduce-letter-extract/introduce-letter-subject-cmt-inquiry/",
};

const IntroduceLetterSubjectCmtInquiryService = {
  async onGetScreenData(params) {
    return axios.get(API_LIST.getScreenData, { params });
  },

};

export default IntroduceLetterSubjectCmtInquiryService;
