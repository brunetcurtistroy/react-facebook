import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Button, Card, Space, Table, Modal, Row, Col, InputNumber, Tooltip, Checkbox, Input, Select } from "antd";
import { PlusOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';
import  ModalDraggable  from "components/Commons/ModalDraggable";
import WS0493001_ConditionCopyingScreen from "./WS0493001_ConditionCopyingScreen";
import WS0487001_ConditionExpressAddSub from "./WS0487001_ConditionExpressAddSub";
import WS0486001_ConditionCorrectSub from "./WS0486001_ConditionCorrectSub";


class WS0483001_ConditionExpressCmtSub extends React.Component {

  static propTypes = {
    Li_GuideMattersCode: PropTypes.number,
    Li_AdoptionDate: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = '条件式コメントSUB';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },

      dataSource1: [],
      isLoadingTable1: false,
      selectedRow1: [],
      selectedRowKeys1: [],
      indexTable1: 0,
      old_serial_number: '',

      dataSource2: [],
      isLoadingTable2: false,
      selectedRow2: [],
      selectedRowKeys2: [],
      indexTable2: 0,
      old_branch_number: '',

      Lio_System: 0
    };
  }

  componentDidMount() {
    this.getDataLeft()
    this.getDataRight()
  };

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.getDataLeft()
      this.getDataRight()
    }
  };

  getDataLeft() {
    let data = [
      { id: 1, serial_number: 1010101010, name: 'aaa aaaaa', priority: 12, Expression_14: 'o' },
      { id: 2, serial_number: 20, name: 'vvv aaaaa', priority: 10, Expression_14: 'o' }
    ]
    this.setState({
      dataSource1: data,
      selectedRow1: [data[0]],
      selectedRowKeys1: [data[0]?.id],
      indexTable1: 0,
      old_serial_number: data[0].serial_number
    })
  }

  getDataRight() {
    let data = [
      { id: 1, branch_number: 10, EquationDisplay: 'aaa aaaaa', formula: 'aaa aaaaa' },
      { id: 2, branch_number: 20, EquationDisplay: 'vvv aaaaa', formula: 'vvv aaaaa' }
    ]
    this.setState({
      dataSource2: data,
      selectedRow2: [data[0]],
      selectedRowKeys2: [data[0]?.id],
      indexTable2: 0,
      old_branch_number: data[0].branch_number
    })
  }

  ////
  findIndexByID = (arrayData, recordID) => {
    return arrayData.findIndex((item) => recordID === item.id);
  };

  /////
  checkDuplicateCode(type) {
    let lstData = [];

    if (type === 'Condition') {
      lstData = [...this.state.dataSource1];
      const uniqueValues = new Set(lstData.map(v => v.serial_number));

      if (uniqueValues.size < lstData.length) {
        return true;
      } return false;
    }

    if (type === 'Detail') {
      lstData = [...this.state.dataSource2];
      const uniqueValues = new Set(lstData.map(v => v.branch_number));

      if (uniqueValues.size < lstData.length) {
        return true;
      } return false;
    }
  }

  // check id null
  checkIdTemp(id) {
    if (id === '') {
      return true
    }
    return false;
  }

  checkAddItem(type) {
    if (type === 'Condition') {
      if (this.state.dataSource1.length > 0) {
        let index = this.state.dataSource1.findIndex(x => !x.serial_number);
        if (index === -1) {
          return false;
        }
        return true
      }
    }

    if (type === 'Detail') {
      if (this.state.dataSource2.length > 0) {
        let index = this.state.dataSource2.findIndex(x => !x.branch_number);
        if (index === -1) {
          return false;
        }
        return true
      }
    }
  }

  checkDisabledBtnAdd(type) {
    if (type === 'Condition') {
      if (this.state.selectedRow1.length > 0) {
        if (this.checkAddItem(type) || this.checkIdTemp(this.state.selectedRow1[0]?.id) ||
          (!this.checkIdTemp(this.state.selectedRow1[0]?.id) &&
            this.state.selectedRow1[0]?.serial_number !== this.state.old_serial_number)) {
          return true;
        } return false;
      } return false;
    }

    if (type === 'Detail') {
      if (this.state.selectedRow2.length > 0) {
        if (this.checkAddItem(type) || this.checkIdTemp(this.state.selectedRow2[0]?.id) ||
          (!this.checkIdTemp(this.state.selectedRow2[0]?.id) &&
            this.state.selectedRow2[0]?.branch_number !== this.state.old_branch_number)) {
          return true;
        } return false;
      } return false;
    }
  }

  // add new record
  async handleAddRowTable(type) {
    let newRow = { id: '' };

    let data = [];

    if (type === 'Condition') {
      data = [...this.state.dataSource1]
      data.unshift(newRow);
      await this.setState({
        dataSource1: data,
        selectedRow1: [newRow],
        selectedRowKeys1: [newRow.id],
        indexTable1: 0,
      });
    }

    if (type === 'Detail') {
      data = [...this.state.dataSource2]
      data.unshift(newRow);
      await this.setState({
        dataSource2: data,
        selectedRow2: [newRow],
        selectedRowKeys2: [newRow.id],
        indexTable2: 0
      });
    }
    this.forceUpdate();
  }

  // check selected record while add new
  changeRow(record, type) {
    let data = [];
    if (type === 'Condition') {
      data = [...this.state.dataSource1]

      let index = this.findIndexByID(this.state.dataSource1, record.id)

      let idTemp = false;
      data.forEach(item => {
        if (this.checkIdTemp(item.id)) {
          idTemp = true;
          return idTemp;
        }
      })

      if (idTemp) {
        this.setState({
          selectedRow1: [data[0]],
          selectedRowKeys1: [data[0]?.id],
          indexTable1: 0
        });
      } else {
        this.setState({
          selectedRow1: [record],
          selectedRowKeys1: [record.id],
          indexTable1: index,
          old_serial_number: record.serial_number
        })
      }
    }

    if (type === 'Detail') {
      data = [...this.state.dataSource2]

      let index = this.findIndexByID(this.state.dataSource2, record.id)
      let idTemp = false;
      data.forEach(item => {
        if (this.checkIdTemp(item.id)) {
          idTemp = true;
          return idTemp;
        }
      })

      if (idTemp) {
        this.setState({
          selectedRow2: [data[0]],
          selectedRowKeys2: [data[0]?.id],
          indexTable2: 0
        });
      } else {
        this.setState({
          selectedRow2: [record],
          selectedRowKeys2: [record.id],
          indexTable2: index,
          old_branch_number: record.branch_number
        })
      }
    }
  }

  updateDatasource(index, field, value, type) {
    let data = [];

    if (type === 'Condition') {
      data = [...this.state.dataSource1]

      data[index][field] = value;

      this.setState({
        dataSource1: data
      });
    }

    if (type === 'Detail') {
      data = [...this.state.dataSource2]

      data[index][field] = value;

      this.setState({
        dataSource2: data
      });
    }
  }

  async handleDeleteRowTable(type, index) {
    let data = [];

    if (type === 'Condition') {
      data = [...this.state.dataSource1]

      data.splice(0, 1);
      await this.setState({
        dataSource1: data,
        indexTable1: 0,
        selectedRow1: data.length > 0 ? [data[0]] : [],
        selectedRowKeys1: data.length > 0 ? [data[0]?.id] : [],
        old_serial_number: data.length > 0 ? data[0]?.serial_number : null
      });
      this.getDataLeft()
    }

    if (type === 'Detail') {
      data = [...this.state.dataSource2]

      data.splice(index, 1);
      this.setState({
        dataSource2: data,
        indexTable2: 0,
        selectedRow2: data.length > 0 ? [data[0]] : [],
        selectedRowKeys2: data.length > 0 ? [data[0]?.id] : [],
        old_branch_number: data.length > 0 ? data[0]?.branch_number : null
      });
    }
  }

  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }

  showMHConditionExpressAddSub_487(record) {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: 900,
        component:
          <WS0487001_ConditionExpressAddSub
            onFinishScreen={(output) => {
              this.updateDatasource(this.findIndexByID(this.state.dataSource2, record.id), "EquationDisplay", output.Lo_Setting, 'Detail')
              this.updateDatasource(this.findIndexByID(this.state.dataSource2, record.id), "formula", output.Lo_Setting, 'Detail')
              this.closeModal()
            }}
          />
        ,
      },
    });
  }

  showMHConditionCorrectSub_486(record) {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: 900,
        component:
          <WS0486001_ConditionCorrectSub
            Lio_ConditionalExpression={this.state.selectedRow2[0]?.formula}
            onFinishScreen={(output) => {
              this.updateDatasource(this.findIndexByID(this.state.dataSource2, record.id), "EquationDisplay", output.Lio_ConditionalExpression, 'Detail')
              this.updateDatasource(this.findIndexByID(this.state.dataSource2, record.id), "formula", output.Lio_ConditionalExpression, 'Detail')
              this.closeModal()
            }}
          />
        ,
      },
    });
  }

  onDoubleClickTable2(record) {
    if (record.formula) {
      this.showMHConditionCorrectSub_486(record)
    } else {
      this.showMHConditionExpressAddSub_487(record)
    }
  }

  render() {
    return (
      <div className="condition-express-cmt-sub">
        <Card title="条件式コメントSUB">
          <Space>
            <Button
              onClick={() => {
                this.setState({
                  childModal: {
                    ...this.state.childModal,
                    visible: true,
                    width: 900,
                    component:
                      <WS0493001_ConditionCopyingScreen
                        Li_GuideCmt={''}
                        Li_StartDate={''}
                        Li_SerialNum={''}
                        Li_StsGuideCmt={true}
                        Li_StsStartDate={true}
                        Li_StsSerialNum={true}
                        onFinishScreen={(output) => {


                          this.closeModal()
                        }}
                      />
                    ,
                  },
                });
              }}>
              複写
            </Button>
          </Space>
          <hr style={{ margin: '15px 0' }} />
          <Row gutter={24} style={{marginBottom: 7}}>
            <Col span={11} style={{ paddingRight: 5, borderRight: '1px solid #54a2ea' }}>
              <Table
                size='small'
                style={{ cursor: 'pointer' }}
                rowClassName={(record, index) => record.id === this.state.selectedRow1[0]?.id ? 'table-row-light' : ''}
                dataSource={this.state.dataSource1}
                loading={this.state.isLoadingTable1}
                pagination={false}
                scroll={{ x: 350, y: 700 }} 
                bordered
                rowKey={(res) => res.id}
                onRow={(record, rowIndex) => {
                  return {
                    onClick: () => {
                      this.changeRow(record, 'Condition')
                    }
                  };
                }}
              >
                <Table.Column dataIndex="enabled" width={40} align='center'
                  render={(value, record, index) => {
                    return (
                      <div>
                        <Checkbox checked={record.enabled}
                          disabled={this.state.indexTable1 !== this.findIndexByID(this.state.dataSource1, record.id)}
                          onChange={(event) => {
                            this.updateDatasource(this.findIndexByID(this.state.dataSource1, record.id), "enabled", event.target.checked, 'Condition')
                          }}

                        />
                      </div>
                    )
                  }} />
                <Table.Column title="連番" dataIndex="serial_number" width={110}
                  render={(value, record, index) => {
                    return (
                      <div>
                        {(this.state.indexTable1 !== this.findIndexByID(this.state.dataSource1, record.id) || !this.checkIdTemp(record.id)) ?
                          <div style={{ paddingRight: 7, textAlign: 'right' }}>{record.serial_number}</div>
                          :
                          <InputNumber value={record.serial_number} maxLength={10}
                            onDoubleClick={() => {
                            }}

                            onChange={(value) => {
                              this.updateDatasource(this.findIndexByID(this.state.dataSource1, record.id), "serial_number", value, 'Condition')
                            }}

                          />
                        }
                      </div>
                    )
                  }} />
                <Table.Column title="名称" dataIndex="name" />
                <Table.Column title="優先" dataIndex="priority" width={40}
                  render={(value, record, index) => {
                    return (
                      <div>
                        {(this.state.indexTable1 !== this.findIndexByID(this.state.dataSource1, record.id) || !this.checkIdTemp(record.id)) ?
                          <div style={{ paddingRight: 7, textAlign: 'right' }}>{record.priority}</div>
                          :
                          <InputNumber value={record.priority} maxLength={2}
                            onDoubleClick={() => {
                            }}

                            onChange={(value) => {
                              this.updateDatasource(this.findIndexByID(this.state.dataSource1, record.id), "priority", value, 'Condition')
                            }}

                          />
                        }
                      </div>
                    )
                  }} />
                <Table.Column title="条件" dataIndex="Expression_14" width={40} align='center' />
                <Table.Column width={70}
                  title={
                    <div style={{ textAlign: "center" }}>
                      <Button size='small'
                        disabled={this.checkDisabledBtnAdd('Condition')}
                        onClick={() => this.handleAddRowTable('Condition')}
                        type="primary" icon={<PlusOutlined />}>
                      </Button>
                    </div>
                  }
                  render={(text, record, index) => {
                    return <div style={{ textAlign: "center" }}>
                      <Button size='small'
                        hidden={this.state.indexTable1 !== this.findIndexByID(this.state.dataSource1, record.id) || this.checkAddItem('Condition')
                          || !(this.state.dataSource1[this.state.indexTable1] && this.state.dataSource1[this.state.indexTable1].serial_number)}
                        // onClick={() => { this.saveData(this.findIndexByID(this.state.dataSource1, record.id), true) }}
                        style={{ color: '#42b10b', border: 'none', marginRight: '5px' }}
                        icon={<SaveOutlined />} >
                      </Button>
                      <Button size='small' style={{ border: 'none' }}
                        onClick={() => {
                          // this.checkIdTemp(record.id) ? this.handleDeleteRowTable('Condition') : this.deleteData(record.id)
                        }}
                        danger
                        icon={<DeleteOutlined />}
                      >
                      </Button>
                    </div>;
                  }}
                />

              </Table>
            </Col>

            <Col span={13} style={{ paddingLeft: 5 }}>
              <div style={{ marginBottom: 10 }}>
                <Select value={this.state.Lio_System} style={{ width: 80 }}
                  onChange={(value) => this.setState({ Lio_System: value })}>
                  <Select.Option value={0}>OR</Select.Option>
                  <Select.Option value={1}>AND</Select.Option>
                </Select>
              </div>
              <Table
                size='small'
                style={{ cursor: 'pointer', borderBottom: '2px solid #bfbfbf'}}
                rowClassName={(record, index) => record.id === this.state.selectedRow2[0]?.id ? 'table-row-light' : ''}
                dataSource={this.state.dataSource2}
                loading={this.state.isLoadingTable2}
                pagination={false}
                scroll={{ x: 350, y: 700 }}
                bordered
                rowKey={(res) => res.id}
                onRow={(record, rowIndex) => {
                  return {
                    onClick: () => {
                      this.changeRow(record, 'Detail')
                    }
                  };
                }}
              >
                <Table.Column title="SEQ" dataIndex="branch_number" width={110}
                  render={(value, record, index) => {
                    return (
                      <div>
                        {this.state.indexTable2 !== this.findIndexByID(this.state.dataSource2, record.id) ?
                          <div style={{ paddingRight: 7, textAlign: 'right' }}>{record.branch_number}</div>
                          :
                          <InputNumber value={record.branch_number} maxLength={10}
                            onDoubleClick={() => {
                              this.onDoubleClickTable2(record)
                            }}

                            onChange={(value) => {
                              this.updateDatasource(this.findIndexByID(this.state.dataSource2, record.id), "branch_number", value, 'Detail')
                            }}

                          />
                        }
                      </div>
                    )
                  }} />
                <Table.Column title="条件式" dataIndex="EquationDisplay"
                  render={(value, record, index) => {
                    return (
                      <Tooltip title='ｽﾞｰﾑで条件式の設定画面が表示されます'>
                        {this.state.indexTable2 !== this.findIndexByID(this.state.dataSource2, record.id) ?
                          <div>{record.EquationDisplay}</div>
                          :
                          <div
                            onDoubleClick={() => {
                              this.onDoubleClickTable2(record)
                            }}
                          >{record.EquationDisplay}</div>
                        }
                      </Tooltip>
                    )
                  }}
                />
                <Table.Column width={70}
                  title={
                    <div style={{ textAlign: "center" }}>
                      <Button size='small'
                        disabled={this.checkDisabledBtnAdd('Detail')}
                        onClick={() => this.handleAddRowTable('Detail')}
                        type="primary" icon={<PlusOutlined />}>
                      </Button>
                    </div>
                  }
                  render={(text, record, index) => {
                    return <div style={{ textAlign: "center" }}>
                      <Button size='small'
                        hidden={this.state.indexTable2 !== this.findIndexByID(this.state.dataSource2, record.id) || this.checkAddItem('Detail')
                          || !(this.state.dataSource2[this.state.indexTable2] && this.state.dataSource2[this.state.indexTable2].branch_number)}
                        // onClick={() => { this.saveData(this.findIndexByID(this.state.dataSource2, record.id), true) }}
                        style={{ color: '#42b10b', border: 'none', marginRight: '5px' }}
                        icon={<SaveOutlined />} >
                      </Button>
                      <Button size='small' style={{ border: 'none' }}
                        onClick={() => {
                          // this.checkIdTemp(record.id) ? this.handleDeleteRowTable('Detail') : this.deleteData(record.id)
                        }}
                        danger
                        icon={<DeleteOutlined />}
                      >
                      </Button>
                    </div>;
                  }}
                />

              </Table>
              <Input.TextArea rows={2} defaultValue={this.state.selectedRow2[0]?.formula} />
            </Col>
          </Row>

          <Input.TextArea rows={2} name='Remarks'></Input.TextArea>
        </Card>

        <ModalDraggable
          width={this.state.childModal.width}
          visible={this.state.childModal.visible}
          component={this.state.childModal.component}
          bodyStyle={{ margin: 0, padding: 0 }}
          maskClosable={false}
          onCancel={() => {
            this.setState({
              childModal: {
                ...this.state.childModal,
                visible: false,
              },
            });
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS0483001_ConditionExpressCmtSub);
