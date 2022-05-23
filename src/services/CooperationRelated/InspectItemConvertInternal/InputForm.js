import axios from "configs/axios";

const API_LIST = {
    GetScreenData:
        "/api/inspect-item-convert-internal/input-form",
    ExternalInspectRegister:
        "/api/inspect-item-convert-internal/input-form/external-inspect-register",
    InspectItem:
        "/api/inspect-item-convert-internal/input-form/inspection-item",
};

const InputForm = {
    async GetScreenData(params) {
        return axios.get(API_LIST.GetScreenData, {params});
    },
    async ExternalInspectRegister(params) {
        return axios.post(API_LIST.ExternalInspectRegister, params);
    },
    async InspectItem(params) {
        return axios.get(API_LIST.InspectItem, {params});
    },
};

export default InputForm;
