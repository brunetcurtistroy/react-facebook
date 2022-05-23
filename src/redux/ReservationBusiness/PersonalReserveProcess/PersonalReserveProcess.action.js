import { message } from "antd";
import PersonalReserveProcessService from "services/ReservationBusiness/PersonalReserveProcess/PersonalReserveProcessService";

const PersonalReserveProcessAction = {
    getDataScreen(data) {
        return PersonalReserveProcessService.getDataScreen(data)
    },

    getDataScreenUpdate(data) {
        return PersonalReserveProcessService.getDataScreenUpdate(data)
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

    getDataSetSelect(data) {
        return PersonalReserveProcessService.getDataSetSelect(data)
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

    getDataInspectSelect(data) {
        return PersonalReserveProcessService.getDataInspectSelect(data)
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

    getDataSelectOptions(data) {
        return PersonalReserveProcessService.getDataSelectOptions(data)
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

    getDataInspectChange(data) {
        return PersonalReserveProcessService.getDataInspectChange(data)
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

    contractRedisplay(data) {
        return PersonalReserveProcessService.contractRedisplay(data)
    },

    setChange(data) {
        return PersonalReserveProcessService.setChange(data)
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

    setDelete(data) {
        return PersonalReserveProcessService.setDelete(data)
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

    breakDown(data) {
        return PersonalReserveProcessService.breakDown(data)
    },

    ConfirmProcessBtn_F12(data) {
        return PersonalReserveProcessService.ConfirmProcessBtn_F12(data)
    },

    amountCalculate(data) {
        return PersonalReserveProcessService.amountCalculate(data)
    },

    newReceptConfirmed(data) {
        return PersonalReserveProcessService.newReceptConfirmed(data)
    },

    newConfirm(data) {
        return PersonalReserveProcessService.newConfirm(data)
    },

    acceptChangeConfirm(data) {
        return PersonalReserveProcessService.acceptChangeConfirm(data)
    },

    reserveChangeConfirm(data) {
        return PersonalReserveProcessService.reserveChangeConfirm(data)
    },

    updateData(data) {
        return PersonalReserveProcessService.updateData(data)
    },

    updateDataTax(data) {
        return PersonalReserveProcessService.updateDataTax(data)
    },

    updateDataBilling(data) {
        return PersonalReserveProcessService.updateDataBilling(data)
    },

    userAction3(data) {
        return PersonalReserveProcessService.userAction3(data);
    },

    getInfoPersonal(data) {
        return PersonalReserveProcessService.getInfoPersonal(data);
    },

    getInfoOffice(data) {
        return PersonalReserveProcessService.getInfoOffice(data);
    },

    getInfoConsultCourse(data) {
        return PersonalReserveProcessService.getInfoConsultCourse(data);
    }, 

    changeReserveNum(data) {
        return PersonalReserveProcessService.changeReserveNum(data);
    }, 

    ConsultHistory(data) {
        return PersonalReserveProcessService.ConsultHistory(data);
    }, 

    getDataIndex(data) {
        return PersonalReserveProcessService.getDataIndex(data);
    }, 
}
export default PersonalReserveProcessAction;
