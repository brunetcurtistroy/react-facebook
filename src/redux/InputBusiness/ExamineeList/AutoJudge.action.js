import AutoJudgeService from "services/InputBusiness/ExamineeList/AutoJudgeService";


const AutoJudgeAction = {
    getScreenData(data) {
        return AutoJudgeService.getScreenData(data)
    },

    yes_event(data) {
        return AutoJudgeService.yes_event(data)
    }
}

export default AutoJudgeAction;