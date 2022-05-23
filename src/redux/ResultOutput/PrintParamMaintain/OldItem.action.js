import OldItemService from "services/ResultOutput/PrintParamMaintain/OldItemService"
import { message } from "antd";

const OldItemAction = {
    paramIndicationNameObtainingSu(data) {
        return OldItemService.paramIndicationNameObtainingSu(data)
        .then((res) => {
            return res?.data;
        })
        .catch((err) => {
            message.error(err.response.data.message);
            console.log(err.response.data.message);
        });
    },
    getScreenData(data) {
        return OldItemService.getScreenData(data)
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
        return OldItemService.saveData(data)
    },
    deleteData(data) {
        return OldItemService.deleteData(data)
    },
    instructiondivisionchange(data) {
        return OldItemService.instructiondivisionchange(data)
    },
}
export default OldItemAction;