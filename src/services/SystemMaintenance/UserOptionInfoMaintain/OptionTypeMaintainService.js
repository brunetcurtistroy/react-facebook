import axios from 'configs/axios';

const apiPaths = {
    getScreenDataUserOptionTypeMaintain: '/api/user-option-info-maintain/search-screen/get-data',
};

const OptionTypeMaintainService = {
    async getScreenDataUserOptionTypeMaintainService() {
        return axios.get(apiPaths.getScreenDataUserOptionTypeMaintain);
    },
};

export default OptionTypeMaintainService;