import { message } from "antd";
import StyleListListDataService from "services/ResultOutput/ResultsTblCollectOutput/SetupResultTblCollectOutput/StyleListListDataService";

const StyleListListDataAction = {
    getListData(data) {
        return StyleListListDataService.getListData(data)
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
        return StyleListListDataService.saveData(data)
    },

    deleteData(data) {
        return StyleListListDataService.deleteData(data)
    },
}

export default StyleListListDataAction;