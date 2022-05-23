import axios from 'configs/axios';

const apiPaths = {
    getScreenInvoice: '/api/invoice/invoice/get-screen-data',
    DisplayBtnInvoice: '/api/invoice/invoice/dislay-btn',
    QueryResultsDisplayInvoice: '/api/invoice/invoice/query-results-display',
    OptionsDisplayInvoice: '/api/invoice/invoice/option-display',
    Issue_F12Invoice: '/api/invoice/invoice/f12',
    MissingOrDeletedInvoice: '/api/invoice/invoice/missing-or-deleted',
    ChangeInvoice: '/api/invoice/invoice/change'
};

const InvoiceService = {
    async getScreenInvoiceService() {
        return axios.get(apiPaths.getScreenInvoice);
    },
    async DisplayBtnInvoiceService(params) {
        return axios.post(apiPaths.DisplayBtnInvoice, params);
    },
    async QueryResultsDisplayInvoiceService() {
        return axios.get(apiPaths.QueryResultsDisplayInvoice);
    },
    async OptionsDisplayInvoiceService() {
        return axios.get(apiPaths.OptionsDisplayInvoice);
    },
    async Issue_F12InvoiceService() {
        return axios.post(apiPaths.Issue_F12Invoice);
    },
    async MissingOrDeletedInvoiceService(params) {
        return axios.post(apiPaths.MissingOrDeletedInvoice, params);
    },
    async ChangeInvoiceService(params) {
        return axios.post(apiPaths.ChangeInvoice, params);
    },
};

export default InvoiceService;