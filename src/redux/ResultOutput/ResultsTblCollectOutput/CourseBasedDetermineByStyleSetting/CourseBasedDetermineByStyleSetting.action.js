import { message } from "antd";
import CourseBasedDetermineByStyleSettingService from "services/ResultOutput/ResultsTblCollectOutput/CourseBasedDetermineByStyleSetting/CourseBasedDetermineByStyleSettingService";

const CourseBasedDetermineByStyleSettingAction = {
    getListData(data) {
        return CourseBasedDetermineByStyleSettingService.getListData(data)
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
        return CourseBasedDetermineByStyleSettingService.saveData(data)
    },
    deleteData(data) {
        return CourseBasedDetermineByStyleSettingService.deleteData(data)
    }
}

export default CourseBasedDetermineByStyleSettingAction;