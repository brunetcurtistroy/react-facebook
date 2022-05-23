import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
import React from "react";
import { connect } from "react-redux";
import moment from 'moment';
import  ModalDraggable  from "components/Commons/ModalDraggable";

import { Card, Form, Input, Button, DatePicker, Space, Modal, Col, Row, Spin, Alert } from "antd";

import WS1290001_InsurerNumberInquiry from 'pages/TK_SpecificMedicalExamination/V4TK0200003_ConsultTicketInputProcessList/WS1290001_InsurerNumberInquiry.jsx';

import { dataEventExecAction, setDataListProcessAction } from "redux/SpecificInsureGuide/SpecificInsureGuideSettleProcessList/SpecificInsureGuideSettleProcessList/SpecificInsureGuideSettleProcessList.actions";


const dateFormat = 'YYYY/MM/DD';
class WS1464001_SpecificInsureGuideSettleProcessList extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '特定保健指導決済処理[一覧]';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      insurer_kanji_name: '',
      dataListProcess: {},
      redirect: false,
      isLoadPage: false,
    };
    this.onFinish = this.onFinish.bind(this);
  }

  redirectPage = () => {
    if (this.state.redirect) {
      window.location.replace("/specific-insure-guide-settle-process-list/list-process");
    }
  }

  onFinish(values) {
    const params = {
      DateFScreen: moment(this.formRef.current.getFieldValue('DateFScreen')).format('YYYY/MM/DD'),
      DateTScreen: moment(this.formRef.current.getFieldValue('DateTScreen')).format('YYYY/MM/DD'),
      InsuranceNum: this.formRef.current.getFieldValue('InsuranceNum') ?? ''
    }
    Modal.confirm({
      content: '契約を削除しますか!',
      onOk: () => {
        this.setState({ isLoadPage: true });
        dataEventExecAction(params)
          .then(res =>
            res
              ? this.setState({ dataListProcess: res.data, redirect: true})
              : this.setState({ dataListProcess: {} })
          )
          .catch()
          .finally(() => {
            this.setState({isLoadPage: false});
            this.props.setDataListProcessAction(this.state.dataListProcess);
            Modal.confirm({
              content: 'ページリダイレクト?',
              onOk: () => {
                this.redirectPage();
              },
              okText: 'は　い',
              cancelText: 'いいえ',
            })
          })
      },
      cancelText: 'いいえ',
      okText: 'は　い',
    })
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
      <div className="specific-insure-guide-settle-process-list" style={{ width: '40%' }}>
        <Card title="特定保健指導決済処理[一覧]">
          <Spin tip="処理中です。しばらくお待ちください。" spinning={this.state.isLoadPage}>
            <Form
              ref={this.formRef}
              onFinish={this.onFinish}
              initialValues={{ DateFScreen: moment(), DateTScreen: moment() }}
            >
              <div style={{ display: 'none' }}>
                <Form.Item name="TempFile"><Input /></Form.Item>
                <Form.Item name="DateF"><Input /></Form.Item>
                <Form.Item name="DateT"><Input /></Form.Item>
                <Form.Item name="InsuranceNum"><Input /></Form.Item>
                <Form.Item name="StsDate"><Input /></Form.Item>
                <Form.Item name="StsInsurerInfo"><Input /></Form.Item>
              </div>
              <div style={{ border: '1px solid rgba(0, 0, 0, 0.06)', padding: '1em' }}>
                <Space>
                  <Form.Item name="DateFScreen" label="初回予定日">
                    <VenusDatePickerCustom formRefDatePicker={this.formRef} format={dateFormat} />
                  </Form.Item>
                  <Form.Item>~</Form.Item>
                  <Form.Item name="DateTScreen" >
                    <VenusDatePickerCustom formRefDatePicker={this.formRef} format={dateFormat} />
                  </Form.Item>
                </Space>
                <Row gutter={24}>
                  <Col span={10}>
                    <Form.Item name="InsuranceNum" label="保険者番号">
                      <Input.Search onSearch={() => {
                        this.setState({
                          childModal: {
                            ...this.state.childModal,
                            visible: true,
                            width: '80%',
                            component: (
                              <WS1290001_InsurerNumberInquiry
                                onFinishScreen={({ recordData, Lo_InsurerNum }) => {
                                  this.formRef.current?.setFieldsValue({
                                    InsuranceNum: Lo_InsurerNum
                                  })
                                  this.closeModal()
                                  this.setState({ insurer_kanji_name: recordData.insurer_kanji_name })
                                }}
                              />),
                          },
                        })
                      }} />
                    </Form.Item>
                  </Col>
                  <Col span={14}>
                    <Form.Item>
                      <span>{this.state.insurer_kanji_name}</span>
                    </Form.Item>
                  </Col>
                </Row>
              </div>
              <Button style={{ marginTop: '1em', float: 'right' }} type="primary" htmlType='submit'>実  行</Button>
            </Form>
          </Spin>

        </Card>
        <ModalDraggable
          width={this.state.childModal.width}
          visible={this.state.childModal.visible}
          component={this.state.childModal.component}
          bodyStyle={{ margin: 0, padding: 0 }}
          destroyOnClose={true}
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
  setDataListProcessAction: (data) => dispatch(setDataListProcessAction(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(WS1464001_SpecificInsureGuideSettleProcessList);
