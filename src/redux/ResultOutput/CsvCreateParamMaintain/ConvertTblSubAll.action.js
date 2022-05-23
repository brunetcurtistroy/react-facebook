
import { message } from "antd";
import ConvertTblSubAllService from "services/ResultOutput/CsvCreateParamMaintain/ConvertTblSubAllService";


const ConvertTblSubAllAction = {
    getScreenData() {
        return ConvertTblSubAllService.getScreenData()
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
        return ConvertTblSubAllService.saveData(data)
    },
    deleteData(data) {
        return ConvertTblSubAllService.deleteData(data)
    },
    changeexamcode(data) {
        return ConvertTblSubAllService.changeexamcode(data)
    },
};

export default ConvertTblSubAllAction;