import DataUpdateConfirmService from "services/InputBusiness/NotInputCheckCategory/DataUpdateConfirmService";

const DataUpdateConfirmAction = {
    updateYes(data) {
        return DataUpdateConfirmService.updateYes(data) 
    },

    changeUpdate(data) {
        return DataUpdateConfirmService.changeUpdate(data) 
    },
    
    DataUpdateConfirm(data) {
        return DataUpdateConfirmService.DataUpdateConfirm(data) 
    }
};

export default DataUpdateConfirmAction;