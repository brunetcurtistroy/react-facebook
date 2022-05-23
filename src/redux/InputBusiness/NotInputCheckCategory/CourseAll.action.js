
import { message } from "antd";
import CourseAllService from "services/InputBusiness/NotInputCheckCategory/CourseAllService";

const CourseAllAction = {
    getDataScreen(data) {
        return CourseAllService.getDataScreen(data)
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

    getListData(data) {
        return CourseAllService.getListData(data)
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

export default CourseAllAction;