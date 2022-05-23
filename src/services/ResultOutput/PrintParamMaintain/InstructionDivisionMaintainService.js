import axios from "configs/axios";

const APP_LIST = {
    ComboBoxSelectSubroutine: "/api/print-param-maintain/instruction-division-maintain/comboBoxSelectSubroutine",
    CopyLocalCreated: "/api/print-param-maintain/instruction-division-maintain/copyLocalCreated",
    AttachedOverwrite:"/api/print-param-maintain/instruction-division-maintain/attachedOverwrite",
    getScreenData : "/api/print-param-maintain/instruction-division-maintain/",
    saveData : "/api/print-param-maintain/instruction-division-maintain/save-and-update",
    deleteData : "/api/print-param-maintain/instruction-division-maintain/delete",
    getItemMaintenance : "/api/print-param-maintain/instruction-division-maintain/item-maintenance",
    saveItemMaintenance : "/api/print-param-maintain/instruction-division-maintain/item-maintenance/save-and-update",
    deleteItemMaintenance : "/api/print-param-maintain/instruction-division-maintain/item-maintenance/delete",
    copyctrlshiftc : "/api/print-param-maintain/instruction-division-maintain/copy-ctrl-shift-c",
    attachedctrlshiftv : "/api/print-param-maintain/instruction-division-maintain/attached-ctrl-shift-v",
};
const InstructionDivisionMaintainService = {
    async comboBoxSelectSubroutine(data) {
        return axios.get(APP_LIST.ComboBoxSelectSubroutine, data);
    },
    async copyLocalCreated(data) {
        return axios.get(APP_LIST.CopyLocalCreated, data);
    },
    async attachedOverwrite(data) {
        return axios.get(APP_LIST.AttachedOverwrite, data);
    },
    async getScreenData(data) {
        return axios.get(APP_LIST.getScreenData, { params: data});
    },
    async saveData(params) {
        return axios.post(APP_LIST.saveData, params);
    },
    async deleteData(params) {
        return axios.delete(APP_LIST.deleteData, { params });
    },
    //Item Maintenance
    async getItemMaintenance(data) {
        return axios.get(APP_LIST.getItemMaintenance, { params: data});
    },
    async saveItemMaintenance(params) {
        return axios.post(APP_LIST.saveItemMaintenance, params);
    },
    async deleteItemMaintenance(params) {
        return axios.delete(APP_LIST.deleteItemMaintenance, { params });
    },
    async copyctrlshiftc(params) {
        return axios.post(APP_LIST.copyctrlshiftc, params);
    },
    async attachedctrlshiftv(params) {
        return axios.post(APP_LIST.attachedctrlshiftv, params);
    },

};

export default InstructionDivisionMaintainService;