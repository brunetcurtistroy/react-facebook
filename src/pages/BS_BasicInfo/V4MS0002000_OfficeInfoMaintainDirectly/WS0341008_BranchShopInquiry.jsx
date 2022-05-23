import React from "react";
import { connect } from "react-redux";

import { Card, Table, Button } from "antd";
import OfficeInfoMaintainAction from "redux/basicInfo/OfficeInfoMaintain/OfficeInfoMaintain.action.js";
import PropTypes from "prop-types";

class WS0341008_BranchShopInquiry extends React.Component {
  static propTypes = {
    Li_OfficeCode: PropTypes.any,
    Lo_BranchStoreCode: PropTypes.any,
  };
  constructor(props) {
    super(props);

    // document.title = "支社店照会";
    this.state = {
      office_code: "",
      branch_store_code: "",
      listBranchShop: [],
    };
  }

  componentDidMount = () => {
    this.getListBranchShopByOfficeCode();
  };
  getListBranchShopByOfficeCode = () => {
    if (this.props.Li_OfficeCode) {
      this.setState({ office_code: this.props.Li_OfficeCode });
      OfficeInfoMaintainAction.getListBranchShopByOfficeCodeAction(
        this.props.Li_OfficeCode
      ).then((res) => {
        console.log("getListBranchShopByOfficeCodeAction", res);
        if (res) {
          this.setState({ listBranchShop: res });
        }
      });
    }
  };
  handleRowSelected = (selectedRows) => {
    const { office_code } = this.state;
    if (this.props.onFinishScreen && selectedRows) {
      this.props.onFinishScreen({
        Li_OfficeCode: office_code,
        Lo_BranchStoreCode: selectedRows.branch_store_code,
        recordData: selectedRows,
      });
    }
  };

  render() {
    return (
      <div className="branch-shop-inquiry">
        <Card title="支社店照会">
          <Table
            dataSource={this.state.listBranchShop}
            pagination={false}
            rowKey={(record) => record.id}
          >
            <Table.Column title="支社店" dataIndex="branch_store_code" />
            <Table.Column title="カナ名称" dataIndex="office_kana_name" />
            <Table.Column title="漢字名称" dataIndex="office_kanji_name" />
            <Table.Column
              title=""
              dataIndex=""
              render={(text, record, index) => (
                <Button
                  type="primary"
                  size="small"
                  onClick={() => this.handleRowSelected(record)}
                >
                  選択
                </Button>
              )}
            />
          </Table>
        </Card>
      </div>
    );
  }
}

export default WS0341008_BranchShopInquiry;
