import ParamPromptedQuerySubService from "services/ResultOutput/PrintParamMaintain/ParamPromptedQuerySub/ParamPromptedQuerySubService"
import { message } from "antd";

const ParamPromptedQuerySubAction = {
    getScreenData(data) {
        return ParamPromptedQuerySubService.getScreenData(data)
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

    InstructDivisionQuerySub(data) {
        return ParamPromptedQuerySubService.InstructDivisionQuerySub(data)
    },

}
export default ParamPromptedQuerySubAction;