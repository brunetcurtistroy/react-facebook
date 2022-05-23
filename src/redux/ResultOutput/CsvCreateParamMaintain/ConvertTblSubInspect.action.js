
import { message } from "antd";
import ConvertTblSubInspecthService from "services/ResultOutput/CsvCreateParamMaintain/ConvertTblSubInspecthService";


const ConvertTblSubInspecthAction = {
    getScreenData(data) {
        return ConvertTblSubInspecthService.getScreenData(data)
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
        return ConvertTblSubInspecthService.saveData(data)
    },
    deleteData(data) {
        return ConvertTblSubInspecthService.deleteData(data)
    },
};

export default ConvertTblSubInspecthAction;