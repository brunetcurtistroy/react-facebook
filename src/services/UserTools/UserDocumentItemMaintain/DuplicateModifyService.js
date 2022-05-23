import axios from 'configs/axios';

const apiPaths = {
    ExtractBtn: '/api/user-document-item-maintain/user-document-item-maintain/extract-btn',
};

const DuplicateModifyService = {
    async extractBtnService(params) {
        return axios.get(apiPaths.ExtractBtn, {params});
    },
};

export default DuplicateModifyService;