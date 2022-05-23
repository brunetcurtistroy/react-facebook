import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Draggable from 'react-draggable';
import {
  getScreenDataCreatingContractHistoryTogetherAction, displayButtonCreatingContractHistoryTogetherAction,
  eventF12CreatingContractHistoryTogetherAction, getDataCreatingContractHistoryTogetherAction, selectOneLineCreatingContractHistoryTogetherAction,
  selectAllCreatingContractHistoryTogetherAction
} from "redux/basicInfo/CreatingContractHistoryTogether/CreatingContractHistoryTogether.action";

import { Card, Form, Checkbox, Button, Table, Row, Col, Space, Divider, Modal, message } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import moment from "moment-timezone";
import Color from "constants/Color";

const styleBorderRight = {
  borderRight: '1px solid #F0F0F0',
}
class WS0317001_CreateContractHistoryTogether extends React.Component {
  static propTypes = {
    Li_MenuOption: PropTypes.any,
    onFinishScreen: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.draggleRef = React.createRef();
    // document.title = '契約履歴一括作成';

    this.state = {
      pagination: {
        defaultPageSize: 25,
        size: 'small',
        // showQuickJumper: true
      },
      isLoading: false,
      isModalVisible: false,
      Ms0710ContractHistoryId: [],
      dataSource: [],
      selectedRowKeys: [],
      objInit: {},
    };
    this.onFinish = this.onFinish.bind(this);
  }

  componentDidMount = () => {
    this.loadInitData({ Li_MenuOption: this.props.Li_MenuOption })
  }

  loadInitData = (params) => {
    getScreenDataCreatingContractHistoryTogetherAction(params)
      .then(res => {
        if (res?.data) {
          this.setState({ objInit: res.data });
        }
      })
      .catch(err => message.error(err?.response?.data?.message || "エラーが発生しました"))
  }

  loadData = () => {
    this.setState({ isLoading: true });
    getDataCreatingContractHistoryTogetherAction()
      .then(res => {
        let data = res.data;
        if (data) {
          let listID = []
          data.map(item => {
            if (item.W1_enabled_disabled) listID.push(item.id)
          })
          this.setState({
            dataSource: data,
            Ms0710ContractHistoryId: listID,
          });
        }
      })
      .catch(err => message.error(err?.response?.data?.message || "エラーが発生しました"))
      .finally(() => this.setState({ isLoading: false }))
  }

  eventDisplay = (params) => {
    displayButtonCreatingContractHistoryTogetherAction(params)
      .then(res => this.loadData())
      .catch(err => message.error(err?.response?.data?.message || "エラーが発生しました"))
  }

  RunF12 = () => {
    let ContractStartDateChar = this.formRef?.current?.getFieldValue('ContractStartDateChar');
    let UseContractOnly = this.formRef?.current?.getFieldValue('UseContractOnly');
    const params = {
      ContractStartDateChar: ContractStartDateChar ? moment(ContractStartDateChar).format('YYYY/MM/DD') : '',
      AllPart: this.state.objInit.AllPart,
      UseContractOnly: UseContractOnly ? 1 : 0
    }
    this.resetDraggable()
    Modal.confirm({
      content: "選択した契約の年度更新を実行しますか",
      okText: 'いいえ',
      cancelText: 'はい',
      className: "modal-confirm",
      onCancel: () => {
        this.setState({ isModalVisible: true });
        eventF12CreatingContractHistoryTogetherAction(params)
          .then(() => this.loadData())
          .catch(err => message.error(err?.response?.data?.message || "エラーが発生しました"))
          .finally(() => this.setState({ isModalVisible: false }))
      },
      modalRender: (modal) => this.DraggableRender(modal)
    });
    setTimeout(() => {
      const dialog = document.querySelector('.modal-confirm')
      const modalConfirm = dialog.querySelector('.react-draggable')
      if (modalConfirm) {
        modalConfirm.setAttribute('style', 'cursor: all-scroll')
      }
    })
  }

  resetDraggable() {
    if (this.draggleRef && this.draggleRef.current) {
      this.draggleRef.current.state.x = 0
      this.draggleRef.current.state.y = 0
    }
  }

  DraggableRender = (modal) => {
    return (<Draggable
      ref={this.draggleRef}
    >
      {modal}
    </Draggable>)
  }

  eventSelectRecord = (params) => {
    selectOneLineCreatingContractHistoryTogetherAction(params)
      .then(() => this.loadData())
      .catch()
  }

  eventSelectAllRecord = (params) => {
    selectAllCreatingContractHistoryTogetherAction(params)
      .then(() => this.loadData())
      .catch()
  }

  onFinish(values) {
    const params = {
      ContractStartDateChar: values.ContractStartDateChar ? moment(values.ContractStartDateChar).format('YYYY/MM/DD') : '',
      AllPart: this.state.objInit.AllPart,
      UseContractOnly: values.UseContractOnly ? 1 : 0
    }
    this.eventDisplay(params);
  }

