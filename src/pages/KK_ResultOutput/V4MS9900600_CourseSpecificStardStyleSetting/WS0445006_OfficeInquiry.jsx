import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Card, Table, Button, message } from "antd";
import OfficeInquiryService from "services/ResultOutput/CourseSpecificStardStyleSetting/OfficeInquiryService";
class WS0445006_OfficeInquiry extends React.Component {
  static propTypes = {
    Lo_branch_store_code: PropTypes.any,
    Lo_office_code: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = "事業所照会";

    this.state = {
      dataSource: [],
      isLoadingTable: false,
    };
  }
  componentDidMount = () => {
    this.setState({ isLoadingTable: true });
    OfficeInquiryService.getListOfficeInquiryService()
      .then((res) => {
        this.setState({ dataSource: res.data });
      })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      })
      .finally(() => {
        this.setState({ isLoadingTable: false });
      });
  };

  handleRowSelected = (record) => {
    if (this.props.onFinishScreen) {
      this.props.onFinishScreen({
        Lo_office_code: record.office_code,
        Lo_branch_store_code: record.branch_store_code,
        recordData: record,
      });
    }
  };

  render() {
    return (
      <div className="office-inquiry">
        <Card title="事業所照会">
          <Table
            dataSource={this.state.dataSource}
            loading={this.state.isLoadingTable}
            bordered={true}
            rowKey={(record) => this.state.dataSource.indexOf(record)}
            size="small"
          >
            <Table.Column title="事業所ｺｰﾄﾞ" dataIndex="office_code" key="" />
            <Table.Column title="支社店" dataIndex="branch_store_code" key="" />
            <Table.Column
              title="事業所名（カナ）"
              dataIndex="office_kana_name"
              key=""
            />
            <Table.Column
              title="事　業　所　名　称"
              dataIndex="office_kanji_name"
              key=""
            />
            <Table.Column
              align="center"
              width={80}
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

const mapStateToProps = ({ userReducer, alertReducer }) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WS0445006_OfficeInquiry);
