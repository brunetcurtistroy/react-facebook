import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Card, Table, Checkbox, Button, Form, Row, Col, Space, Modal, message } from "antd";
import { getConfirmsubRecordChangingAction } from "redux/ReservationBusiness/GroupBookings/GroupBookings.action";
import WS2583001_ConsultInquirySub from "pages/IN_InputBusiness/V4DS0212000_ProgressSetting/WS2583001_ConsultInquirySub";
import  ModalDraggable  from "components/Commons/ModalDraggable";

class WS2533001_ConfirmSub extends React.Component {
  static propTypes = {
    Lo_ReturnBookReview: PropTypes.any,
    Li_Title: PropTypes.any
  }
  constructor(props) {
    super(props);

    // document.title = '内容確認SUB';

    this.state = {
      pagination: {
        defaultPageSize: 10,
        size: 'small',
        showQuickJumper: true
      },
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      dataSource: [],
      isLoading: false,
      StsConfirm: false
    };
    this.onFinish = this.onFinish.bind(this);
  }

  componentDidMount = () => {
    this.callAPILoadData({ list_id: this.props.list_id, StsChangeFromFalseToTrue: this.props.StsChangeFromFalseToTrue });
  }

  componentDidUpdate = (prevProps) => {
    if (this.props !== prevProps) 
      this.callAPILoadData({ list_id: this.props.list_id, StsChangeFromFalseToTrue: this.props.StsChangeFromFalseToTrue })
  }

  callAPILoadData = (params) => {
    this.setState({ isLoading: true });
    getConfirmsubRecordChangingAction(params)
      .then((res) => {
        if (res) {
          this.setState({
            dataSource: res.data,
            isLoading: false
          })
        }
      })
      .catch(err => message.error(err.response.data.message || "エラーが発生しました"))
  }

  onFinish = () => {
    if (this.props.onFinishScreen) this.props.onFinishScreen({ Lo_ReturnBookReview: 6 })
  }

  render() {
    return (
      <div className="confirm-sub">
        <Card title={this.props.Li_Title + this.state.dataSource.length + '件' || '内容確認SUB'}>
          <Form onFinish={this.onFinish} initialValues={{ StsConfirm: false, }} >
            <Table
              size='small'
              dataSource={this.state.dataSource}
              loading={this.state.isLoading}
              rowKey={(record) => record.id}
              bordered
              pagination={{
                ...this.state.pagination,
                hideOnSinglePage: this.state.dataSource.length > 10 ? false : true
              }}
            >
              <Table.Column title="受診日" dataIndex="W1_consult_date"
                render={(text) => text ? text.replaceAll('-', '/') : null}
              />
              <Table.Column title="カナ氏名" dataIndex="Expression_13" />
              <Table.Column title="漢字氏名" dataIndex="Expression_14" />
              <Table.Column title="性別" dataIndex="Expression_15" align='center'
                render={(text) => (<span style={{ color: text === '男性' ? '#0F3278' : '#B41432' }}>{text}</span>)}
              />
              <Table.Column title="年齢" dataIndex="Expression_17"
                render={(text) => text ? text + '歳' : null}
              />
              <Table.Column title="契約情報" render={(text, record, index) => (
                <Space>
                  {record.W1_visits_courses} {record.contract_short_name}
                </Space>
              )} />
              <Table.Column title="状態" dataIndex="State" align='center'
                render={(text, record) => (<span onDoubleClick={() => {
                  if (record.W1_reserve_num > 0)
                    this.setState({
                      childModal: {
                        ...this.state.childModal,
                        visible: true,
                        width: '60%',
                        component: (
                          <WS2583001_ConsultInquirySub
                            Li_ReserveNum={record.W1_reserve_num}
                            onFinishScreen={(output) => {
                              this.closeModal()
                            }}
                          />
                        ),
                      },
                    });
                }}>{record.W1_reserve_num !== 0 ? text : null}</span>)}
              />
            </Table>
            <Row>
              <Col span={24} style={{ marginTop: '1em', textAlign: 'right' }}>
                <Space>
                  <Form.Item name='StsConfirm' >
                    <Checkbox onChange={(e) => this.setState({ StsConfirm: e.target.checked, })}>上記の内容を確認しました</Checkbox>
                  </Form.Item>
                  <Form.Item >
                    <Button type="primary" disabled={!this.state.StsConfirm} htmlType='submit' >確認</Button>
                  </Form.Item>
                </Space>
              </Col>
            </Row>

          </Form>
        </Card>
        <ModalDraggable
          width={this.state.childModal.width}
          visible={this.state.childModal.visible}
          component={this.state.childModal.component}
          bodyStyle={{ margin: 0, padding: 0}}
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2533001_ConfirmSub);
