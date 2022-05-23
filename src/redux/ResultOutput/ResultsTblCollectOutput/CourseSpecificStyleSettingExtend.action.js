import { message } from "antd";
import CourseSpecificStyleSettingExtendService from "services/ResultOutput/ResultsTblCollectOutput/CourseSpecificStyleSettingExtendService";

const CourseSpecificStyleSettingExtendAction = {
    getListData(data) {
        return CourseSpecificStyleSettingExtendService.getListData(data)
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

    saveData(data) {
        return CourseSpecificStyleSettingExtendService.saveData(data)
    },

    daleteData(data) {
        return CourseSpecificStyleSettingExtendService.daleteData(data)
    }
}

export default CourseSpecificStyleSettingExtendAction;