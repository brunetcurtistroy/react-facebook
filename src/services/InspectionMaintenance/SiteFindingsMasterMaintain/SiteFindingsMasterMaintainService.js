import axios from 'configs/axios';

const apiPaths = {
    getDataSiteFindingsMasterMaintain: '/api/site-findings-master-maintain/site-findings-master-maintain',
    getSiteTableAndFindingsTable: '/api/site-findings-master-maintain/site-findings-master-maintain/site-table-and-findings-table',
    saveAndUpdateSiteFindingsMasterMaintain: '/api/site-findings-master-maintain/site-findings-master-maintain/save-and-update',
    deleteSiteFindingsMasterMaintain: '/api/site-findings-master-maintain/site-findings-master-maintain/delete',
    deleteSiteTable: '/api/site-findings-master-maintain/site-findings-master-maintain/delete-site-table',
    deleteFindingsTable: '/api/site-findings-master-maintain/site-findings-master-maintain/delete-findings-table'
};

const SiteFindingsMasterMaintainService = {
    async getDataSiteFindingsMasterMaintainService() {
        return axios.get(apiPaths.getDataSiteFindingsMasterMaintain);
    },
    async getSiteTableAndFindingsTableService(params) {
        return axios.get(apiPaths.getSiteTableAndFindingsTable, {params});
    },
    async saveAndUpdateSiteFindingsMasterMaintainService(params){
        return axios.post(apiPaths.saveAndUpdateSiteFindingsMasterMaintain, params)
    },
    async deleteSiteFindingsMasterMaintainService(params){
        return axios.delete(apiPaths.deleteSiteFindingsMasterMaintain, {params})
    },
    async deleteSiteTableService(params){
        return axios.delete(apiPaths.deleteSiteTable, {params})
    },
    async deleteFindingsTableService(params){
        return axios.delete(apiPaths.deleteFindingsTable, {params})
    }
};

export default SiteFindingsMasterMaintainService;