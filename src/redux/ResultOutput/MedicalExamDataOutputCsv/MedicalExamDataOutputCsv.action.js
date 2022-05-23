
import { message } from "antd";
import MedicalExamDataOutputCsvService
 from "services/ResultOutput/MedicalExamDataOutputCsv/MedicalExamDataOutputCsvService";

const MedicalExamDataOutputCsvAction = {
    GetScreenData(data) {
        return MedicalExamDataOutputCsvService.GetScreenData(data)
            .then((res) => {
                return res?.data;
            })
           
    },
    ConditionNum(data) {
        return MedicalExamDataOutputCsvService.GetConditionNum(data)
            .then((res) => {
                return res?.data;
            })
           
    },
    GformType(data) {
        return MedicalExamDataOutputCsvService.GetGformType(data)
            .then((res) => {
                return res?.data;
            })
           
    },
    Goffice(data) {
        return MedicalExamDataOutputCsvService.GetGoffice(data)
            .then((res) => {
                return res?.data;
            })
           
    },
    GtubePalm(data) {
        return MedicalExamDataOutputCsvService.GetGtubePalm(data)
            .then((res) => {
                return res?.data;
            })
           
    },
    GetListDataF11(data) {
        return MedicalExamDataOutputCsvService.GetListDataF11(data)
            .then((res) => {
                return res?.data;
            })
    },
    OutputF12(data) {
        return MedicalExamDataOutputCsvService.OutputF12(data)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                const res = err.response;
                if (!res || !res.data || !res.data.message) {
                    message.error("エラーが発生しました");
                    return;
                }
                message.error(res.data.message);
            });
    },
    Downloadfile(data) {
        return MedicalExamDataOutputCsvService.Downloadfile(data)
    },
    AllSelect(data) {
        return MedicalExamDataOutputCsvService.AllSelect(data)
    },


};

export default MedicalExamDataOutputCsvAction;