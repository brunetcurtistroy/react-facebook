import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Button, Card, Table, Row, Col, Form, message, Dropdown, Menu } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import WS2585001_OfficeInfoInquirySub from 'pages/YK_ReservationBusiness/V5YK0002000_GroupBookings/WS2585001_OfficeInfoInquirySub.jsx';
import PersonalOfficeSearchQueryAction from 'redux/ReservationBusiness/PersonalReserveProcess/PersonalOfficeSearchQuery.actions'
import WS0343001_PersonalInfoMaintain from 'pages/BS_BasicInfo/V4MS0003000_PersonalInfoMaintainDirectly/WS0343001_PersonalInfoMaintain.jsx';
import ModalDraggable from "components/Commons/ModalDraggable";

class WS0381001_PersonalOfficeSearchQuery extends React.Component {
  static propTypes = {
    Li_PersonalNum: PropTypes.any,
    Lio_OfficeCode: PropTypes.any,
    Lio_BranchStoreCode: PropTypes.any,
    onFinishScreen: PropTypes.func,
  }
  formRef = React.createRef();
  constructor(props) {
    super(props);
    // document.title = '個人事業所検索・照会';
    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      selectedRow: {},
      isloadding: false,
      data: [],
    };
  }
  componentDidMount() {
    this.GetIndex()
  }
  GetIndex() {
    this.setState({ isloadding: true })
    PersonalOfficeSearchQueryAction.GetIndex({ PersonalNum: this.isEmpty(this.props.Li_PersonalNum) ? "" : this.props.Li_PersonalNum }).then(res => {
      this.setState({ data: res, selectedRow: res?.[0] })
    }).catch(error => {
      const res = error.response;
      console.log(error)
      if (!res || res.data || res.data.message) {
        message.error('エラーが発生しました');
        return;
      }
    }).finally(() => this.setState({ isloadding: false }))

  }
  isEmpty(val) {
    return (val === undefined || val == null || val.length <= 0) ? true : false;
  }
  closeModal = () => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  };
  ShowWS0343001_PersonalInfoMaintain() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true, width: 1500,
        component: (
          <WS0343001_PersonalInfoMaintain
            Li_PersonalNum={this.props.Li_PersonalNum}
            onFinishScreen={(output) => {
              this.closeModal()
            }}
          />
        ),
      },
    });
  }
  render() {
    return (
      <div className="personal-office-search-query">
        <Card title="個人事業所検索・照会">
          <Form ref={this.formRef} autoComplete="off" >
            <Table
              dataSource={this.state.data}
              pagination={false} size="small" bordered={true}
              loading={this.state.isloadding}
              rowKey={(record) => record.office_code}
              rowSelection={{
                type: 'radio',
                onChange: async (selectedRowKeys, selectedRows) => {
                  await this.setState({
                    selectedRow: selectedRows[0]
                  })
                }
              }}
            >
              <Table.Column title="コード" dataIndex="office_code" width={100}
                render={(value, record, index) => {
                  return (
                    <div style={{ textAlign: 'right' }}>
                      <span>{record?.office_code}</span><br />
                      <span>{record?.branch_store_code === 0 ? '' : record?.branch_store_code}</span>
                    </div>
                  )
                }} />
              <Table.Column title="ﾒﾓ" dataIndex="Expression_14" width={50} align="center"
                render={(value, record, index) => (
                  <Button
                    size='small'
                    icon={<MoreOutlined />}
                    style={{ display: "inline-block" }}
                    onClick={() => {
                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          visible: true, width: 1500,
                          component: (
                            <WS2585001_OfficeInfoInquirySub
                              Li_OfficeCode={record.office_code}
                              Li_BranchCode={record.branch_store_code}
                              onFinishScreen={(output) => {
                                this.closeModal()
                              }}
                            />
                          ),
                        },
                      });
                    }}
                  ></Button>
                )} />
              <Table.Column title="事業所名" dataIndex="office_kanji_name" render={(value, record, index) => {
                return <>
                  <span>{value}</span><br />
                  <span>{record?.Expression_11}</span>
                </>
              }} />
              <Table.Column title="保険者番号" dataIndex="insurer_number" render={(value, record, index) => {
                return <>
                  <span>{value}</span><br />
                  <span>{record?.insurer_kanji_name}</span>
                </>
              }} />
              <Table.Column title="保険証記号/番号" dataIndex="insurer_card_symbol" render={(value, record, index) => {
                return <>
                  <span>{value}</span><br />
                  <span>{record?.insurer_card_number}</span>
                </>
              }} />
              <Table.Column width={100}
                render={(value, record, index) => {
                  return (
                    <div style={{ textAlign: 'center' }}>
                      <Button type="primary" onClick={() => {
                        if (this.props.onFinishScreen) {
                          this.props.onFinishScreen({
                            Lio_OfficeCode: record?.office_code,
                            Lio_BranchStoreCode: record?.branch_store_code,
                            recordData: record
                          })
                        }
                      }} >
                        選　択
                      </Button>
                      <Dropdown
                        overlay={() => (
                          <Menu>
                            <Menu.Item
                              onClick={() => this.ShowWS0343001_PersonalInfoMaintain()}>
                              個人情報
                            </Menu.Item>
                          </Menu>
                        )}>
                        <Button style={{ verticalAlign: 'top', marginLeft: 2 }} size="small" type='primary' icon={<MoreOutlined />}></Button>
                      </Dropdown>
                    </div>
                  )
                }} />
            </Table>
            <div style={{ border: '1px solid rgba(0, 0, 0, 0.06)', padding: '1em', margin: '1em 0 1em' }}>
              <Row gutter={16}>
                <Col span={6}>
                  <Form.Item label="職　　種"><span>{this.state.selectedRow?.Expression_13} </span></Form.Item>
                </Col>
                <Col span={6} offset={1}>
                  <Form.Item label="保険者請求"><span>{this.state.selectedRow?.Expression_16}</span></Form.Item>
                </Col>
                <Col span={12}></Col>
              </Row>
              <Row gutter={16}>
                <Col span={6}>
                  <Form.Item label="雇用形態">
                    <span>{this.state.selectedRow?.Expression_12}</span>
                  </Form.Item>
                </Col>
                <Col span={6} offset={1}>
                  <Form.Item label="受給者番号">
                    <span>{this.state.selectedRow?.recipient_number}</span>
                  </Form.Item>
                </Col>
              </Row>
            </div>
            {/* <Row gutter={16}>
              <Col span={24}>
                <Button type="primary" style={{ float: "right" }} onClick={() => {
                  if (this.props.onFinishScreen) {
                    this.props.onFinishScreen({
                      Lio_OfficeCode: this.state.selectedRow?.office_code,
                      Lio_BranchStoreCode: this.state.selectedRow?.branch_store_code,
                      recordData: this.state.selectedRow
                    })
                  }
                }} >
                  選　択
                </Button>
                <Button type="primary" style={{ float: "right", marginRight: "10px" }}
                  onClick={() => this.ShowWS0343001_PersonalInfoMaintain()} >
                  個人情報
                </Button>
              </Col>
            </Row> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0381001_PersonalOfficeSearchQuery);
