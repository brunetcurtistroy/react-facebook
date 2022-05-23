import axios from "configs/axios";

const APP_LIST = {
  getInitTreeData:"/api/user-document-item-maintain/user-document-item-maintain/tree-table-data",
  getListTableBySearch:"/api/user-document-item-maintain/user-document-item-maintain/set-list-table-data",
  save:'/api/user-document-item-maintain/user-document-item-maintain/save-data',
  delete:'/api/user-document-item-maintain/user-document-item-maintain/delete'
};

const UserDocumentItemMaintainService = {
  async getInitTreeData() {
    return axios.get(APP_LIST.getInitTreeData );
  },
  async getListTableBySearch(params) {
    return axios.get(APP_LIST.getListTableBySearch,  {params}  );
  },
  async save(params) { 
    return axios.put(APP_LIST.save, params );
  },
  async delete(data) { 
    return axios.delete(APP_LIST.delete, {data} );
  }
};

export default UserDocumentItemMaintainService;
