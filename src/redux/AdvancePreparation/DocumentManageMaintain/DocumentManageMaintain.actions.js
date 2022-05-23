import { message } from "antd";
import DocumentManageMaintainService from "services/AdvancePreparation/DocumentManageMaintain/DocumentManageMaintainService";

const DocumentManageMaintainAction = {
    GetMainInit(data) {
        return DocumentManageMaintainService.getMainInit(data)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
            });
    },
    GetDetailSub(data) {
        return DocumentManageMaintainService.getDetailSub(data)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
            });
    },
    Delete(data) {
        return DocumentManageMaintainService.delete(data)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
            });
    },
    SaveAndUpdate(data) {
        return DocumentManageMaintainService.saveAndUpdate(data)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
            });
    },
    DeleteDetailSub(data) {
        return DocumentManageMaintainService.deleteDetailSub(data)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
            });
    }

}
export default DocumentManageMaintainAction;