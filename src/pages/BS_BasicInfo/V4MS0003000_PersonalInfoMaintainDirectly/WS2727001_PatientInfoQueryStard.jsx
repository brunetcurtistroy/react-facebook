import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
import React, { Component } from 'react';
import { connect } from 'react-redux';
import  ModalDraggable  from "components/Commons/ModalDraggable";
import { Card, Form, Input, Button, Table, Row, Col, Space, message, DatePicker, Modal } from 'antd';
import moment from 'moment-timezone';
import { debounce } from 'lodash';

import { getListDataPatientInfoQueryStardAction, deleteDataPatientInfoQueryStardAction } from 'redux/basicInfo/PersonalInfoMaintain/PatientInfoQueryStard.actions';
import WS0061009_CheckYesNoYes from 'pages/IN_InputBusiness/V4DS0212000_ProgressSetting/WS0061009_CheckYesNoYes';

export class WS2727001_PatientInfoQueryStard extends Component {

  constructor(props) {
    super(props);
    // document.title = "患者情報照会[標準]";
    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      pagination: {
        defaultPageSize: 10,
        size: 'small',
        showQuickJumper: true
      },
      dataSource: [],
      isLoading: false,
      rowSelect: {},
      initParams: {
        KanaSearch: '',
        DateOfBirthSearch: ''
      }
    }
    this.handleSearch = debounce(this.handleSearch, 700)
  }

  componentDidMount = () => {
    this.loadData(this.state.initParams);
  }

  loadData = (params) => {
    this.setState({ isLoading: true });
    getListDataPatientInfoQueryStardAction(params)
      .then(res => {
        if (res) {
          this.setState({
            dataSource: res.data,
            isLoading: false
          });
        }
      })
      .catch()
  }

  deleteData = (params) => {
    deleteDataPatientInfoQueryStardAction(params)
      .then(res => {
        this.loadData(this.state.initParams);
      })
      .catch(err => message.error(err.response.data.message || "エラーが発生しました"))
  }

  handleSearch = (value, name) => {
    this.setState({
      initParams: {
        ...this.state.initParams,
        [name]: value
      }
    }, () => this.loadData(this.state.initParams))
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
      <div className="patient-info-query-stard">
        <Card title={this.props.hideTitle ? null : "患者情報照会"}>
          <Form >
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item label="カナ氏名" name='KanaSearch'>
                  <Input onChange={e => this.handleSearch(e.target.value, 'KanaSearch')} />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="生年月日" name='DateOfBirthSearch'>
                  <VenusDatePickerCustom formRefDatePicker={this.formRef} format={'NNy/MM/DD'} onChange={date => this.handleSearch(moment(date).format('YYYY/MM/DD'), 'DateOfBirthSearch')} />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <Table
                size='small'
                dataSource={this.state.dataSource}
                loading={this.state.isLoading}
                pagination={{
                  ...this.state.pagination,
                  hideOnSinglePage: this.state.dataSource.length > 10 ? false : true
                }}
                bordered={true}
                rowKey={(record) => record.id}
                onRow={(record, index) => ({ onClick: event => this.setState({ rowSelect: record }) })}
              >
                <Table.Column align='right' title='個人番号' dataIndex='patient_no' />
                <Table.Column title='カナ氏名' dataIndex='kana_name' />
                <Table.Column title='漢字氏名' dataIndex='kanji_name' />
                <Table.Column title='性' dataIndex='GenderChars'
                  render={(text) => (<span style={{ color: text === '男性' ? '#0F3278' : '#B41432' }}>{text}</span>)}
                />
                <Table.Column title='生年月日' dataIndex='birthday_on'
                  render={(text) => moment(text).isValid() ? moment(text).format('NNy/MM/DD') : ''}
                />
                <Table.Column width={115}
                render={(text, record) => (
                  <Space>
                    <Button type="" size='small' onClick={() => {
                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          visible: true,
                          width: 350,
                          component: (
                            <WS0061009_CheckYesNoYes
                              Li_DisplayContent={"この患者情報を削除しますか？"}
                              onFinishScreen={(output) => {
                                if (output.Lio_StsReturn) {
                                  let params = {
                                    patient_no: record.patient_no,
                                    StsConfirm: 1 // user confirm
                                  };
                                  this.deleteData(params);
                                }
                                this.closeModal()
                              }}
                            />),
                        },
                      })
                    }}>削除</Button>
                    <Button type="primary" size='small' onClick={() => {
                      if (this.props.onFinishScreen)
                        this.props.onFinishScreen({ Lo_PersonalNumId: record.Lo_PersonalNumId, recordData: record })
                    }}>選択</Button>
                  </Space>

                )} />
              </Table>
            </Form.Item>
            <Form.Item style={{ float: "right" }} hidden={true}>
              <Button type="primary" htmlType="submit">選択</Button>
            </Form.Item>
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
    )
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(WS2727001_PatientInfoQueryStard);
