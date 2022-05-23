import HourlyReserveListService from "services/ReservationBusiness/ReserveStatusSearch/HourlyReserveListService";
import { message } from "antd";

const HourlyReserveListAction = {
    GetScreenData(data) {
        return HourlyReserveListService.GetScreenData(data)
            .then((res) => {
                if (res.data) {
                    return res.data;
                }
            })
            .catch(error => {
                const res = error.response;
                if (!res || !res.data || !res.data.message) {
                    message.error('エラーが発生しました');
                    return;
                }
                message.error(res.data.message);
            });
    },

    TimeZoneList(data) {
        return HourlyReserveListService.TimeZoneList(data)
            .then((res) => {
                if (res.data) {
                    return res.data;
                }
            })
            .catch(error => {
                const res = error.response;
                if (!res || !res.data || !res.data.message) {
                    message.error('エラーが発生しました');
                    return;
                }
                message.error(res.data.message);
            });
    },

    ExamineeList(data) {
        return HourlyReserveListService.ExamineeList(data)
            .then((res) => {
                if (res.data) {
                    return res.data;
                }
            })
            .catch(error => {
                const res = error.response;
                if (!res || !res.data || !res.data.message) {
                    message.error('エラーが発生しました');
                    return;
                }
                message.error(res.data.message);
            });
    },

    user_action3(data) {
        return HourlyReserveListService.user_action3(data)
    },
};

export default HourlyReserveListAction;