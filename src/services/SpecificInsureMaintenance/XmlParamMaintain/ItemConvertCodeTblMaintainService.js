import axios from "configs/axios";

const APP_LIST = {
  getInit:"/api/xml-param-maintain/item-convert-code-tbl-maintain",
  save:"/api/xml-param-maintain/item-convert-code-tbl-maintain/save-and-update",
  delete:"/api/xml-param-maintain/item-convert-code-tbl-maintain/delete"
};

const ItemConvertCodeTblMaintainService = {
  async getInit(){
    return axios.get(APP_LIST.getInit );
  },
  async save(data){
    return axios.post(APP_LIST.save, data);
  },
  async delete(data){ 
    return axios.delete(APP_LIST.delete, {data} );
  }
};

export default ItemConvertCodeTblMaintainService;
