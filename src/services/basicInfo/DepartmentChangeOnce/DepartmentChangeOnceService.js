import axios from 'configs/axios';

const apiPaths = {
    getScreenData: '/api/department-change-once/get-screen-data',
    changeOfficeInfo: '/api/department-change-once/change-office-info',
    displayButton: '/api/department-change-once/display-button',

    getDataTableSelect: '/api/department-change-once/personal-select',
    allSelected: '/api/department-change-once/all-select-change',
    selectRecord: '/api/department-change-once/w2-enabled-disabled-change',

    run_F12: '/api/department-change-once/f12',
    getInsuranceInfoSet: '/api/department-change-once/insurance-info-set',
    updateInsuranceInfoSet: '/api/department-change-once/update-insurance-info-set',
    GetDataOfficeInfo: "/api/office-info-maintain-directly/office-info-retrieval-query/plant-list"
}

const DepartmentChangeOnceService = {
    async getScreenData() {
        return axios.get(apiPaths.getScreenData)
    },

    async changeOfficeInfo(params) {
        return axios.get(apiPaths.changeOfficeInfo, { params })
    },

    async displayButton(data) {
        return axios.post(apiPaths.displayButton, data)
    },

    async getDataTableSelect() {
        return axios.get(apiPaths.getDataTableSelect)
    },

    async allSelected(data) {
        return axios.post(apiPaths.allSelected, data)
    },

    async selectRecord(data) {
        return axios.post(apiPaths.selectRecord, data)
    },

    async run_F12(data) {
        return axios.post(apiPaths.run_F12, data)
    },

    async getInsuranceInfoSet(params) {
        return axios.get(apiPaths.getInsuranceInfoSet, { params })
    },

    async updateInsuranceInfoSet(data) {
        return axios.post(apiPaths.updateInsuranceInfoSet, data)
    },

    async GetDataOfficeInfo(params) {
        return axios.get(apiPaths.GetDataOfficeInfo, { params });
    }
}

export default DepartmentChangeOnceService;