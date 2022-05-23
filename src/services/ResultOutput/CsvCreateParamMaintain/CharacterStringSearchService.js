import axios from "configs/axios";

const APP_LIST = {
    Search: "/api/csv-create-param-maintain/character-string-search/search",
};

const CharacterStringSearchService = {
    async Search(params) {
        return axios.get(APP_LIST.Search, { params});
    }
};

export default CharacterStringSearchService;
