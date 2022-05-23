import axios from "configs/axios";

const APP_LIST = {
  getListData:"/api/contract-master-maintain/contract-master-maintain/get-screen-data",
  update:"/api/contract-master-maintain/contract-master-maintain/year-update",
  delete:"/api/contract-master-maintain/contract-master-maintain/year-delete"
};

const ContractMasterMaintainService = {
  async getListData(params) {
    return axios.get(APP_LIST.getListData,params );
  },
  async update(data) {
    return axios.put(APP_LIST.update, data);
  },
  async delete(data) {
    return axios.delete(APP_LIST.delete,  {data})
  }
};

export default ContractMasterMaintainService;