import { message } from "antd";
import ParamPromptedQueryContentService from "services/AdvancePreparation/DocumentManageMaintain/ParamPromptedQueryContentService";

const ParamPromptedQueryContentAction = {
    getDataScreen(data) {
        return ParamPromptedQueryContentService.getDataScreen(data)
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
export default ParamPromptedQueryContentAction;