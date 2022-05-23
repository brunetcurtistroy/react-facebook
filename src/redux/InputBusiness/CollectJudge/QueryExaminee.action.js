import QueryExamineeService from "services/InputBusiness/CollectJudge/QueryExamineeService";

const QueryExamineeAction = {
  getScreenData(data) {
    return QueryExamineeService.getScreenData(data)
  }
};

export default QueryExamineeAction;