import axios from 'configs/axios';

const apiPaths = {
    CopyPattern: '/api/another-inspect-item-setting-category/another-inspect-item-setting-category/pattern-setting-sub/copy',
};

const CopyPatternService = {
    async CopyPatternService(params) {
        return axios.post(apiPaths.CopyPattern, params);
    },
};

export default CopyPatternService;