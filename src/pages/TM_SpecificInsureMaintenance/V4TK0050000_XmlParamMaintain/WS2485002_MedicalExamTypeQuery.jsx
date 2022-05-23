import React from "react";
import { connect } from "react-redux";

import { Button, Card, Table, } from "antd";
import MedicalExamTypeQueryAction from "redux/SpecificInsureMaintenance/XmlParamMaintain/MedicalExamTypeQuery.action";

class WS2485002_MedicalExamTypeQuery extends React.Component {
  constructor(props) {
    super(props);

    // document.title = '健診種別照会';

    this.state = {
      dataSource: [],
      isLoadingTable: false,
      rowSelected: [],
      selectedRowKeys: []
    };
  }

  componentDidMount() {
    this.getScreenData();
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.getScreenData();
    }
  }

  getScreenData() {
    this.setState({ isLoadingTable: true });

    MedicalExamTypeQueryAction.getScreenData()
      .then((res) => {
        this.setState({
          dataSource: res ? res : [],
          isLoadingTable: false,
          rowSelected: res && res.length > 0 ? [res[0]] : [],
          selectedRowKeys: res && res.length > 0 ? [res[0].id] : []
        })
      })
      .finally(() => this.setState({ isLoadingTable: false }))
  }

  render() {
    return (
      <div className="medical-exam-type-query">
        <Card title="健診種別照会">
          <Table
            size='small'
            dataSource={this.state.dataSource}
            loading={this.state.isLoadingTable}
            pagination={true}
            bordered
            rowKey={(record) => record.id}
            rowSelection={{
              type: "radio",
              selectedRowKeys: this.state.selectedRowKeys,
              onSelect: (record, selected, selectedRows) => {
                this.setState({
                  rowSelected: selectedRows,
                  selectedRowKeys: selectedRows.map(x => x.id),
                });
              },
            }}
          >
            <Table.Column title="健診種別" dataIndex="medical_exam_type" />
            <Table.Column title="名称" dataIndex="medical_exam_type_name" />

          </Table>

          <div style={{ textAlign: 'right' }}>
            <Button type='primary'
              onClick={() => {
                if (this.props.onFinishScreen) {
                  this.props.onFinishScreen({
                    recordData: this.state.rowSelected[0]
                  });
                }
              }}
            >選択</Button>
          </div>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS2485002_MedicalExamTypeQuery);
