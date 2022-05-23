
import { message } from "antd";
import CsvCreateParamMaintainService from "services/ResultOutput/CsvCreateParamMaintain/CsvCreateParamMaintainService";


const CsvCreateParamMaintainAction = {
    getListData() {
        return CsvCreateParamMaintainService.getListData()
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

    advanceSetitng(data) {
        return CsvCreateParamMaintainService.advanceSetitng(data)
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

    deleteData(data) {
        return CsvCreateParamMaintainService.deleteData(data)
    },

    saveData(data) {
        return CsvCreateParamMaintainService.saveData(data)
    }, 

    f12(data) {
        return CsvCreateParamMaintainService.f12(data)
    },

    gzoomCource(data) {
        return CsvCreateParamMaintainService.gzoomCource(data)
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

    getNameCondition(data) {
        return CsvCreateParamMaintainService.getNameCondition(data)
    },
};

export default CsvCreateParamMaintainAction;