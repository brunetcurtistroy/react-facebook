import axios from "configs/axios";

const APP_LIST = {
  getScreenData : "/api/xml-param-maintain/item-checkups-for-xml",
};

const ItemCheckupsForXmlService = {
  async getScreenDataService(params){
    return axios.get(APP_LIST.getScreenData, {params});
  }
}; 
export default ItemCheckupsForXmlService;
