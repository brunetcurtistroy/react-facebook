import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";

import React from "react";
import { connect } from "react-redux";
import  ModalDraggable  from "components/Commons/ModalDraggable";
import { Card, Form, Input, Select, Button, Table, Row, Col, Space, Spin, List, Tag, DatePicker, Modal, message } from "antd";
import { SaveOutlined, MoreOutlined, InfoCircleOutlined, WarningOutlined, CloseCircleOutlined, DoubleRightOutlined, DoubleLeftOutlined, PlusOutlined, CloseOutlined, SearchOutlined } from '@ant-design/icons';


import WS0343001_PersonalInfoMaintain from "pages/BS_BasicInfo/V4MS0003000_PersonalInfoMaintainDirectly/WS0343001_PersonalInfoMaintain";
import WS0247001_OfficeInfoRetrievalQuery from "pages/BS_BasicInfo/V4MS0002000_OfficeInfoMaintainDirectly/WS0247001_OfficeInfoRetrievalQuery";
import WS0248001_PersonalInfoSearchQuery from "pages/BS_BasicInfo/V4MS0003000_PersonalInfoMaintainDirectly/WS0248001_PersonalInfoSearchQuery";
import WS2537001_PersonalReserveProcess from "pages/YK_ReservationBusiness/V5YK0004000_PersonalReserveProcess/WS2537001_PersonalReserveProcess";

import moment from "moment";
import { eventSelectListButtonAssociationAcceptanceInfoCorrectAction, saveAssociationAcceptanceInfoCorrectAction } from "redux/AssociationHealthInsuranceReport/AssociationAcceptanceInfoCorrect/AssociationAcceptanceInfoCorrect.actions";

const styleFormItem = {
  margin: 0
}
const styleInput = {
  border: 'none'
}


class WS1229001_AssociationAcceptanceInfoCorrect extends React.Component {
  formRef = React.createRef();
 
  constructor(props) {
    super(props);

    var today = new Date(),
    date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    // document.title = '協会受付情報訂正';
    this.state = {
      selectedRowKeys: [], // Check here to configure the default column
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      pagination: {
        defaultPageSize: 13,
        size: 'small',
        showQuickJumper: true
      },
      dataSource: [],
      rowSelect: {},
      isLoading: true,
      KyokaiInvoiceDateScreen: '',      

      initParams: {
        ReceiptDateFChar: moment('2019/01/01', 'YYYY/MM/DD'),
        ReceiptDateTChar: moment(date, 'YYYY/MM/DD'),
        Office: '',
        BranchShf: '',
        BranchStoreT: '',
        State: 4,
        PersonalNum: '',
        KanaName: '',
        InsuranceCardSymbol: '',
        InsuranceCardNum: ''
      },

      office_kanji_name: '',
      PersonalNum:'',
      reservation_number:'',
      isOffice: true,
      isPersonalNum: true
    };
  }

