import axios from 'configs/axios';

const apiPaths = {
    getDataInputMetabolicSyndromeHierarchical: '/api/specific-health-tokuho-param-maintain/input-metabolic-syndrome-hierarchical',
    saveInputMetabolicSyndromeHierarchical: '/api/specific-health-tokuho-param-maintain/input-metabolic-syndrome-hierarchical/save-and-update',
    inspectCodeInputMetabolicSyndromeHierarchical: '/api/specific-health-tokuho-param-maintain/input-metabolic-syndrome-hierarchical/inspect-code',
    deleteInputMetabolicSyndromeHierarchical: '/api/specific-health-tokuho-param-maintain/input-metabolic-syndrome-hierarchical/delete'
};

const InputMetabolicSyndromeHierarchicalService = {
    async getDataInputMetabolicSyndromeHierarchicalService(params) {
        return axios.get(apiPaths.getDataInputMetabolicSyndromeHierarchical, {params});
    },
    async saveInputMetabolicSyndromeHierarchicalService(params){
        return axios.post(apiPaths.saveInputMetabolicSyndromeHierarchical, params)
    },
    async inspectCodeInputMetabolicSyndromeHierarchicalService(params){
        return axios.post(apiPaths.inspectCodeInputMetabolicSyndromeHierarchical, params)
    },
    async deleteInputMetabolicSyndromeHierarchicalService(params){
        return axios.delete(apiPaths.deleteInputMetabolicSyndromeHierarchical, {params})
    },
};

export default InputMetabolicSyndromeHierarchicalService;