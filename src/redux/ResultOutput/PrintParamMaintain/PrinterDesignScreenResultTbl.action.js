import PrinterDesignScreenResultTblService from "services/ResultOutput/PrintParamMaintain/PrinterDesignScreenResultTblService"
import { message } from "antd";

const PrinterDesignScreenResultTblAction = {
  getScreenDataTbl(params) {
    return PrinterDesignScreenResultTblService.getScreenDataTbl(params)
      .then((res) => {
        return res?.data;
      })
      .catch((err) => {
        message.error(err.response.data.message);
        console.log(err.response.data.message);
      });
  },
  getScreenDatarelated(params) {
    return PrinterDesignScreenResultTblService.getScreenDatarelated(params)
      .then((res) => {
        return res?.data;
      })
      .catch((err) => {
        message.error(err.response.data.message);
        console.log(err.response.data.message);
      });
  },
  onEventF12(params) {
    return PrinterDesignScreenResultTblService.onPrint(params)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        message.error(err.response.data.message);
        console.log(err.response.data.message);
      });
  }
}
export default PrinterDesignScreenResultTblAction;
