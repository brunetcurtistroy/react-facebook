import axios from "configs/axios";

const APP_LIST = {
  getScreenData : "/api/xml-param-maintain/item-checkups-for-xml",
};

const ItemCheckupsForXml1315003Service = {
  async getScreenDataService(){
    return axios.get(APP_LIST.getScreenData);
  }
}; 
export default ItemCheckupsForXml1315003Service;
