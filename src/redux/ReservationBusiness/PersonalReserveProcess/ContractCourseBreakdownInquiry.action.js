import { message } from "antd";
import ContractCourseBreakdownInquiryService from "services/ReservationBusiness/PersonalReserveProcess/ContractCourseBreakdownInquiryService";

const ContractCourseBreakdownInquiryAction = {
    GetTreeData(data) {
        return ContractCourseBreakdownInquiryService.GetTreeData(data)
    } 
}
export default ContractCourseBreakdownInquiryAction;