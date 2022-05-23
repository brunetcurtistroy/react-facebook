import axios from "configs/axios";

const APP_LIST = {
    selectF12:"/api/consult-ticket-input-process-list/insurer-number-inquiry/select-f12" 
}
const InsurerNumberInquiryService = {
  async getTableData(params){  
    return axios.get(APP_LIST.selectF12 , {params});
  } 
};

export default InsurerNumberInquiryService;
