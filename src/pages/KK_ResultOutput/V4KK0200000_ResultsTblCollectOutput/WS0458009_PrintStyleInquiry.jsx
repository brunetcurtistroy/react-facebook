import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Card, Table, Button, message } from "antd";
import WS0458009_PrintStyleInquiryService from "services/ResultOutput/ResultsTblCollectOutput/WS0458009_PrintStyleInquiryService";

class WS0458009_PrintStyleInquiry extends React.Component {
  static propTypes = {
    Lo_StyleCode: PropTypes.any,
    Lo_FormatName: PropTypes.any,
    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = "印刷様式照会";

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
    WS0458009_PrintStyleInquiryService.getListDataService()
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
        Lo_StyleCode: selectedRows.style_code,
        Lo_FormatName: selectedRows.style_code,
        recordData: selectedRows,
      });
    }
  };

  render() {
    return (
      <div className="print-style-inquiry">
        <Card title="印刷様式照会">
          <Table
            dataSource={this.state.dataSource}
            loading={this.state.isLoadingTable}
            rowKey={(record) => record.id}
            size="small"
          >
            <Table.Column
              align="center"
              title="様式"
              dataIndex="style_code"
              key=""
            />
            <Table.Column
              align="center"
              title="様  式  名"
              dataIndex="style_code"
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
)(WS0458009_PrintStyleInquiry);
