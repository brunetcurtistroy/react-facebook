import axios from "configs/axios";

const apiPaths = {  
    GetScreenData: "/api/personal-reserve-process/visits-change-confirm", 
    AcceptBtn: "/api/personal-reserve-process/visits-change-confirm/accept-btn",
    AcceptBtn_1: "/api/personal-reserve-process/visits-change-confirm/accept-btn-1",
    AcceptBtn_2: "/api/personal-reserve-process/visits-change-confirm/accept-btn-2"
};

const VisitsChangeConfirmService = { 
    async GetScreenData(params) { 
        return axios.get(apiPaths.GetScreenData,  {params} );
    },
    
    async AcceptBtn(params) {
        return axios.post(apiPaths.AcceptBtn,  params);
    },

    async AcceptBtn_1(params) {
        return axios.post(apiPaths.AcceptBtn_1,  params);
    },

    async AcceptBtn_2(params) {
        return axios.post(apiPaths.AcceptBtn_2,  params);
    },
}; 
export default VisitsChangeConfirmService;