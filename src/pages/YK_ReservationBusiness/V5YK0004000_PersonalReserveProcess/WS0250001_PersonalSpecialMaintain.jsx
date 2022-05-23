import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import { Card, Table, Select, Input, Button, message } from "antd";

import { WarningOutlined, SaveOutlined, InfoCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

import PersonalSpecialMaintainAction from "redux/ReservationBusiness/PersonalReserveProcess/PersonalSpecialMaintain.action";

class WS0250001_PersonalSpecialMaintain extends React.Component {

  static propTypes = {
    Li_PersonalNum: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = '個人特記保守';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },

      dataSource: [],
      isLoadingTable: false,
      selectedRowKeys: [],
      rowSelected: [],
      indexTable: 0,
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.getDataTable()
    }
  }

  getDataTable() {
    let params = {
      PersonalNum: this.props.Li_PersonalNum ? this.props.Li_PersonalNum : 1
    }

    this.setState({ isLoadingTable: true })

    PersonalSpecialMaintainAction.getDataTable(params)
      .then((res) => {
        this.setState({
          dataSource: res ? res : [],
          isLoadingTable: false,
          selectedRowKeys: res && res.length > 0 ? [res[0].id] : [],
          rowSelected: res && res.length > 0 ? [res[0]] : [],
          indexTable: 0
        })
      })
      .finally(() => this.setState({ isLoadingTable: false }))
  }

  findIndexByID = (recordID) => {
    return this.state.dataSource.findIndex((item) => recordID === item.id);
  };

  updateDatasource(index, field, value) {
    let data = [...this.state.dataSource];

    data[index][field] = value;

    this.setState({
      dataSource: data
    });
  }

  callApiUpdateRecord(index) {
    let params = { ...this.state.dataSource[index] }
    PersonalSpecialMaintainAction.updateData(params)
      .then((res) => {
        message.success('更新しました。!')
      })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  }

  render() {
    return (
      <div className="personal-special-maintain">
        <Card title="個人特記保守">
          <Table
            size='small'
            dataSource={this.state.dataSource}
            loading={this.state.isLoadingTable}
            pagination={false}
            bordered
            rowKey={(record) => record.id}
            rowSelection={{
              type: "radio",
              fixed: 'left',
              selectedRowKeys: this.state.selectedRowKeys,
              onSelect: (record, selected, selectedRows) => {
                let index = this.state.dataSource.findIndex(x => x.id === record.id)
                this.setState({
                  rowSelected: selectedRows,
                  selectedRowKeys: selectedRows.map(x => x.id),
                  indexTable: index,
                });
                //  this.changeRow(index)
              },
            }}
          >
            <Table.Column title="重要度" dataIndex="importance" width={80}
              render={(value, record, index) => {
                return (
                  <div>
                    {this.state.indexTable !== this.findIndexByID(record.id) ?
                      <span style={{ paddingLeft: 5 }}>{record.importance === 1 ? '情報' : record.importance === 3 ? '警告' : record.importance === 5 ? '重要' : ''}</span>
                      :
                      <Select style={{ width: '100%' }} value={record.importance}
                        onChange={(value) => {
                          this.updateDatasource(this.findIndexByID(record.id), "importance", value)
                        }}>
                        <Select.Option value={1}>情報</Select.Option>
                        <Select.Option value={3}>警告</Select.Option>
                        <Select.Option value={5}>重要</Select.Option>
                      </Select>
                    }
                  </div>
                )
              }}
            />
            <Table.Column title="" dataIndex="Expression_14" width={10}
              render={(value, record) => {
                let icon = null;
                switch (record.importance) {
                  case 1:
                    icon = (<InfoCircleOutlined style={{ fontSize: 20, color: "#1890ff" }} />);
                    break;

                  case 3:
                    icon = (<WarningOutlined style={{ fontSize: 20, color: "#faad14" }} />);
                    break;

                  case 5: icon = (<CloseCircleOutlined style={{ fontSize: 20, color: "#ff4d4f" }} />);
                    break;

                  default:
                }
                return (<div>{icon}</div>);
              }}
            />
            <Table.Column title="特記メモ" dataIndex="content"
              render={(value, record, index) => {
                return (
                  <div>
                    {this.state.indexTable !== this.findIndexByID(record.id) ?
                      <span style={{ paddingLeft: 5 }}>{record.content}</span>
                      :
                      <Input value={record.content}
                        onChange={(e) => {
                          this.updateDatasource(this.findIndexByID(record.id), "content", e.target.value)
                        }}
                      />
                    }
                  </div>
                )
              }} />
            <Table.Column title="登録者" dataIndex="user_name" />
            <Table.Column title="登録日" dataIndex="registration_date_on" />
            <Table.Column
              render={(value, record, index) => {
                return <div style={{ textAlign: "center" }}>
                  <Button
                    style={{ color: '#42b10b', border: 'none', marginRight: '5px' }}
                    onClick={() => { this.callApiUpdateRecord(this.findIndexByID(record.id)) }}
                    icon={<SaveOutlined />} >
                  </Button>
                </div>
              }}
            />
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0250001_PersonalSpecialMaintain);
