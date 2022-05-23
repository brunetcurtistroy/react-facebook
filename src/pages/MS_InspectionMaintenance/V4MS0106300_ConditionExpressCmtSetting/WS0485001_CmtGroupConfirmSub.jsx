import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import WS0486001_ConditionCorrectSub from 'pages/MS_InspectionMaintenance/V4MS0106300_ConditionExpressCmtSetting/WS0486001_ConditionCorrectSub.jsx';
import WS0487001_ConditionExpressAddSub from 'pages/MS_InspectionMaintenance/V4MS0106300_ConditionExpressCmtSetting/WS0487001_ConditionExpressAddSub.jsx';
import  ModalDraggable  from "components/Commons/ModalDraggable";
import { Card, Table, Row, Col, Modal, Form, Input, Checkbox, Select, Tooltip, Menu, Dropdown } from "antd";

const data = {
  Expression_9: '510',
  Expression_3: 1,
  Lio_System: '0',
  remarks: '10',
  dataSource: [{
    id: 1,
    enabled: 1, serial_number: 1002, priority: '12',
    name: '2Z', guidance_comment_code: '5Z', comment_content: '500', start_date_on: '2018/08/01'
  }],
  dataSource2: [
    { id: 1, branch_number: '100', EquationDisplay: 'A32a', Expression_11: '3212', formula: 'ZAZZ' },
    { id: 2, branch_number: '10', EquationDisplay: '[23]22=', Expression_11: '332', formula: 'AZZ' },
    { id: 3, branch_number: '100', EquationDisplay: 'r', Expression_11: '3212', formula: '' },

  ]
}
class WS0485001_CmtGroupConfirmSub extends React.Component {
  formRef = React.createRef();
  static propTypes = {
    Li_CmtGroup: PropTypes.any,
    Li_Formula: PropTypes.any,
    onFinishScreen: PropTypes.func,
  };
  constructor(props) {
    super(props);

    // document.title = 'コメント群確認SUB';

    this.state = {
      dataSource: data.dataSource,
      selectedRows: [data.dataSource[0]],
      selectedRowKeys: [data.dataSource[0].id],
      tableIndex: 0,
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
    };
  }
  componentDidMount() {
    this.setFormFieldValue('dataSource', data?.dataSource)
    this.setFormFieldValue('dataSource2', data?.dataSource2)
    this.setFormFieldValue('remarks', data?.remarks)
    this.setFormFieldValue('Lio_System', data?.Lio_System)
  }
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.setFormFieldValue('dataSource', data?.dataSource)
      this.setFormFieldValue('dataSource2', data?.dataSource2)
      this.setFormFieldValue('remarks', data?.remarks)
      this.setFormFieldValue('Lio_System', data?.Lio_System)
    }
  }
  onFinish = (values) => { }
  getRawValue = (name) => this.formRef?.current?.getFieldValue(name)
  setFormFieldValue(namePath, value) {
    this.formRef?.current?.setFields([
      {
        name: namePath,
        value,
      },
    ]);
  }
  copyEvent(record) {
   this.setFormFieldValue('formula', record.formula)
   this.setFormFieldValue('EquationDisplay', record.EquationDisplay)
  }
  pastEvent( index) {
    const datasource2 = this.getRawValue('dataSource2')
    datasource2[index].formula = this.getRawValue('formula');
    datasource2[index].EquationDisplay =  this.getRawValue('EquationDisplay');;
    this.setFormFieldValue('dataSource2', datasource2);
  }
  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }
  showWS0487001_ConditionExpressAddSub(record) {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '60%',
        component: (
          <WS0487001_ConditionExpressAddSub
            onFinishScreen={( output ) => {
              // truyen Lo setting tu Output vao day
              if( output) {
                const datasource2 = this.getRawValue('dataSource2')
                const index = datasource2.findIndex(data => data.id === record.id)
                datasource2[index].formula = output && output.Lo_Setting;
                this.closeModal()
              }
            }}
          />
        ),
      },
    })
  }
  showWS0486001_ConditionCorrectSub(record) {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '80%',
        component: (
          <WS0486001_ConditionCorrectSub
            Lio_ConditionalExpression={record && record.formula}
            onFinishScreen={( output ) => {
              if(output) {
                const datasource2 = this.getRawValue('dataSource2')
                const index = datasource2.findIndex(data => data.id === record.id)
                datasource2[index].formula = output && output.Lio_ConditionalExpression;
                this.closeModal()
              }
            }}
          />
        ),
      },
    })
  }
  checkShowScreenCondition(record) {
    if(record && record?.formula == '') {
       this.showWS0487001_ConditionExpressAddSub(record)
    } else {
       this.showWS0486001_ConditionCorrectSub(record)
    }
  }
  render() {

    return (
      <div className="cmt-group-confirm-sub">
        <Form ref={this.formRef} onFinish={this.onFinish}>
          <Card title="コメント群確認SUB">
            <Row gutter={24}>
              <Col span={24}>{data.Expression_9}</Col>
            </Row>
            <Row gutter={24}>
              <Col span={24}>
                <Table
                  dataSource={this.getRawValue('dataSource')}
                  loading={false}
                  bordered={true}
                  size='small'
                  pagination={false}
                  rowKey={(record) => record.id}
                  scroll={{ y: 600 }}
                >
                  <Table.Column width={60} title="" dataIndex="endable"
                    render={(item, record, index) => {
                      return <Form.Item style={{ textAlign: 'center' }} name={['dataSource', index, 'enabled']} valuePropName='checked'>
                        <Checkbox onChange={(e) => { }}></Checkbox></Form.Item>
                    }}
                  />

                  <Table.Column width={60} title="連番" dataIndex="serial_number"
                    render={(item, record, index) => {
                      return <Form.Item style={{ textAlign: 'center' }}
                        name={['dataSource', index, 'serial_number']} >
                        <Input style={{ textAlign: 'right' }} readOnly={data.Expression_3} />
                      </Form.Item>
                    }}
                  />
                  <Table.Column width={210} title="名称" dataIndex="name" />
                  <Table.Column width={80} title="優先" dataIndex="priority"
                    render={(item, record, index) => {
                      return <Form.Item style={{ textAlign: 'center' }}
                        name={['dataSource', index, 'priority']} >
                        <div style={{ textAlign: 'right' }}><span>{item}</span></div>
                      </Form.Item>
                    }} />
                  <Table.Column width={80} title="ｺｰﾄﾞ" dataIndex="guidance_comment_code"
                    render={(item, record, index) => {
                      return <Form.Item style={{ textAlign: 'center' }}
                        name={['dataSource', index, 'guidance_comment_code']} >
                        <div style={{ textAlign: 'right' }}><span>{item}</span></div>
                      </Form.Item>
                    }}
                  />
                  <Table.Column width={220} title="ｺﾒﾝﾄ内容" dataIndex="comment_content" />
                  <Table.Column width={190} title="適用日" dataIndex="start_date_on" />
                </Table>
              </Col>
            </Row>
            <div style={{ marginBottom: '10px' }}></div>
            <Row gutter={24}>
              <Col span={8}>
                <Form.Item name="remarks">
                  <Input.TextArea rows={8} />
                </Form.Item>
              </Col>
              <Col span={16}>
                <div style={{ width: '10%' }}>
                  <Form.Item name="Lio_System">
                    <Select>
                      <Select.Option value="0">OR</Select.Option>
                      <Select.Option value="1">AND</Select.Option>
                    </Select>
                  </Form.Item>
                </div>
                <Table
                  dataSource={this.getRawValue('dataSource2')}
                  rowClassName={(record, index) => record.id === this.state.selectedRows[0]?.id ? 'table-row-light' : ''}
                  loading={false}
                  bordered={true}
                  size='small'
                  pagination={false}
                  rowKey={(record) => record.id}
                  scroll={{ y: 600 }}
                  onRow={(record, index) => {
                    return {
                      onClick: () => {
                        const selected = record;
                        this.setState({
                          selectedRowKeys: [selected.id],
                          selectedRows: [selected],
                          tableIndex: index,
                        })
                      },
                    };
                  }}
                >
                  <Table.Column title="SEQ" dataIndex="branch_number" width={100}
                    render={(item, record, index) => {
                      return <Form.Item style={{ textAlign: 'center' }}
                        name={['dataSource', index, 'branch_number']} >
                        <div style={{ textAlign: 'right' }}><div  onDoubleClick={() => this.checkShowScreenCondition(record)}>{item}</div></div>
                      </Form.Item>
                    }}
                  ></Table.Column>
                  <Table.Column title="条件式" dataIndex="EquationDisplay"
                    render={(item, record, index) => {
                      return <Form.Item
                        name={['dataSource', index, 'branch_number']} >
                        <Tooltip title={record.Expression_11} style={{ textAlign: 'right' }}><div onDoubleClick={() => this.checkShowScreenCondition(record)}>{item}</div></Tooltip>
                      </Form.Item>
                    }}
                  ></Table.Column>
                  <Table.Column width={60} render={(text, record, index) => (
                    <Dropdown.Button style={{ textAlign: 'center' }} trigger='click' size='small' overlay={() => (
                      <Menu>
                        <Menu.Item onClick={() => { this.copyEvent(record) }}>コピー</Menu.Item>
                        <Menu.Item onClick={() => { this.pastEvent(index) }}>ペースト</Menu.Item>
                      </Menu>
                    )}>

                    </Dropdown.Button>
                  )}>
                  </Table.Column>
                </Table>
              </Col>
            </Row>

          </Card>
        </Form>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0485001_CmtGroupConfirmSub);
