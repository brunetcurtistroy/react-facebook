import axios from 'configs/axios';

const apiPaths = {
    getDataDuplicateQueryYearOfBirthNameGender: '/api/personal-info-maintain-directly/duplicate-query-year-of-birth-name-gender',
};

const DuplicateQueryYearOfBirthNameGenderService = {
    async getDataDuplicateQueryYearOfBirthNameGenderService(params) {
        return axios.get(apiPaths.getDataDuplicateQueryYearOfBirthNameGender, {params});
    },
};

export default DuplicateQueryYearOfBirthNameGenderService;