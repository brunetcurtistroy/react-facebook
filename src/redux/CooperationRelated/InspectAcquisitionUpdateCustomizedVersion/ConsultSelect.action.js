import { message } from "antd";
import ConsultSelectService from "services/CooperationRelated/InspectAcquisitionUpdateCustomizedVersion/ConsultSelectService";

const ConsultSelectAction = {
    getListData(data) {
        return ConsultSelectService.getListData(data)
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

    closeScreen(data) {
        return ConsultSelectService.closeScreen(data) 
    },
    changeSelect(data) {
        return ConsultSelectService.changeSelect(data) 
    }
}

export default ConsultSelectAction;