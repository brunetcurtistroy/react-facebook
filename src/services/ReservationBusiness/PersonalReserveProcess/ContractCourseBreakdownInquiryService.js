
import axios from "configs/axios";

const API_LIST = {
    GetTreeData: "/api/personal-reserve-process/contract-course-breakdown-inquiry" 
};

const ContractCourseBreakdownInquiryService = {
    async GetTreeData(params) {
        return axios.get(API_LIST.GetTreeData, {params});
    } 
};

export default ContractCourseBreakdownInquiryService;