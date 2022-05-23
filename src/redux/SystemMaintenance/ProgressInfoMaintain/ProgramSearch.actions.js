import ProgramSearchService from "services/SystemMaintenance/ProgressInfoMaintain/ProgramSearchService";

export const getScreenListDataProgramSearchAction = (params) => {
    return ProgramSearchService.getScreenListDataProgramSearchService(params)
}