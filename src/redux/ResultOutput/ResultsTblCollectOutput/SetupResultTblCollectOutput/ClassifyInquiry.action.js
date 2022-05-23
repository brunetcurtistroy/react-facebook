import { message } from "antd";
import ClassifyInquiryService from "services/ResultOutput/ResultsTblCollectOutput/SetupResultTblCollectOutput/ClassifyInquiryService";

const ClassifyInquiryAction = {
    getListData(data) {
        return ClassifyInquiryService.getListData(data)
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
    deleteData(data) {
        return ClassifyInquiryService.deleteData(data)
    },
}

export default ClassifyInquiryAction;