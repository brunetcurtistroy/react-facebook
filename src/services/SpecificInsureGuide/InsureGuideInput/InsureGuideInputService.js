import axios from "configs/axios";

const apiPaths = {
    getIntroduceInsureGuideInput: '/api/insure-guide-input/insure-guide-input',
}

const InsureGuideInputService = {
    async getIntroduceInsureGuideInputService (params){
        return axios.get(apiPaths.getIntroduceInsureGuideInput, {params})
    }
}

export default InsureGuideInputService;