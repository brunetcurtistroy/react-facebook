import ConditionAddSubService from 'services/basicInfo/ConsultInfoReconstruction/ConditionAddSubService'

const ConditionAddSubAction = {
    getScreenData(data) {
        return ConditionAddSubService.getScreenData(data)
    },

    update(data) {
        return ConditionAddSubService.update(data)
    },

    clearData(data) {
        return ConditionAddSubService.clearData(data)
    },

    getNameOfficeCodeAction(params) {
        return ConditionAddSubService.getNameOfficeCodeService(params)
    },

    getNamePersonalAction(params) {
        return ConditionAddSubService.getNamePersonalService(params)
    },
};
export default ConditionAddSubAction;