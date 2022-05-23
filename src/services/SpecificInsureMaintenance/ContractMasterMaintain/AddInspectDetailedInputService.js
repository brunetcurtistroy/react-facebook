import axios from "configs/axios";

const APP_LIST = {
  getListData:"/api/contract-master-maintain/contract-master-maintain/get-data-add-inspect-detailed-input", 
  save:"/api/contract-master-maintain/contract-master-maintain/add-inspect-detailed-input", 

};

const AddInspectDetailedInputService = {
  async getListData(params) {
    return axios.get(APP_LIST.getListData,{params} );
  } ,
  async save(data) {
    return axios.post(APP_LIST.save, data );
  } 
};

export default AddInspectDetailedInputService;