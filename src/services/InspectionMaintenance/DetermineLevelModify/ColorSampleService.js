import axios from 'configs/axios';

const apiPaths = {
    getDataColorSample: '/api/determine-level-modify/determine-level-modify-master-coercive/color-sample/get-screen-data',
};

const ColorSampleService = {
    async getDataColorSampleService() {
        return axios.get(apiPaths.getDataColorSample);
    },
};

export default ColorSampleService;