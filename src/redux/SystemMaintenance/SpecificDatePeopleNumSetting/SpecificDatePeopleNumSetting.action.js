import { message } from "antd";
import SpecificDatePeopleNumSettingService from "services/SystemMaintenance/SpecificDatePeopleNumSetting/SpecificDatePeopleNumSettingService";

const SpecificDatePeopleNumSettingAction = {
    getScreenData() {
        return SpecificDatePeopleNumSettingService.getScreenData()
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

    getDateList(data) {
        return SpecificDatePeopleNumSettingService.getDateList(data)
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

    deleteDateList(data) {
        return SpecificDatePeopleNumSettingService.deleteDateList(data)
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

    getNumPeopleSet(data) {
        return SpecificDatePeopleNumSettingService.getNumPeopleSet(data)
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

    updateNumPeopleSet(data) {
        return SpecificDatePeopleNumSettingService.updateNumPeopleSet(data)
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

    eventF4(data) {
        return SpecificDatePeopleNumSettingService.eventF4(data)
    }
}

export default SpecificDatePeopleNumSettingAction;