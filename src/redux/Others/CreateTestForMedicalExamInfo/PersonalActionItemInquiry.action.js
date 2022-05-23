import { message } from "antd";
import PersonalActionItemInquiryService from "services/Others/CreateTestForMedicalExamInfo/PersonalActionItemInquiryService";


const PersonalActionItemInquiryAction = {
  GetTreeData() {
    return PersonalActionItemInquiryService.GetTreeData()
      .then((res) => {
        return res?.data;
      })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  },

  CategoryWriting(data) {
    return PersonalActionItemInquiryService.CategoryWriting(data)
      .then((res) => {
        return res?.data;
      })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  },

  InspectCodeWriting(data) {
    return PersonalActionItemInquiryService.InspectCodeWriting(data)
      .then((res) => {
        return res?.data;
      })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  }
}

export default PersonalActionItemInquiryAction;