
import { message } from "antd";
import InquiryService from "services/ResultOutput/CsvCreateParamMaintain/InquiryService";


const InquiryAction = {
    getListData() {
        return InquiryService.getListData() 
    },

    selectData(data) {
        return InquiryService.selectData(data)
    }
};

export default InquiryAction;