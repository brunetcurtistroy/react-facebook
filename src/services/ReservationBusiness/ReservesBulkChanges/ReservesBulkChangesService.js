import axios from 'configs/axios';

const apiPaths = {
    getScreenReservesBulkChanges: '/api/reserves-bulk-changes/reserves-bulk-changes/get-screen-data',
    Extract: '/api/reserves-bulk-changes/reserves-bulk-changes/display-button',
    InspectChanges_F09_01: '/api/reserves-bulk-changes/reserves-bulk-changes/inspect-changes-f-09-1',
    InspectChanges_F09_02: '/api/reserves-bulk-changes/reserves-bulk-changes/inspect-changes-f-09-2',
    Cancel_F10_01: '/api/reserves-bulk-changes/reserves-bulk-changes/cancel-f10-1',
    Cancel_F10_02: '/api/reserves-bulk-changes/reserves-bulk-changes/cancel-f10-2',
    ReserveChange_F11_01: '/api/reserves-bulk-changes/reserves-bulk-changes/reserve-change-f11-1',
    ReserveChange_F11_02: '/api/reserves-bulk-changes/reserves-bulk-changes/reserve-change-f11-2',
    getScreenReserveChange: '/api/reserves-bulk-changes/reserve-change/get-screen-data',
    eventF12: '/api/reserves-bulk-changes/reserve-change/f12',
    GetNameOfficeCode: '/api/reserves-bulk-changes/reserves-bulk-changes/get-name-office-code',
};

const ReservesBulkChangesService = {
    async getScreenReservesBulkChangesService() {
        return axios.get(apiPaths.getScreenReservesBulkChanges);
    },
    async ExtractService(params) {
        return axios.post(apiPaths.Extract, params);
    },
    async InspectChanges_F09_01Service() {
        return axios.post(apiPaths.InspectChanges_F09_01);
    },
    async InspectChanges_F09_02Service(params) {
        return axios.post(apiPaths.InspectChanges_F09_02, params);
    },
    async Cancel_F10_01Service() {
        return axios.post(apiPaths.Cancel_F10_01);
    },
    async Cancel_F10_02Service(params) {
        return axios.post(apiPaths.Cancel_F10_02, params);
    },
    async ReserveChange_F11_01Service() {
        return axios.post(apiPaths.ReserveChange_F11_01);
    },
    async ReserveChange_F11_02Service(params) {
        return axios.post(apiPaths.ReserveChange_F11_02, params);
    },
    async GetNameOfficeCodeService(params) {
        return axios.get(apiPaths.GetNameOfficeCode, {params});
    },

    // WS2556064_ReserveChange
    async getScreenReserveChangeService() {
        return axios.get(apiPaths.getScreenReserveChange);
    },
    async eventF12Service(params) {
        return axios.post(apiPaths.eventF12, params);
    },
}

export default ReservesBulkChangesService;