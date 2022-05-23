import axios from 'configs/axios';

const apiPaths = {
    getScreenDataPersonalAttributesReacquire: '/api/personal-info-maintain-directly/personal-attributes-reacquire',
    reacquisitionPersonalAttributesReacquire: '/api/personal-info-maintain-directly/personal-attributes-reacquire/reacquisition',
};

const PersonalAttributesReacquireService = {
    async getScreenDataPersonalAttributesReacquireService(params) {
        return axios.get(apiPaths.getScreenDataPersonalAttributesReacquire, {params});
    },
    async reacquisitionPersonalAttributesReacquireService(params) {
        return axios.get(apiPaths.reacquisitionPersonalAttributesReacquire, {params});
    },
};

export default PersonalAttributesReacquireService;