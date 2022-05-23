import axios from 'configs/axios';

const apiPaths = {
    GetListData: '/api/not-input-check-category/style-query',
};

const StyleQueryService = {
    async GetListData(params) {
        return axios.get(apiPaths.GetListData, {params});
    },

};

export default StyleQueryService;
