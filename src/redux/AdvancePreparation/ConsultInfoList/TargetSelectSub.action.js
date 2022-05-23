import { message } from "antd";
import TargetSelectSubService from "services/AdvancePreparation/ConsultInfoList/TargetSelectSubService";

const TargetSelectSubAction = {
    getDataTable(params) {
        return TargetSelectSubService.getDataTable(params)
            // .then((res) => {
            //     return res?.data;
            // })
            // .catch((err) => {
            //     const res = err.response;
            //     if (!res || !res.data || !res.data.message) {
            //         message.error("エラーが発生しました");
            //         return;
            //     }
            //     message.error(res.data.message);
            // });
    },

    excelReport() {
        return TargetSelectSubService.excelReport()
            .then((res) => {
                return res;
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

    changeLogicAction(params) {
        return TargetSelectSubService.changeLogicService(params)
    },

    changeLogicAllAction(params) {
        return TargetSelectSubService.changeLogicAllService(params)
    }
}
export default TargetSelectSubAction;
