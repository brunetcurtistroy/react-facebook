import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Card, Table, Button, message } from "antd";
import PrintStyleInquiryService from "services/ResultOutput/CourseSpecificStardStyleSetting/PrintStyleInquiryService";

class WS0445007_PrintStyleInquiry extends React.Component {
  static propTypes = {
    Lo_standard_printing_style: PropTypes.any,
    Lo_format_name: PropTypes.any,

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
    this.setState({ isLoadingTable: true });
    PrintStyleInquiryService.getListPrintStyleInquiryService()
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
        Lo_standard_printing_style: record.style_code,
        Lo_format_name: record.format_name,
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
            bordered={true}
            rowKey={(record) => this.state.dataSource.indexOf(record)}
            size="small"
          >
            <Table.Column title="様式" dataIndex="style_code" key="" />
            <Table.Column
              title="様　式　名　称"
              dataIndex="format_name"
              key=""
            />
            <Table.Column
              align="center"
              width={80}
              title=""
              dataIndex=""
              render={(text, record, index) => (
                <Button
                  size="small"
                  onClick={() => this.handleRowSelected(record)}
                  type="primary"
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
)(WS0445007_PrintStyleInquiry);
