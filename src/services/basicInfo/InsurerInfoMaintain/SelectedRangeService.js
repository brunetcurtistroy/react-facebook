import axios from 'configs/axios';

const apiPaths = {
    selectedRange: '/api/insurer-info-maintain/supplemental-info-setting/select-range',
    saveSelectRange: '/api/insurer-info-maintain/supplemental-info-setting/save-select-range',
};

const SelectedRangeService = {
    async selectedRangeService(params) {
        return axios.get(apiPaths.selectedRange, {params});
    },
    async saveSelectRangeService(params) {
        return axios.post(apiPaths.saveSelectRange, params);
    },
};

export default SelectedRangeService;