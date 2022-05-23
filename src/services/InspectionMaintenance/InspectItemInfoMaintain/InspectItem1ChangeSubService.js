import axios from 'configs/axios';

const apiPaths = {
    getScreenDataInspectItem1ChangeSub: '/api/inspect-item-info-maintain/inspect-item-1-change-sub',
    registerBtnInspectItem1ChangeSub: '/api/inspect-item-info-maintain/inspect-item-1-change-sub/RegisterBtn'
};


const InspectItem1ChangeSubService = {
    async getScreenDataInspectItem1ChangeSubService(params) {
        return axios.get(apiPaths.getScreenDataInspectItem1ChangeSub, { params });
    },
    async registerBtnInspectItem1ChangeSubService(params) {
        return axios.post(apiPaths.registerBtnInspectItem1ChangeSub, params );
    }
};

export default InspectItem1ChangeSubService;
