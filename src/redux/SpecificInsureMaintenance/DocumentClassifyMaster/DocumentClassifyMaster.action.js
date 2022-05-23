import { message } from "antd";
import DocumentClassifyMasterService from "services/SpecificInsureMaintenance/DocumentClassifyMaster/DocumentClassifyMasterService";

const DocumentClassifyMasterAction = {
    getDataClassifyMaster() {
        return DocumentClassifyMasterService.getDataClassifyMaster()
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
            });
    },

    getDataSentenceMaster(data) {
        return DocumentClassifyMasterService.getDataSentenceMaster(data)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
            });
    },

    saveAndUpdateClassifyMaster(data) {
        return DocumentClassifyMasterService.saveAndUpdateClassifyMaster(data)
    },

    deleteItemClassifyMaster(data) {
        return DocumentClassifyMasterService.deleteItemClassifyMaster(data)
    },

    deleteItemSentenceMaster(data) {
        return DocumentClassifyMasterService.deleteItemSentenceMaster(data)
    },
}

export default DocumentClassifyMasterAction;