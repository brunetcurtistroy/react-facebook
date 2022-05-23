import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import { Button, Card, Table, message } from "antd";
import FacilityTypeQueryAction from "redux/ResultOutput/MedicalExamDataOutputCsv/FacilityTypeQuery.action"

class WS0784006_FacilityTypeQuery extends React.Component {

  static propTypes = {
    Lio_FacilityType: PropTypes.any,
    Lo_FacilityName: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = '施設区分照会';

    this.state = {
      dataSource: [],
      isLoadingTable: true,
      selectedRowKeys: [],
      rowSelected: [],
      indexTable: 0,
    };
  }
  componentDidMount() {
    this.getDataTable(true);
  }

  componentDidUpdate(PropPev) {
    if (this.props !== PropPev) {
      this.getDataTable(true);
    }
  }

  getDataTable(reload) {
    this.setState({ isLoadingTable: true })
    FacilityTypeQueryAction.GetScreenData()
      .then((res) => {
        let data = res ? res : [];
        let index = reload ? 0 : this.state.indexTable
        this.setState({
          dataSource: data,
          rowSelected: data.length > 0 ? [data[index]] : [],
        })
      })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      })
      .finally(() => this.setState({ isLoadingTable: false }))
  }
  render() {
    return (
      <div className="facility-type-query">
        <Card title="施設区分照会">
          <Table
            dataSource={this.state.dataSource}
            loading={false}
            pagination={false}
            bordered={true}
            rowKey={(record) => record.id}
            rowSelection={{
              type: 'radio',
              onChange: async (selectedRowKeys, selectedRows) => {
                await this.setState({
                  rowSelected: selectedRows
                })
              }
            }}
          >
            <Table.Column title="施設区分" dataIndex="facility_type" key="" />
            <Table.Column title="施設名称" dataIndex="facility_name" key="" />

          </Table>
          <br></br>
          <Button type="primary" disabled={this.state.rowSelected.length === 0} style={{ float: 'right' }}
            onClick={() => {
              if (this.props.onFinishScreen) {
                this.props.onFinishScreen({
                  Lio_FacilityType: this.state.rowSelected.length > 0 ? this.state.rowSelected[0].facility_type : null,
                  Lo_FacilityName: this.state.rowSelected.length > 0 ? this.state.rowSelected[0].facility_name : null
                });
              }
            }}
          >確  定</Button>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS0784006_FacilityTypeQuery);
