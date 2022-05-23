import axios from "configs/axios";

const apiPaths = {
    getScreenData: "/api/inspect-item-master/inspect-item-master",
    saveAndUpdateInspectItem: "/api/inspect-item-master/inspect-item-master/save-and-update",
    deleteInspectItem: "/api/inspect-item-master/inspect-item-master/delete",
};

const InspectItemMasterService = {
  async getScreenData() {
    return axios.get(apiPaths.getScreenData );
  },

  async saveAndUpdateInspectItem(params) {
    return axios.post(apiPaths.saveAndUpdateInspectItem, params);
  },

  async deleteInspectItem(params) {
    return axios.delete(apiPaths.deleteInspectItem, {params});
  },
};
  
export default InspectItemMasterService;
