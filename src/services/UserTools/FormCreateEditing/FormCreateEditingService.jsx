import axios from "configs/axios";

const API_LIST = {
  getTableData: "/api/form-create-editing/form-create-editing/get-table-data",
};

const FormCreateEditingService = {
  async getTableDataService(params) {
    return axios.get(API_LIST.getTableData, { params });
  },
};

export default FormCreateEditingService;
