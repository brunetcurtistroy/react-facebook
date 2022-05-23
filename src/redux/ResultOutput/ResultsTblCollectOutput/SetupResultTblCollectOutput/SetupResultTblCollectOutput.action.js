import { message } from "antd";
import CourseSpecificStyleSettingExtendService from "services/ResultOutput/ResultsTblCollectOutput/SetupResultTblCollectOutput/SetupResultTblCollectOutputService";

const SetupResultTblCollectOutputAction = {
    getScreenData(data) {
        return CourseSpecificStyleSettingExtendService.getScreenData(data)
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
}

export default SetupResultTblCollectOutputAction;