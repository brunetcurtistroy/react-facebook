import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import  ModalDraggable  from "components/Commons/ModalDraggable";

import { Card, Form, Input,  Checkbox, Button, Table, Row, Col, Space, Modal } from "antd";
import WS1316001_ContractMasterMaintain from 'pages/TM_SpecificInsureMaintenance/V4TK0080000_ContractMasterMaintain/WS1316001_ContractMasterMaintain.jsx';
import InsurerNumberInquiryAction from 'redux/SpecificMedicalExamination/ConsultTicketInputProcessList/InsurerNumberInquiry.actions'
class WS1290001_InsurerNumberInquiry extends React.Component {
  formRef = React.createRef();

  static propTypes = {
    Lo_InsurerNum: PropTypes.any,
    onFinishScreen:  PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = "V4-TSUB0030:保険者番号照会";

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      dataSource: [],
      selectedRow: {},
      isLoadingTable: false,  
    };
  }
componentDidMount(){
 this.getTableData()
}
getTableData(){
  this.setState({isLoadingTable: true})
  let name = this.formRef.current?.getFieldValue("Name")? this.formRef.current.getFieldValue("Name") : ""
  let consignmentSource = this.formRef.current?.getFieldValue("ConsignmentSource")? this.formRef.current.getFieldValue("ConsignmentSource") : false
  InsurerNumberInquiryAction.getTableData({ Name: name, ConsignmentSource: consignmentSource}).then(res=>{
    this.setState({...this.state.dataSource, dataSource: res? res : [] })
  }).finally(()=> this.setState({isLoadingTable: false}))
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
      <div className="insurer-number-inquiry">
        <Card title="V4-TSUB0030:保険者番号照会">
          <Form ref={this.formRef} autoComplete="off" >
            <Row style={{ marginBottom: "10px" }}>
              <Col span={12}>
                <Form.Item name="Name" label="保険者名" >
                  <Input  onBlur={()=>this.getTableData()} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item style={{ float: "right" }} name="ConsignmentSource" label="委託元" valuePropName="checked" >
                  <Checkbox onChange={()=>this.getTableData()}  ></Checkbox>
                </Form.Item>
              </Col>
            </Row>
            <Table
              dataSource={this.state.dataSource}
              loading={this.state.isLoadingTable}
              pagination={false}
              rowSelection={{
                type: 'radio',
                onChange: (selectedRowKeys, selectedRows) => {
                  this.setState({
                    selectedRow: selectedRows
                  })
                }
              }}
              rowKey={(record)=> record.insurer_number}
              scroll={{y: 500}}
            >
              <Table.Column title="保険者番号" dataIndex="insurer_number"  width={120}/>
              <Table.Column title=" ｶﾅ名称" dataIndex="insurer_kana_name" />
              <Table.Column title="保険者名称" dataIndex="insurer_kanji_name" />
              <Table.Column title="保険者ｺｰﾄﾞ" dataIndex="insurer_code"  width={120}/>
              <Table.Column title="委託元" dataIndex="Expression_5" width={100}/>
            </Table>
            <Space style={{ margin: "10px 0", float: 'right' }}>
              <Form.Item>
                <Button type="primary"
                 onClick={() => {
                  this.setState({
                    ...this.state,
                    childModal: {
                      width: "90%",
                      visible: true,
                      component:  (
                        <WS1316001_ContractMasterMaintain                        
                          onFinishScreen={(output) => { 
                            this.closeModal();
                          }}
                        />
                      ),
                    },
                  });
                }}
                >契約</Button>
              </Form.Item>
              <Form.Item>
                <Button type="primary"
                onClick={() => {
                  if (this.props.onFinishScreen) {
                    this.props.onFinishScreen({
                      recordData: this.state.selectedRow,
                      Lo_InsurerNum: this.state.selectedRow?.[0]?.insurer_number
                    })
                  }
                }}
                >選択</Button>
              </Form.Item>
            </Space>
          </Form>
        </Card>
        <ModalDraggable
          width={this.state.childModal.width}
          visible={this.state.childModal.visible}
          component={this.state.childModal.component}
          bodyStyle={{ margin: 0, padding: 0 }}
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

const mapStateToProps = ({ userReducer, alertReducer }) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WS1290001_InsurerNumberInquiry);
