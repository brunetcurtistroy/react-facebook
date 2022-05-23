
import { message } from "antd";
import FormInquiryService from "services/ResultOutput/MedicalExamDataOutputCsv/FormInquiryService";

const FormInquiryAction = {
    GetScreenData(data) {
        return FormInquiryService.GetScreenData(data)
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
};

export default FormInquiryAction;