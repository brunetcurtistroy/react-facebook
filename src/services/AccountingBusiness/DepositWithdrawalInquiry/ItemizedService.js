import axios from "configs/axios";

const apiPaths = {
    getScreenData: "/api/deposit-withdrawal-inquiry/itemized/get-screen-data",
    getDisplayData: "/api/deposit-withdrawal-inquiry/invoice-maintain/screen-display",
    eventExpandBtn: "/api/deposit-withdrawal-inquiry/itemized/expand-btn",
    eventStoreBtn: "/api/deposit-withdrawal-inquiry/itemized/store-btn",
    eventRearrangeBtn: "/api/deposit-withdrawal-inquiry/itemized/rearrange-btn",
    eventSummaryBtn: "/api/deposit-withdrawal-inquiry/itemized/summary-btn",
};

const ItemizedService = {
    async getScreenData(params) {
        return axios.post(apiPaths.getScreenData, params);
    },

    async getDisplayData(params) {
        return axios.get(apiPaths.getDisplayData, { params });
    },

    async eventExpandBtn() {
        return axios.post(apiPaths.eventExpandBtn);
    },

    async eventStoreBtn() {
        return axios.post(apiPaths.eventStoreBtn);
    },

    async eventRearrangeBtn(params) {
        return axios.post(apiPaths.eventRearrangeBtn, params);
    },

    async eventSummaryBtn(params) {
        return axios.post(apiPaths.eventSummaryBtn, params);
    },

};

export default ItemizedService;
