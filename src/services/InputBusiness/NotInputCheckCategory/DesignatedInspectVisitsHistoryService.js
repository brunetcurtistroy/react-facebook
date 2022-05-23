import axios from 'configs/axios';

const apiPaths = {
    GetListData: '/api/not-input-check-category/designated-inspect-visits-history',
};

const DesignatedInspectVisitsHistoryService = {
    async GetListData(params) {
        return axios.get(apiPaths.GetListData, {params});
    },

};

export default DesignatedInspectVisitsHistoryService;
