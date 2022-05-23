
import { message } from "antd";
import ReservesSelectScreenService from "services/ResultOutput/DispatchManage/ReservesSelectScreenService";

const ReservesSelectScreenAction = {
    getData(data) {
        return ReservesSelectScreenService.getData(data)
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
        return ReservesSelectScreenService.updateData(data)
    },

    deleteRecord(data) {
        return ReservesSelectScreenService.deleteRecord(data)
    }
};

export default ReservesSelectScreenAction;