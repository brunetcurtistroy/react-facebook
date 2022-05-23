import InsurerNumberInquiryService from "services/SpecificMedicalExamination/ConsultTicketInputProcessList/InsurerNumberInquiryService";
import { message } from "antd";

const InsurerNumberInquiryAction = {
    getTableData(data) {
    return InsurerNumberInquiryService.getTableData(data)
      .then((res) => {
          return res?.data;
      })
      .catch(error =>{
        const res = error.response;
        if(!res || res.data || res.data.message){
          message.error('エラーが発生しました');
        }
      })
  } 
};

export default InsurerNumberInquiryAction;