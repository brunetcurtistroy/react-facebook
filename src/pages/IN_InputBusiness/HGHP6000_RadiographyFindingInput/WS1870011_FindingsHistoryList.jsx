import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import { Card, Form, Table, } from "antd";
import FindingsHistoryListAction from "redux/InputBusiness/RadiographyFindingInput/FindingsHistoryList.action"
class WS1870011_FindingsHistoryList extends React.Component {
  constructor(props) {
    super(props);

    // document.title = '所見履歴一覧';

    this.state = {
      selectedRowTableFirst: [],
      isLoadingTable: true,
      dataSource : []
    };
  }

  handleSelectRowsTableFirst = selectedRowTableFirst => {
    console.log(selectedRowTableFirst);
    this.setState({ selectedRowTableFirst });
  };
  componentDidMount(){
    this.getListData();
  }
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.getListData();
    }
  }
  getListData(){
    this.setState({ isLoadingTable: true });
    FindingsHistoryListAction.getListDataAction()
      .then((res) => {
        if (res) {
          this.setState({ dataSource: res });
        }
      })
      .finally(() => {
        this.setState({ isLoadingTable: false });
      });
  }

  render() {
    const { selectedRowTableFirst } = this.state

    const rowSelectionTableFirst = {
      selectedRowTableFirst,
      onChange: this.handleSelectRowsTableFirst
    }

    return (
      <div className="findings-history-list">
        <Card title="所見履歴一覧">
          <Table
            dataSource={this.state.dataSource}
            loading={this.state.isLoadingTable}
            pagination={false}
            rowKey={(value , record, index ) => index}
            // rowSelection={{ type: "radio", ...rowSelectionTableFirst }}
          >
            <Table.Column title="受診日" dataIndex="visit_date_on"
                 render={(row, record, index) => {
                  return (
                    <Form.Item
                      style={{ marginBottom: "0px" }}
                      name={["visit_date_on"]}
                    >
                      <span> {moment(record.visit_date_on).format("YYYY/MM/DD")}</span>
                    </Form.Item>
                  );
                }}
            />
            <Table.Column title="所見内容" dataIndex="FindingsContent"  />
            <Table.Column title="" dataIndex="InspectResults"  />
            <Table.Column title="判定" dataIndex="Judge"  />

          </Table>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS1870011_FindingsHistoryList);
