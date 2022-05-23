import CharacterStringSearchService from "services/ResultOutput/PrintParamMaintain/CharacterStringSearchService"
import { message } from "antd";

const CharacterStringSearchAction = {
    searchRunEnter(data) {
    return CharacterStringSearchService.searchRunEnter(data)
      .then((res) => {
          return res?.data;
      })
      .catch((err) => {
        message.error(err.response.data.message);
        console.log(err.response.data.message);
      });
  },
  RunSearch(data) {
    return CharacterStringSearchService.RunSearch(data)
},
}
  export default CharacterStringSearchAction;