  openModalOfficeInfoRetrievalQuery = () => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '80%',
        component: (
          <WS0247001_OfficeInfoRetrievalQuery
            onFinishScreen={({ Lio_OfficeCode, Lio_BranchStoreCode, Lo_Kanji_Name, recordData, }) => {
              console.log(Lio_OfficeCode, Lio_BranchStoreCode, Lo_Kanji_Name, recordData)
              this.formRef.current.setFieldsValue({ 
                Office: Lio_OfficeCode,
                PersonalNum: '',
                KanaName: '',
                InsuranceCardSymbol:'',
                InsuranceCardNum:   '' 
              })
              this.setState({
                childModal: {
                  ...this.state.childModal,
                  visible: false,
                },
                initParams: {
                  ...this.state.initParams,
                  Office: Lio_OfficeCode
                },
                office_kanji_name: Lo_Kanji_Name,
                isOffice: false
              });
            }}
          />
        ),
      }
    })
  }

  openModalPersonalInfoSearchQuery = () => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '80%',
        component: (
          <WS0248001_PersonalInfoSearchQuery
            onFinishScreen={({ Lo_PersonalNumId, recordData }) => {

              this.formRef.current.setFieldsValue({
                PersonalNum: Lo_PersonalNumId,
                KanaName: recordData.kanji_name,
                InsuranceCardSymbol:'',
                InsuranceCardNum:   '',
                Office:             '',
                office_kanji_name:  ''          
              })
              this.setState({
                childModal: {
                  ...this.state.childModal,
                  visible: false,
                },
                initParams: {
                  ...this.state.initParams,
                  PersonalNum: Lo_PersonalNumId,
                  KanaName: recordData.kanji_name
                },
                isPersonalNum: false
              });
            }}
          />
        ),
      }
    })
  }

  eventSelectListButtonAssociationAcceptanceInfoCorrect = (params) => {
    this.setState({ isLoading: true });
    eventSelectListButtonAssociationAcceptanceInfoCorrectAction(params)
      .then(res => {
        if (res) {
          let data = res.data.map(item => ({...item, KyokaiInvoiceDateScreen: moment(item.KyokaiInvoiceDateScreen)}))
          this.formRef.current.setFieldsValue({'dataSource': data})
          this.setState({ dataSource: data });
        
        }
      })
      .catch()
      .finally(() => this.setState({ isLoading: false }))
  }

  onRowClick = (event, record) => {    
    this.setState({ rowSelect: record })
  }

  onChangeInput = (event, record) => {
    console.log(event)
    let { value, name } = event.target;
    let arrTemp = [...this.state.dataSource];
    let index = arrTemp.indexOf(record);
    if (name === 'KyokaiInvoiceDateScreen'){
      value = moment(value).format('YYYY/MM/DD');
    }
    if (index !== -1) {
      let objTemp = {
        ...record,
        [name]: value
      }
      arrTemp[index] = objTemp
      this.setState({ dataSource: arrTemp })
    }
  }


  onFinish = (values) => {
    const params = {
      ...values,
      ReceiptDateFChar: moment(values.ReceiptDateFChar).format('YYYY/MM/DD'),
      ReceiptDateTChar: moment(values.ReceiptDateTChar).format('YYYY/MM/DD'),
    }
    this.eventSelectListButtonAssociationAcceptanceInfoCorrect(params);
  }

  closeModal = () => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
        className: "",
      },
    });
  };  

  onChangeInputPnum = event => {
    if (event.target.value === '') {
      this.formRef.current.setFieldsValue({
        PersonalNum:        '',
        KanaName:           '',
        InsuranceCardSymbol:'',
        InsuranceCardNum:   '',
        Office:             ''                      
  })
    }
  };

  render() {
    return (
      <div className="association-acceptance-info-correct">
        <Card title="協会受付情報訂正">
              <Space style={{ marginBottom: '10px' }}>              
              <Button
                type="primary"
                htmlType="submit"
                onClick={() => {

                      if (this.state.rowSelect.personal_number_id && this.state.rowSelect.personal_number_id !=='') 
                          {
                              this.setState({
                                childModal: {
                                  ...this.state.childModal,
                                  visible: true,
                                  width: "90%",
                                  component: (
                                    <WS2537001_PersonalReserveProcess
                                    
                                            Li_ReserveNum={this.state.rowSelect.W1_reserve_num}
                                            // Li_ReserveNum={12}
                                            Li_Child={true}
                                            onFinishScreen={() => {
                                              this.closeModal();
                                            }}
                                          />
                                  ),
                                },
                              });
                        } else{ 
                          Modal.warning({
                          width: '280px',
                          title: "テブルのユーザを選択後に使用可能です",
                          okText: "Ok",
                          icon: <WarningOutlined />,
                        });
                    }
                    }}              
                >検査変動</Button>
                 <Button
                      type="primary"
                      // htmlType="submit"
                      onClick={() => {

                      if (this.state.rowSelect.personal_number_id && this.state.rowSelect.personal_number_id !=='') 
                      {
                        this.setState({
                          childModal: {
                            ...this.state.childModal,
                            visible: true,
                            component: (

                              <WS0343001_PersonalInfoMaintain
                                Li_PersonalNum={this.state.rowSelect.personal_number_id}

                                onFinishScreen={(output) => {
                                  if (output.flg === 1) {
                                    this.closeModal();                                 
                                  }
                                }} 
                              />
                            ),
                            width: "90vw",
                          },
                        });
                      } else{ 
                            Modal.warning({
                            width: '280px',
                            title: "テブルのユーザを選択後に使用可能です",
                            okText: "Ok",
                            icon: <WarningOutlined />,
                          });
                      }
                      }}
                    >個人情報</Button>              
            </Space>
            <hr />

          <Form ref={this.formRef} onFinish={this.onFinish} initialValues={this.state.initParams}>
            <Row gutter={20}>
              <Col span={6}>
                <Space>
                  <Form.Item name="ReceiptDateFChar" label="受診日" style={{ marginLeft: 4 }}
                    rules={[{ required: true, message: '日付を入力して下さい' }]}
                  >
                    <VenusDatePickerCustom formRefDatePicker={this.formRef} autoFocus format="YYYY/MM/DD" />
                  </Form.Item>
                  <Form.Item>~</Form.Item>
                  <Form.Item name="ReceiptDateTChar" rules={[{ required: true, message: '日付を入力して下さい' }]}>
                    <VenusDatePickerCustom formRefDatePicker={this.formRef} format="YYYY/MM/DD" />
                  </Form.Item>
                </Space>
              </Col>
              <Col span={14}>
                <Space>
                  <Form.Item name="Office" label="事業所" >
                    <Input.Search onSearch={this.openModalOfficeInfoRetrievalQuery} />
                  </Form.Item>
                  <Form.Item>-</Form.Item>
                  <Form.Item name="BranchShf">
                    <Input.Search readOnly disabled={this.state.isOffice} onSearch={this.openModalOfficeInfoRetrievalQuery} style={{ width: '80%' }}/>
                  </Form.Item>
                  <Form.Item>~</Form.Item>
                  <Form.Item name="BranchStoreT">
                    <Input.Search readOnly disabled={this.state.isOffice} onSearch={this.openModalOfficeInfoRetrievalQuery} style={{ width: '80%' }}/>
                  </Form.Item>
                  <Form.Item>{this.state.office_kanji_name}</Form.Item>
                </Space>
              </Col>
              <Col span={4}>
                <Form.Item name="State" label="状態">
                  <Select>
                    <Select.Option value={4}>全て</Select.Option>
                    <Select.Option value={0}>予約</Select.Option>
                    <Select.Option value={1}>受付</Select.Option>
                    <Select.Option value={2}>保留</Select.Option>
                    <Select.Option value={3}>待ち</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
           
            <Row gutter={20}>
              <Col span={5}>
                <Form.Item name="PersonalNum" label="個人番号" >
                  <Input.Search onSearch={this.openModalPersonalInfoSearchQuery} onChange={this.onChangeInputPnum}/>
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item style={{ display: this.state.isPersonalNum ? 'none' : '' }} name="KanaName">
                  <Input style={styleInput} />
                </Form.Item>
                <Form.Item name="KanaName" label="カナ氏名" style={{ display: !this.state.isPersonalNum ? 'none' : '' }}>
                  <Input />                  
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item name="InsuranceCardSymbol" label="保険証記号" >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item name="InsuranceCardNum" label="保険証番号" >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item style={{ float: 'right' }}>
                  <Button htmlType='submit' type='primary' icon={<SearchOutlined />}>検　　索</Button>
                </Form.Item>
              </Col>
            </Row>           

            <Table className='mt-3'
              size='small'
              dataSource={this.state.dataSource}
              pagination={this.state.pagination}
              loading={this.state.isLoading}
              rowKey={(record) => record.id}           
              onRow={(record, index) => {
                return {
                  onClick: () => {
                    this.setState({ rowSelect: record , reservation_number: record.W1_reserve_num});                    

                    this.formRef.current.setFieldsValue({
                          PersonalNum:        record.personal_number_id,
                          KanaName:           record.kanji_name,
                          InsuranceCardSymbol:record.insurer_card_symbol,
                          InsuranceCardNum:   record.insurer_card_number,
                          Office:             record.office_code                      
                    })
                  },                  
                };
              }}             
            >
              <Table.Column title="事業所" dataIndex="office_kanji_name" />
              <Table.Column title="保険証記号" dataIndex="insurer_card_symbol" />
              <Table.Column title="保険証番号" dataIndex="insurer_card_number" />
              <Table.Column title="氏名" dataIndex="kanji_name" />
              <Table.Column title="承認番号" dataIndex="association_acceptance_number"
                render={(text, record, index) => (
                  <Form.Item name={['dataSource', index, "association_acceptance_number"]} style={styleFormItem}>
                    <Input type='number' min={0} style={styleInput} 
                      onChange={(e) => this.onChangeInput(e, record)} name='association_acceptance_number'/>
                  </Form.Item>
                )}
              />
              <Table.Column title="協会請求日" dataIndex="KyokaiInvoiceDateScreen"
                render={(text, record, index) => (
                  <Form.Item name={['dataSource', index, "KyokaiInvoiceDateScreen"]} style={styleFormItem}>
                    <VenusDatePickerCustom formRefDatePicker={this.formRef} format="YYYY/MM/DD" style={styleInput} onChange={(date, dateString) => this.setState({KyokaiInvoiceDateScreen: date})}/>
                  </Form.Item>
                )} 
              />
              <Table.Column title="一般" dataIndex="General" />
              <Table.Column title="付加" dataIndex="Added" />
              <Table.Column title="子宮" dataIndex="UterineCancer" />
              <Table.Column title="乳１" dataIndex="BreastCancer1" />
              <Table.Column title="乳２" dataIndex="BreastCancer2" />
              <Table.Column title="肝炎" dataIndex="Hepatitis" />
              <Table.Column title="眼底" dataIndex="Fundus" />
              <Table.Column align='center' width={70}
                render={(text, record, index) => (
                  <Button size='small' style={{ border: 'none', }}
                    icon={<SaveOutlined style={{ color: 'green' }} />}
                    onClick={() => {
                      const params = {
                        id: record.id,
                        association_acceptance_number: this.state.rowSelect.association_acceptance_number,
                        KyokaiInvoiceDateScreen: moment(this.state.KyokaiInvoiceDateScreen).format('YYYY/MM/DD')
                      }
                      saveAssociationAcceptanceInfoCorrectAction(params)
                        .then(() => {
                          message.success('成功');
                          const params = {
                            ...this.state.initParams,
                            ReceiptDateFChar: moment(this.state.initParams.ReceiptDateFChar).format('YYYY/MM/DD'),
                            ReceiptDateTChar: moment(this.state.initParams.ReceiptDateTChar).format('YYYY/MM/DD'),
                          }
                          this.eventSelectListButtonAssociationAcceptanceInfoCorrect(params);
                        })
                        .catch(() => message.error('エラー'))
                    }}
                  ></Button>
                )}
              />
            </Table>
          </Form>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1229001_AssociationAcceptanceInfoCorrect);
