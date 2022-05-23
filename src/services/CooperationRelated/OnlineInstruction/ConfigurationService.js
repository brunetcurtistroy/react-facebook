import axios from "configs/axios";

const apiPaths = {
    getListDataConfiguration: "/api/online-instruction/configuration",
    saveDataConfiguration: '/api/online-instruction/configuration/update',
    deleteDataConfiguration: '/api/online-instruction/configuration/delete'
};

const ConfigurationService = {
  async getListDataConfigurationService () {
    return axios.get(apiPaths.getListDataConfiguration);
  },
  async saveDataConfigurationService (params) {
    return axios.put(apiPaths.saveDataConfiguration, params);
  },
  async deleteDataConfigurationService (params) {
    return axios.delete(apiPaths.deleteDataConfiguration, {params});
  }
};
  
export default ConfigurationService;