
import axios from "configs/axios";

const API_LIST = {
    getDataScreen: "/api/personal-reserve-process",
    getDataScreenUpdate: "/api/personal-reserve-process/input-item-update",
    getDataSetSelect: "/api/personal-reserve-process/set-select",
    getDataInspectSelect: "/api/personal-reserve-process/inspect-select",
    getDataSelectOptions: "/api/personal-reserve-process/select-options",
    getDataInspectChange: "/api/personal-reserve-process/inspect-change",
    contractRedisplay: "/api/personal-reserve-process/contract-redisplay",
    setChange: "/api/personal-reserve-process/set-change",
    setDelete: "/api/personal-reserve-process/set-delete",
    breakDown: "/api/personal-reserve-process/breakdown", 

    ConfirmProcessBtn_F12: "/api/personal-reserve-process/confirm-process-btn-f12",
    amountCalculate: '/api/personal-reserve-process/amount-calculate',
    newReceptConfirmed: '/api/personal-reserve-process/new-recept-confirmed',
    newConfirm: '/api/personal-reserve-process/new-confirm',
    acceptChangeConfirm: '/api/personal-reserve-process/accept-change-confirm', 
    reserveChangeConfirm: '/api/personal-reserve-process/reserve-change-confirm',

    updateData: '/api/personal-reserve-process/update-or-create',
    updateDataTax: '/api/personal-reserve-process/save-data-right',
    updateDataBilling: '/api/personal-reserve-process/update-billing-data',

    userAction3: '/api/personal-reserve-process/user-action-3',

    getInfoPersonal: '/api/personal-reserve-process/get-info-personal-basic',
    getInfoOffice: '/api/personal-reserve-process/get-info-office-code',
    getInfoConsultCourse:  '/api/personal-reserve-process/get-info-consult-course',
    changeReserveNum:  '/api/personal-reserve-process/reserve-num',
    ConsultHistory:  '/api/personal-reserve-process/consult-history',
    getDataIndex:  '/api/personal-reserve-process/get-data-index', // get data input  
};

const PersonalReserveProcessService = {
    async getDataScreen(params) {
        return axios.get(API_LIST.getDataScreen, { params });
    },

    async getDataScreenUpdate(params) {
        return axios.get(API_LIST.getDataScreenUpdate, { params });
    },

    async getDataSetSelect(params) {
        return axios.get(API_LIST.getDataSetSelect, { params });
    },

    async getDataInspectSelect(params) {
        return axios.get(API_LIST.getDataInspectSelect, { params });
    },

    async getDataSelectOptions(params) {
        return axios.get(API_LIST.getDataSelectOptions, { params });
    },

    async getDataInspectChange(params) {
        return axios.get(API_LIST.getDataInspectChange, {params});
    },

    async contractRedisplay(params) {
        return axios.post(API_LIST.contractRedisplay, params);
    },

    async setChange(params) {
        return axios.get(API_LIST.setChange, { params });
    },

    async setDelete(params) {
        return axios.delete(API_LIST.setDelete, { params });
    },

    async breakDown(params) {
        return axios.get(API_LIST.breakDown, { params });
    },

    async ConfirmProcessBtn_F12(params) {
        return axios.post(API_LIST.ConfirmProcessBtn_F12, params);
    },

    async amountCalculate(params) {
        return axios.post(API_LIST.amountCalculate, params);
    },

    async newReceptConfirmed(params) {
        return axios.post(API_LIST.newReceptConfirmed, params);
    },

    async newConfirm(params) {
        return axios.post(API_LIST.newConfirm, params);
    },

    async acceptChangeConfirm(params) {
        return axios.post(API_LIST.acceptChangeConfirm, params);
    }, 

    async reserveChangeConfirm(params) {
        return axios.post(API_LIST.reserveChangeConfirm, params);
    },

    async updateData(params) {
        return axios.post(API_LIST.updateData, params);
    },

    async updateDataTax(params) {
        return axios.post(API_LIST.updateDataTax, params);
    },

    async updateDataBilling(params) {
        return axios.post(API_LIST.updateDataBilling, params);
    },

    async userAction3(params) {
        return axios.post(API_LIST.userAction3, params);
    },

    async getInfoPersonal(params) {
        return axios.get(API_LIST.getInfoPersonal, {params});
    },

    async getInfoOffice(params) {
        return axios.get(API_LIST.getInfoOffice, {params});
    },

    async getInfoConsultCourse(params) {
        return axios.get(API_LIST.getInfoConsultCourse, {params});
    },

    async changeReserveNum(params) {
        return axios.post(API_LIST.changeReserveNum, params);
    },

    async ConsultHistory(params) {
        return axios.post(API_LIST.ConsultHistory, params);
    },

    async getDataIndex(params) {
        return axios.post(API_LIST.getDataIndex, params);
    },
};

export default PersonalReserveProcessService;
