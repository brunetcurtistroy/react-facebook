import { message } from "antd";
import ExamineeListService from "services/InputBusiness/ExamineeList/ExamineeListService";

const ExamineeListAction = {
    getDataExamineeList(data) {
        return ExamineeListService.getDataExamineeList(data)
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

    excelReport(data) {
        return ExamineeListService.excelReport(data)
    },

    eventF11() {
        return ExamineeListService.eventF11()
    }
}

export default ExamineeListAction;