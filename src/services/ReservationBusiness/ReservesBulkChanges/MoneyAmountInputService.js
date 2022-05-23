import axios from 'configs/axios';

const apiPaths = {
    getScreenMoneyAmountInput: '/api/reserves-bulk-changes/money-amount-input/get-screen-data',
    taxCalculateMoneyAmountInput: '/api/reserves-bulk-changes/money-amount-input/tax-cal-culate',
};

const MoneyAmountInputService = {
    async getScreenMoneyAmountInputService(params) {
        return axios.get(apiPaths.getScreenMoneyAmountInput, {params});
    },
    async taxCalculateMoneyAmountInputService(params) {
        return axios.post(apiPaths.taxCalculateMoneyAmountInput, params);
    },
};

export default MoneyAmountInputService;