  sortDate = (a, b) => {
    let dateA = new Date(a);
    let dateB = new Date(b);
    return isFinite(dateA - dateB)
      ? dateA - dateB
      : isFinite(dateA) ? 1 : -1
  };

  render() {
    let year = parseInt(moment().format('YYYY')) + 1;
    let dateTemp = year + '/04';
    return (
      <div className="create-contract-history-together">
        <Card >
          <Form ref={this.formRef} onFinish={this.onFinish} initialValues={{
            UseContractOnly: true,
            ContractStartDateChar: moment(dateTemp)
          }}>
            <Row gutter={20}>
              <Col xl={6} lg={12} md={12} span={6} style={styleBorderRight}>
                <Row>
                  <Space>
                    <Form.Item name="ContractStartDateChar">
                      <VenusDatePickerCustom formRefDatePicker={this.formRef} format="YYYY/MM/DD" />
                    </Form.Item>
                    <Form.Item label='分の契約を作成'></Form.Item>
                  </Space>
                </Row>

                <Form.Item name='UseContractOnly' valuePropName='checked'>
                  <Checkbox >使用契約のみ作成</Checkbox>
                </Form.Item>

                <Form.Item style={{ float: "right" }}>
                  <Button htmlType='submit' icon={<SearchOutlined />}>検　　索</Button>
                </Form.Item>

                <Divider></Divider>

                <Form.Item style={{ float: "right", margin: 0 }}>
                  <Button type="primary" onClick={this.RunF12}>一括作成</Button>
                </Form.Item>
              </Col>

              <Col xl={18} lg={24} md={24} span={18}>
                <Table
                  dataSource={this.state.dataSource}
                  size='small'
                  loading={this.state.isLoading}
                  rowKey={record => record?.id}
                  pagination={{
                    ...this.state.pagination,
                    hideOnSinglePage: this.state.dataSource.length > 10 ? false : true
                  }}
                  bordered
                  rowSelection={{
                    selectedRowKeys: this.state.Ms0710ContractHistoryId,
                    onChange: (selectedRowKeys, selectedRows) => this.setState({ Ms0710ContractHistoryId: selectedRowKeys }),
                    onSelect: (record, selected) => this.eventSelectRecord({ id: record.id, W1_enabled_disabled: selected ? 1 : 0 }),
                    onSelectAll: (selected) => this.eventSelectAllRecord({ SelectAll: selected ? 1 : 0 })
                  }}
                >
                  <Table.Column title="契約種別" dataIndex="ContractTypeChar" showSorterTooltip={false}
                    sorter={(a, b) => a.ContractTypeChar.localeCompare(b.ContractTypeChar, 'ja')}
                    render={(text, record) => <div style={{ color: Color(record.Expression_9).Foreground }}>{text}</div>}
                  />
                  <Table.Column title="契約団体コード" dataIndex="W1_contract_org_cd" width={140} showSorterTooltip={false}
                    sorter={(a, b) => a.W1_contract_org_cd - b.W1_contract_org_cd}
                    render={(text, record) => (
                      <div style={{ textAlign: 'right', marginRight: '5px', color: Color(record.Expression_9).Foreground }}>
                        {text}
                      </div>
                    )}
                  />
                  <Table.Column title="契約名称" dataIndex="W1_contract_name" showSorterTooltip={false}
                    sorter={(a, b) => a.W1_contract_name.localeCompare(b.W1_contract_name, 'ja')}
                    render={(text, record) => <div style={{ color: Color(record.Expression_9).Foreground }}>{text}</div>}
                  />
                  <Table.Column title="履歴情報" showSorterTooltip={false}
                    sorter={(a, b) => this.sortDate(a.contract_start_date_on, b.contract_start_date_on)}
                    render={(text, record, index) => (
                      <Space>
                        <div style={{ color: Color(record.Expression_9).Foreground }}>
                          {moment(record.contract_start_date_on).format('YYYY/MM/DD')}
                        </div>
                        <div style={{ color: Color(record.Expression_9).Foreground }}>{record.contract_name}</div>
                      </Space>
                    )}
                  />
                  <Table.Column title="使用" dataIndex="Use" align='center' showSorterTooltip={false} sorter={(a, b) => a.Use.localeCompare(b.Use)} />
                </Table>

              </Col>
            </Row>
          </Form>
        </Card>
        <Modal
          title={<div style={{ padding: '5px' }}>処理中</div>}
          visible={this.state.isModalVisible}
          footer={null}
          width={300}
          bodyStyle={{ textAlign: 'center', background: '#C8DCF5' }}
          closable={false}
        >
          <div style={{ color: '#14468C', fontWeight: 'bold' }}>処理中です。</div>
          <div style={{ color: '#14468C', fontWeight: 'bold' }}>しばらくお待ちください。</div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS0317001_CreateContractHistoryTogether);
