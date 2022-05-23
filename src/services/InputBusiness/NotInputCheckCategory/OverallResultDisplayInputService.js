import axios from 'configs/axios';

const apiPaths = {
    GetScreenData: '/api/not-input-check-category/overall-result-display-input',
    F9: '/api/not-input-check-category/overall-result-display-input/f9',
    EventChangeStsInputModeAll: '/api/not-input-check-category/overall-result-display-input/change-input-mode-all',
    EventChangeGuideItemDisplay: '/api/not-input-check-category/overall-result-display-input/change-guide-item-display',
    CategoryJudge: '/api/not-input-check-category/overall-result-display-input/category-judge',
    ChangeCategoryJudge: '/api/not-input-check-category/overall-result-display-input/category-judge/change-category-judge', //post
    CategoryJudgeSaveRow: '/api/not-input-check-category/overall-result-display-input/category-judge/save-row-data', //post
    EventClickExpression4: '/api/not-input-check-category/overall-result-display-input/category-judge/click-expression-4', 
    EventDbClickExpression4: '/api/not-input-check-category/overall-result-display-input/category-judge/db-click-expression-4', 
    EventAllSelect: '/api/not-input-check-category/overall-result-display-input/category-judge/all-select',
    ListDataInspectResult: '/api/not-input-check-category/overall-result-display-input/inspect-result', 
    Ctrl_F: '/api/not-input-check-category/overall-result-display-input/inspect-result/search',
    PrefixW1ResultValue: '/api/not-input-check-category/overall-result-display-input/inspect-result/prefix-w1-result-value',
    SuffixW1ResultValue: '/api/not-input-check-category/overall-result-display-input/inspect-result/suffix-w1-result-value',
    SuffixW1InspectJugde: '/api/not-input-check-category/overall-result-display-input/inspect-result/suffix-w1-inspect-jugde',
    ChangeW1InspectJudge: '/api/not-input-check-category/overall-result-display-input/inspect-result/change-w1-inspect-jugde',
    SaveRowInspectResult: '/api/not-input-check-category/overall-result-display-input/inspect-result/save-row-data', //post
    ListDataGuideCommentInput: '/api/not-input-check-category/overall-result-display-input/guide-comment-input',
    GuideCommentInputSaveRow: '/api/not-input-check-category/overall-result-display-input/guide-comment-input/save-row-data', // post
    EventChangeW3AutoJudge: '/api/not-input-check-category/overall-result-display-input/guide-comment-input/change-W3-auto-judge-basic-judge', // post
    EventChangeW3GeneralCmtCd: '/api/not-input-check-category/overall-result-display-input/guide-comment-input/change-W3-general-comments-cd',
    EventChangeW3OverallCmt: '/api/not-input-check-category/overall-result-display-input/guide-comment-input/change-W3-overall-comments',
    acceptedNo: '/api/not-input-check-category/overall-result-display-input/accepted-no',
    acceptedNoIt: '/api/not-input-check-category/overall-result-display-input/accepted-no-lt',
    accepted: '/api/not-input-check-category/overall-result-display-input/accepted',
    GuideCommentInputDeleteRow: '/api/not-input-check-category/overall-result-display-input/guide-comment-input/delete-row',
    userAction1: '/api/not-input-check-category/overall-result-display-input/category-judge/user-action-1',//get
    findingsEditingBefore: '/api/not-input-check-category/overall-result-display-input/inspect-result/findings-editing-before',
    findingsEditingAfter: '/api/not-input-check-category/overall-result-display-input/inspect-result/findings-editing-after',
    LastTimeDo: '/api/not-input-check-category/overall-result-display-input/inspect-result/last-time-do',
    FindingsDelete: '/api/not-input-check-category/overall-result-display-input/inspect-result/findings-delete'
};

const OverallResultDisplayInputService = {
    async userAction1(params) {
        return axios.get(apiPaths.userAction1, {params}); //1
    },
    async LastTimeDo(params) {
        return axios.get(apiPaths.LastTimeDo, {params}); //1
    },
    async findingsEditingBefore(params) {
        return axios.get(apiPaths.findingsEditingBefore, {params}); //1
    },
    async FindingsDelete(params) {
        return axios.get(apiPaths.FindingsDelete, {params}); //1
    },
    async findingsEditingAfter(params) {
        return axios.get(apiPaths.findingsEditingAfter, {params}); //1
    },
    async GetScreenData(params) {
        return axios.get(apiPaths.GetScreenData, {params}); //1
    },
    async acceptedNo(params) {
        return axios.get(apiPaths.acceptedNo, {params}); //1
    },
    async accepted(params) {
        return axios.get(apiPaths.accepted, {params}); //1
    },
    async acceptedNoIt(params) {
        return axios.get(apiPaths.acceptedNoIt, {params}); //1
    },
    async F9(params) {
        return axios.get(apiPaths.F9, {params}); //1
    },
    async EventChangeStsInputModeAll(params) {
        return axios.get(apiPaths.EventChangeStsInputModeAll, {params}); //2
    },
    async EventChangeGuideItemDisplay(params) {
        return axios.get(apiPaths.EventChangeGuideItemDisplay, {params}); //3
    },
    async CategoryJudge(params) {
        return axios.get(apiPaths.CategoryJudge, {params}); //4
    },
    async ChangeCategoryJudge(params) {
        return axios.post(apiPaths.ChangeCategoryJudge, params); //5
    },
    async CategoryJudgeSaveRow(params) {
        return axios.post(apiPaths.CategoryJudgeSaveRow, params); //6
    },
    async EventClickExpression4(params) {
        return axios.get(apiPaths.EventClickExpression4, {params}); //7
    },
    async EventDbClickExpression4(params) {
        return axios.get(apiPaths.EventDbClickExpression4, {params});//8
    },
    async EventAllSelect(params) {
        return axios.get(apiPaths.EventAllSelect, {params}); //9
    },
    async ListDataInspectResult(params) {
        return axios.get(apiPaths.ListDataInspectResult, {params}); //10
    },
    async Ctrl_F(params) {
        return axios.get(apiPaths.Ctrl_F, {params}); //11
    },
    async PrefixW1ResultValue(params) {
        return axios.post(apiPaths.PrefixW1ResultValue, params); //12
    },
    async SuffixW1ResultValue(params) {
        return axios.post(apiPaths.SuffixW1ResultValue, params);//13
    },
    async SuffixW1InspectJugde(params) {
        return axios.post(apiPaths.SuffixW1InspectJugde, params);//14
    },
    async ChangeW1InspectJudge(params) {
        return axios.post(apiPaths.ChangeW1InspectJudge, params);//15
    },
    async SaveRowInspectResult(params) {
        return axios.post(apiPaths.SaveRowInspectResult, params); //16
    },
    async ListDataGuideCommentInput(params) {
        return axios.get(apiPaths.ListDataGuideCommentInput, {params});//17
    },
    async GuideCommentInputSaveRow(params) {
        return axios.post(apiPaths.GuideCommentInputSaveRow, params); //18
    },
    async EventChangeW3AutoJudge(params) {
        return axios.post(apiPaths.EventChangeW3AutoJudge, params); //19
    },
    async EventChangeW3GeneralCmtCd(params) {
        return axios.get(apiPaths.EventChangeW3GeneralCmtCd, {params});//20
    },
    async EventChangeW3OverallCmt(params) {
        return axios.get(apiPaths.EventChangeW3OverallCmt, {params});//21
    },
    async GuideCommentInputDeleteRow(params) {
        return axios.delete(apiPaths.GuideCommentInputDeleteRow, {params});//22
    },
};

export default OverallResultDisplayInputService;