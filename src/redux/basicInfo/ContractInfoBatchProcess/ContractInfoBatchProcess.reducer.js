import { ContractInfoBatchProcessTypes } from './ContractInfoBatchProcess.types';

const INITIAL_STATE = {
  contractInfos: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }],
};

const ContractInfoBatchProcessReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ContractInfoBatchProcessTypes.SET_CONTRACT_INFO:
      return {
        ...state,
        contractInfos: action.contractInfos,
      };

    default:
      return state;
  }
};

export default ContractInfoBatchProcessReducer;
