import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import WS0431001_CsvPreviewConfirm from 'pages/TO_StatisticalServices/V4TO0014000_OfficeVisitsAchievementSituation/WS0431001_CsvPreviewConfirm.jsx';
import  ModalDraggable  from "components/Commons/ModalDraggable";

import { Card, Table, Form, Checkbox, Select, Button, Modal } from "antd";
const statusArr = [
  {DisplayField: '未受診', LinkedField: 0},
  {DisplayField: '予約', LinkedField: 1},
  {DisplayField: '受付', LinkedField: 2},
  {DisplayField: '予約受付', LinkedField: 3},
  {DisplayField: '新規', LinkedField: 4},
]
const dataSource = [{id: 1,
   W3_object_sect: 1,
   W3_status_sect: 1, OfficeCode: '14',
   W3_office_name_kana: 'John', office_kanji_name: 'small',
   Expression_4: '40', Expression_5: '40', Expression_6: 0, Expression_7: 1
  },
  {id: 2,
    W3_object_sect: 0,
    W3_status_sect: 3, OfficeCode: '14',
    W3_office_name_kana: 'XXXX', office_kanji_name: '12',
    Expression_4: '40', Expression_5: '45', Expression_6: 1, Expression_7: 1
   }
]
class WS1015015_BusinessEstablishmentsSubjectToSelect extends React.Component {
  formRef = React.createRef();
  static propTypes = {
    onFinishScreen: PropTypes.func
  }
  constructor(props) {
    super(props);

    // document.title = '対象事業所選択';

    this.state = {
      selectedRows: [],
      selectedRowKeys: [],
      indexTable: 0, 
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
    };
  }
  componentDidMount() {
    this.setFormFieldValue('dataSource', dataSource);
  }
  componentDidUpdate(prevProps) {
    if(this.props !== prevProps) {
      this.setFormFieldValue('dataSource', dataSource);
    }
  }
  setFormFieldValue(namePath, value) {
    this.formRef?.current?.setFields([
      {
        name: namePath,
        value,
      }
    ])
  }
  getRawValue(name) {
    return this.formRef?.current?.getFieldValue(name)
  }
  onFinish = (values) => { }
  outputSelect() {
    // call print screen
    this.CallScreen431()
  }
  CallScreen431() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: 1400,
        component:
          <WS0431001_CsvPreviewConfirm
            Lio_OutputMethod
            Lio_Output
            Lio_Preview
            onFinishScreen={(output) => {
               this.closeModal()
            }}
          />
        ,
      },
    });
  }
  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }

  render() {
    return (
      <div className="business-establishments-subject-to-select">
        <Form ref={this.formRef} onFinish={this.onFinish}>
          <Card title="対象事業所選択">
            <Table
              dataSource={this.getRawValue('dataSource')}
              pagination={false}
              size='small'
              scroll={{y: 600}}
              bordered
              loading={false}
              rowKey={(record) => record.id}
              rowClassName={(record, index) => record.id === this.state.selectedRows[0]?.id ? 'table-row-light' : ''}
              onRow={(record, rowIndex) => {
                return {
                  onClick: () => {
                    this.setState({
                      selectedRows: [record],
                      selectedRowKeys: [record.id],
                      indexTable: rowIndex,
                    })
                  }
                };
              }}
            >
              <Table.Column width={50} title="" dataIndex="W3_object_sect" 
                render={(value, record, index) => {
                  return <Form.Item style={{textAlign: 'center'}} name={['dataSource', index, 'W3_object_sect']} valuePropName="checked">
                      <Checkbox  ></Checkbox>
                  </Form.Item>
                }}/>
              <Table.Column title="状況" width={120} dataIndex="W3_status_sect"  
                render={(value, record, index) => {
                  return <Form.Item name={['dataSource', index, 'W3_status_sect']} >
                    <Select>
                      {statusArr.map((status, i) => (
                        <Select.Option value={status.LinkedField}>{status.DisplayField}</Select.Option>
                      ))}
                      </Select>
                  </Form.Item>
                }}
              />
              <Table.Column title="事業所ｺｰﾄﾞ"  width={150} dataIndex="OfficeCode" />
              <Table.Column title="事業所名(カナ)" width={170} dataIndex="W3_office_name_kana"  />
              <Table.Column title="事業所名(漢字)" dataIndex="office_kanji_name"  />
              <Table.Column title="前年度情報" dataIndex="Expression_4" render={(value, record, index) => {
                return <div hidden={record.Expression_7 === 0}>{value}</div>
              }} />
              <Table.Column title="今年度情報" dataIndex="Expression_5"  
              render={(value, record, index) => {
                return <div hidden={record.Expression_6 === 0}>{value}</div>
              }} 
              />

            </Table>
            <div style={{marginTop: '10px', float: 'right'}} ><Button type="primary" onClick={() => this.outputSelect()}>出力</Button></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1015015_BusinessEstablishmentsSubjectToSelect);
