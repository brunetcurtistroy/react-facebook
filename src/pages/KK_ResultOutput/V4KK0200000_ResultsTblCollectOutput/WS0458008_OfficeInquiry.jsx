import React from "react";
import { connect } from "react-redux";

import { Card, Table, Button, message } from "antd";
import PropTypes from "prop-types";
import WS0458008_OfficeInquiryService from "services/ResultOutput/ResultsTblCollectOutput/WS0458008_OfficeInquiryService";

class WS0458008_OfficeInquiry extends React.Component {
  static propTypes = {
    office_code: PropTypes.any,
    branch_store_code: PropTypes.any,
    office_kanji_name: PropTypes.any,
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
    this.getDataList();
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props !== prevProps) {
      this.getDataList();
    }
  };

  getDataList = () => {
    this.setState({ isLoadingTable: true });
    WS0458008_OfficeInquiryService.getListDataService()
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

  handleRowSelected = (selectedRows) => {
    if (this.props.onFinishScreen && selectedRows) {
      this.props.onFinishScreen({
        office_code: selectedRows.office_code,
        branch_store_code: selectedRows.branch_store_code,
        office_kanji_name: selectedRows.office_kanji_name,
        recordData: selectedRows,
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
            rowKey={(record) => record.id}
            size="small"
          >
            <Table.Column
              align="center"
              title="コード"
              dataIndex="office_code"
              key=""
            />
            <Table.Column
              align="center"
              title="支社店"
              dataIndex="branch_store_code"
              key=""
            />
            <Table.Column
              align="center"
              title="事　業　所　名"
              dataIndex="office_kanji_name"
              key=""
            />
            <Table.Column
              align="center"
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
)(WS0458008_OfficeInquiry);
