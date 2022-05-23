import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Card, Table, message, Button } from "antd";
import EffectiveDateSelectAction from 'redux/InspectionMaintenance/InspectItemJudgeValueSetting/EffectiveDateSelect.actions'
class WS0364005_EffectiveDateSelect extends React.Component {
  static propTypes = {
    Lio_AdoptionDate: PropTypes.any,
    onFinishScreen: PropTypes.func,
  }
  constructor(props) {
    super(props);

    // document.title = '適用日選択';

    this.state = {
      isLoadding: false,
      selectedRows: {},
      tableData: []
    };
  }
  componentDidMount() {
    this.GetScreenData364()
  }
  GetScreenData364() {
    this.setState({ isLoadding: true })
    EffectiveDateSelectAction.GetScreenData364().then(res => {
      this.setState({
        tableData: res ? res : []
      })
    }).catch(error => {
      const res = error.response;
      if (!res || res.data || res.data.message) {
        message.error('エラーが発生しました');
      }
    }).finally(() => this.setState({ isLoadding: false }))
  }
  render() {
    return (
      <div className="effective-date-select">
        <Card title="適用日選択">
          <Table
            dataSource={this.state.tableData}
            size="small" bordered={true} pagination={false}
            loading={this.state.isLoadding}
            rowKey={(record) => record.id}
            scroll={{ y: '60vh' }}
            rowSelection={{
              type: 'radio',
              onChange: async (selectedRowKeys, selectedRows) => {
                await this.setState({
                  ...this.state.selectedRows,
                  selectedRows: selectedRows?.[0]
                })
              }
            }}

          >
            <Table.Column title="適用日" dataIndex="W1_date" />
            <Table.Column title="名称" dataIndex="Expression_2" />
          </Table>
          <Button type="primary" style={{ float: 'right', marginTop: '1em' }} onClick={() => {
            if (this.props.onFinishScreen) {
              this.props.onFinishScreen({ Lio_AdoptionDate: this.state.selectedRows?.W1_date, recordData: this.state.selectedRows })
            }
          }} >選択</Button>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS0364005_EffectiveDateSelect);
