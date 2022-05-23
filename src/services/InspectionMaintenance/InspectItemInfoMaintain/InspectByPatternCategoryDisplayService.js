import axios from 'configs/axios';

const apiPaths = {
    getDataInspectByPatternCategoryDisplay: '/api/inspect-item-info-maintain/inspect-item-info-maintain/inspect-by-pattern-category-display',
};


const InspectByPatternCategoryDisplayService = {
    async getDataInspectByPatternCategoryDisplayService(params) {
        return axios.get(apiPaths.getDataInspectByPatternCategoryDisplay, { params });
    },
};

export default InspectByPatternCategoryDisplayService;