 import OfficeInquiryService from "services/ResultOutput/ResultsTblCollectOutput/SetupResultTblCollectOutput/WS1527022_OfficeInquiryService/OfficeInquiryService.js";

const OfficeInquiryAction = {
    GetListData(data) {
        return OfficeInquiryService.GetListData(data) 
    }
}

export default OfficeInquiryAction;
