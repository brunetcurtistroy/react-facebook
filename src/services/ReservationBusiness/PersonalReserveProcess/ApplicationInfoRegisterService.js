import axios from "configs/axios";

const apiPaths = {  
    GetScreenData: "/api/personal-reserve-process/application-info-register", 
    PersonalRegister: "/api/personal-reserve-process/application-info-register/personal-register",
    Write: "/api/personal-reserve-process/application-info-register/write",
};

const ApplicationInfoRegisterService = { 
    async GetScreenData(params) { 
        return axios.get(apiPaths.GetScreenData,  {params} );
    },
    async PersonalRegister(params) {
        return axios.post(apiPaths.PersonalRegister,  params);
    },
    async Write(params) {
        return axios.post(apiPaths.Write,  params);
    },
}; 
export default ApplicationInfoRegisterService;