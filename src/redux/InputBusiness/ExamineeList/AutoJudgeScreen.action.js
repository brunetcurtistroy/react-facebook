import AutoJudgeScreenService from "services/InputBusiness/ExamineeList/AutoJudgeScreenService";

const AutoJudgeScreenAction = {
    getScreenData(data) {
        return AutoJudgeScreenService.getScreenData(data)
    },

    event_Exec(data) {
        return AutoJudgeScreenService.event_Exec(data)
    },
}

export default AutoJudgeScreenAction;