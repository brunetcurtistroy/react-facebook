import axios from 'configs/axios';

const apiPaths = {
    getPrintParamMaintain: '/api/print-param-maintain/print-param-maintain',
    deletePrintParamMaintain: '/api/print-param-maintain/print-param-maintain/delete',
    savePrintParamMaintain: '/api/print-param-maintain/print-param-maintain/save',
    itemF12: '/api/print-param-maintain/print-param-maintain/item-f12',
    stsChange: '/api/print-param-maintain/print-param-maintain/sts-change-Item-f12',
    printf10: '/api/print-param-maintain/print-param-maintain/print-f10'

};

const PrintParamMaintainService = {
    async getPrintParamMaintainService() {
        return axios.get(apiPaths.getPrintParamMaintain);
    },
    async deletePrintParamMaintainService(params) {
        return axios.delete(apiPaths.deletePrintParamMaintain, {params});
    },
    async savePrintParamMaintainService(params){
        return axios.post(apiPaths.savePrintParamMaintain, params)
    },
    async itemF12Service(params){
        return axios.post(apiPaths.itemF12, params)
    },
    async stsChangeService(params){
        return axios.post(apiPaths.stsChange, params)
    },
    async printf10(params){
        return axios.post(apiPaths.printf10, params)
    },
};

export default PrintParamMaintainService;