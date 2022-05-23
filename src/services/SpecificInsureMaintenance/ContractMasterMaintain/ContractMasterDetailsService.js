import axios from "configs/axios";

const APP_LIST = {
  getListData:"/api/contract-master-maintain/contract-master-maintain/get-screen-data", 
  getContentInput:"/api/contract-master-maintain/contract-master-maintain/get-data-contract-content-input", 
  getCommissionedOriginalInput:"/api/contract-master-maintain/contract-master-maintain/get-data-commissioned-original-input", 
  insert:"/api/contract-master-maintain/contract-master-maintain/insert-or-update-data-commissioned-original-input", 
  update:"/api/contract-master-maintain/contract-master-maintain/update-data-contract-content-input", 
  save:'/api/contract-master-maintain/contract-master-maintain/insert-or-update-contract-master-details', 
  deleteContractMaster:'/api/contract-master-maintain/contract-master-maintain/delete-data-contract-master-maintain',
  deleteCommissionedOriginalInput:"/api/contract-master-maintain/contract-master-maintain/delete-data-commissioned-original-input"
};

const ContractMasterDetailsService = {
  async getListData(params) { 
    return axios.get(APP_LIST.getListData,{params} );
  },
  async getContentInput(params) { 
    return axios.get(APP_LIST.getContentInput,{params} );
  },
  async getCommissionedOriginalInput(params) { 
    return axios.get(APP_LIST.getCommissionedOriginalInput,{params} );
  },
  async insert(params) { 
    return axios.put(APP_LIST.insert, params);
  },
  async update(params) { 
    return axios.put(APP_LIST.update, params );
  }, 
  async save(data) { 
    return axios.put(APP_LIST.save, data );
  },
  async deleteContractMaster(data) { 
    return axios.delete(APP_LIST.deleteContractMaster, {data} );
  }, 
  async deleteCommissionedOriginalInput(data) { 
    return axios.delete(APP_LIST.deleteCommissionedOriginalInput, {data} );
  }    
};

export default ContractMasterDetailsService;