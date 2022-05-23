import StyleSettingHiraService from "services/ResultOutput/ResultsTblCollectOutput/StyleSettingHiraService";

const StyleSettingHiraAction = {
    getListData(data) {
        return StyleSettingHiraService.getListData(data) 
    },
    saveData(data) {
        return StyleSettingHiraService.saveData(data)
    },

    deleteData(data) {
        return StyleSettingHiraService.deleteData(data)
    },

    f9(data) {
        return StyleSettingHiraService.f9(data)
    }
}
export default StyleSettingHiraAction;