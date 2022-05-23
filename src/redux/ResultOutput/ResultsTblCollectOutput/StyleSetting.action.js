 import StyleSettingService from "services/ResultOutput/ResultsTblCollectOutput/StyleSettingService";

const StyleSettingAction = {
    getListData(data) {
        return StyleSettingService.getListData(data) 
    },

    saveData(data) {
        return StyleSettingService.saveData(data)
    },

    deleteData(data) {
        return StyleSettingService.deleteData(data)
    },

    run_F12(data) {
        return StyleSettingService.run_F12(data)
    }
}

export default StyleSettingAction;