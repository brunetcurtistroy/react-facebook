import { message } from "antd";
import PersonalSpecialMaintainService from "services/ReservationBusiness/PersonalReserveProcess/PersonalSpecialMaintainService";

const PersonalSpecialMaintainAction = {
    getDataTable(data) {
        return PersonalSpecialMaintainService.getDataTable(data)
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

    updateData(data) {
        return PersonalSpecialMaintainService.updateData(data)
    }
}
export default PersonalSpecialMaintainAction;