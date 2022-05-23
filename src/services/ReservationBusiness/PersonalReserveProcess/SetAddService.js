import axios from "configs/axios";

const apiPaths = {  
    Confirm: "/api/personal-reserve-process/set-add/confirm", 
};

const SetAddService = { 
    async Confirm(params) {
        return axios.post(apiPaths.Confirm,  params );
    },
}; 
export default SetAddService;