import axios from 'configs/axios';

const apiPaths = {
    eventSelectListButtonAssociationAcceptanceInfoCorrect: '/api/association-acceptance-info-correct/association-acceptance-info-correct/select-list',
    saveAssociationAcceptanceInfoCorrect: '/api/association-acceptance-info-correct/association-acceptance-info-correct/save',
};

const AssociationAcceptanceInfoCorrectService = {
    async eventSelectListButtonAssociationAcceptanceInfoCorrectService(params) {
        return axios.post(apiPaths.eventSelectListButtonAssociationAcceptanceInfoCorrect, params);
    },
    async saveAssociationAcceptanceInfoCorrectService(params){
        return axios.post(apiPaths.saveAssociationAcceptanceInfoCorrect, params)
    },
};

export default AssociationAcceptanceInfoCorrectService;