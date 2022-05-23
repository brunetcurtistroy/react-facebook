import axios from "configs/axios";

const API_LIST = {
    GetScreenData: "/api/personal-reserve-process/medical-exam-contents-inquiry-sub",
};

const MedicalExamContentsInquirySubService = {
  async GetScreenData(params) {
    return axios.get(API_LIST.GetScreenData , {params});
  },
};

export default MedicalExamContentsInquirySubService;
