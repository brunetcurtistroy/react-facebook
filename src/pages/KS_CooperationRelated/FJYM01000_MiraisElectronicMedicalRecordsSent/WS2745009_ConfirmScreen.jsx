/* eslint-disable eqeqeq */
import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
import { Button, Card, Checkbox, Col, DatePicker, Form, Input, message, Radio, Row, Select, Space, Spin, Table } from "antd";
import moment from "moment-timezone";
import PropTypes from 'prop-types';
import React from "react";
import { connect } from "react-redux";
import ConfirmScreenAction from 'redux/CooperationRelated/MiraisElectronicMedicalRecordsSent/ConfirmScreen.actions';
const { Option } = Select
const styleButton = {
  color: '#9370DB', border: '1px solid #9370DB'
}
class WS2745009_ConfirmScreen extends React.Component {
  static propTypes = {
    Li_ExamDateF: PropTypes.any,
    Li_ExamDateT: PropTypes.any,
    Lo_StsConfirm: PropTypes.any,
    onFinishScreen: PropTypes.func,
  }
  formRef = React.createRef();
  constructor(props) {
    super(props);

    // document.title = '確認画面';

    this.state = {
      selectedRow: {},
      selectedRowKeys: [],
      indexTable: 0,

      isloaddingTable1: false,
      isloaddingTable2: false,
      loadFrm: false,
    };
  }
  componentDidMount() {
    this.GetListData();
  }

  componentDidUpdate(prv) {
    if (this.props !== prv) {
      this.GetListData();
    }
  }

  Check_F12() {
    this.setState({ loadFrm: true })
    ConfirmScreenAction.Check_F12().then(res => {
      if (res) {
        if (this.props.onFinishScreen) {
          this.props.onFinishScreen({ Lo_StsConfirm: true, res })
        }
      }
    }).catch(error => {
      const res = error.response;
      if (!res || res.data || res.data.message) {
        message.error('エラーが発生しました');
        return;
      }
    }).finally(() => this.setState({ loadFrm: false }))
  }
  GetListData() {
    this.setState({ isloaddingTable1: true })
    let data = { OrderSpecies: this.formRef.current?.getFieldValue("OrderSpecies") }
    ConfirmScreenAction.GetListData(data)
      .then(res => {
        if (res) {
          this.setState({
            isloaddingTable1: false,

            selectedRow: res?.length > 0 ? res[0] : {},
            selectedRowKeys: res?.length > 0 ? [res[0].id] : [],
            indexTable: 0,
          })

          let data = res
          data.map(x => x.order_start_date = moment(x.order_start_date))
          this.formRef.current?.setFieldsValue({ ListData: data });
          this.ListInspect(res[0]?.serial_num)
        }
      })
      .catch(error => {
        const res = error.response;
        if (!res || res.data || res.data.message) {
          message.error('エラーが発生しました');
          return;
        }
      }).finally(() => this.setState({ isloaddingTable1: false }))
  }
  ListInspect(serial_num) {
    this.setState({ isloaddingTable2: true })
    let data = {
      OrderSpecies: this.formRef.current?.getFieldValue("OrderSpecies"),
      serial_num: serial_num ? serial_num : ""
    }
    ConfirmScreenAction.ListInspect(data).then(res => {
      this.formRef.current?.setFieldsValue({
        tableData: res
      })
    }).catch(error => {
      const res = error.response;
      if (!res || res.data || res.data.message) {
        message.error('エラーが発生しました');
        return;
      }
    }).finally(() => this.setState({ isloaddingTable2: false }))
  }
  render() {
    return (
      <div className="confirm-screen">
        <Card title="確認画面">
          <Spin spinning={this.state.loadFrm} >
            <Form
              ref={this.formRef} autoComplete="off" initialValues={{ OrderSpecies: "" }}
            >
              <Row>
                <Col span={3}>
                  <Form.Item name="OrderSpecies" label="種別"   >
                    <Select onChange={() => this.GetListData()} >
                      <Option value={""}></Option>
                      <Option value={"00"}>予約</Option>
                      <Option value={"60"}>検査</Option>
                      <Option value={"70"}>画像</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={12} >
                  <Table
                    rowClassName={(record, index) => record.id === this.state.selectedRow?.id ? 'table-row-light' : ''}
                    dataSource={this.formRef.current?.getFieldValue("ListData") ? this.formRef.current?.getFieldValue("ListData") : []}
                    style={{ width: '98%', cursor: 'pointer' }}
                    loading={this.state.isloaddingTable1}
                    pagination={false} bordered={true} size="small"
                    rowKey={(record) => record.id} scroll={{ y: 700 }}
                    onRow={(record, rowIndex) => {
                      return {
                        onClick: async () => {
                          let oldRecord = this.state.selectedRow
                          let index = this.formRef.current?.getFieldValue("ListData").findIndex(x => x.id === record.id)
                          await this.setState({
                            selectedRow: record,
                            selectedRowKeys: [record.id],
                            indexTable: index
                          });
                          if (record.id !== oldRecord.id) {
                            this.ListInspect(record?.serial_num)
                          }
                        }
                      };
                    }}
                  >
                    <Table.Column width={40} align='center'
                      render={(value, record, index) => {
                        return <Form.Item name={['ListData', index, 'in_force']} style={{ marginBottom: '0px' }} valuePropName="checked" >
                          <Checkbox></Checkbox>
                        </Form.Item>
                      }} />
                    <Table.Column title="種別" dataIndex="Expression_9" />
                    <Table.Column title="処理" dataIndex="Expression_3" />
                    <Table.Column title="検査日" dataIndex="Expression_4" />
                    <Table.Column title="患者番号" dataIndex="Expression_5" 
                    render={(value, record, index) => {
                      return (
                        <div style={{textAlign: 'right'}}>{value}</div>
                      )
                    }}
                    />
                    <Table.Column title="コメント" dataIndex="Expression_6" />
                  </Table>
                </Col>
                <Col span={12} >
                  <Row>
                    <Col span={24} >
                      <Form.Item name={['ListData', this.state.indexTable, 'process_sect']}
                        label={<Button style={styleButton}>&nbsp;処理区分&nbsp;</Button>} >
                        <Radio.Group>
                          <Radio value={'1'}>INSERT</Radio>
                          <Radio value={'2'}>MODIFY</Radio>
                          <Radio value={'3'}>DELETE</Radio>
                        </Radio.Group>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24} >
                      <Form.Item name={['ListData', this.state.indexTable, 'operating_sect']}
                        label={<Button style={styleButton}>&nbsp;動作区分&nbsp;</Button>} >
                        <Radio.Group>
                          <Radio value={'1'}>監査のみ</Radio>
                          <Radio value={'2'}>正常登録</Radio>
                          <Radio value={'3'}>警告登録</Radio>
                          <Radio value={'4'}>強制登録</Radio>
                        </Radio.Group>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24} >
                      <Form.Item name={['ListData', this.state.indexTable, 'progress_change_sect']}
                        label={<Button style={styleButton}>&nbsp;進捗区分&nbsp;</Button>} >
                        <Radio.Group>
                          <Radio value={null}>指定なし&emsp;</Radio>
                          <Radio value={"IS"}>発行／受付</Radio>
                          <Radio value={"AIS"}>再発行&emsp;&emsp;</Radio>
                          <Radio value={"STP"}>中止&emsp;&emsp;&emsp;&emsp;</Radio>
                          <Radio value={"EXE"}>実施</Radio>
                        </Radio.Group>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24} >
                      <Form.Item name={['ListData', this.state.indexTable, 'document_sect']}
                        label={<Button style={styleButton}>&nbsp;帳票区分&nbsp;</Button>} >
                        <Radio.Group>
                          <Radio value={null}>指定なし</Radio>
                          <Radio value={'1'}>依頼票</Radio>
                          <Radio value={'2'}>ラベル</Radio>
                          <Radio value={'3'}>予約票</Radio>
                        </Radio.Group>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={13} >
                      <Form.Item name={['ListData', this.state.indexTable, 'progress_reference_flg']}
                        label={<Button style={styleButton}>&nbsp;進捗参照&nbsp;</Button>} >
                        <Radio.Group>
                          <Radio value={'0'}>参照しない</Radio>
                          <Radio value={'1'}>参照する</Radio>
                        </Radio.Group>
                      </Form.Item>
                    </Col>
                    <Col span={10} >
                      <Space>
                        <Form.Item name={['ListData', this.state.indexTable, 'new_order_date']}>
                          <Input />
                        </Form.Item>
                        <Form.Item name={['ListData', this.state.indexTable, 'new_order_progress']}>
                          <Input />
                        </Form.Item>
                        <Form.Item name={['ListData', this.state.indexTable, 'new_accounting_progress']}>
                          <Input />
                        </Form.Item>
                        <Form.Item name={['ListData', this.state.indexTable, 'document_issued']}>
                          <Input />
                        </Form.Item>
                        <Form.Item name={['ListData', this.state.indexTable, 'medicine_bag_if']}>
                          <Input />
                        </Form.Item>
                        <Form.Item name={['ListData', this.state.indexTable, 'inspect_if']}>
                          <Input />
                        </Form.Item>
                        <Form.Item name={['ListData', this.state.indexTable, 'medical_if']}>
                          <Input />
                        </Form.Item>
                        <Form.Item name={['ListData', this.state.indexTable, 'RISIF']}>
                          <Input />
                        </Form.Item>
                      </Space>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={22} >
                      <Space>
                        <Form.Item name={['ListData', this.state.indexTable, 'order_num']}
                          label={<Button style={styleButton}>ｵｰﾀﾞｰ番号</Button>}>
                          <Input />
                        </Form.Item>
                        <Form.Item name={['ListData', this.state.indexTable, 'order_sub_num']}>
                          <Input style={{ width: 30 }} />
                        </Form.Item>
                        <Form.Item name={['ListData', this.state.indexTable, 'reserve_num']}
                          label={<Button style={styleButton}>予約番号</Button>}>
                          <Input />
                        </Form.Item>
                      </Space>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={7} >
                      <Form.Item name={['ListData', this.state.indexTable, 'patient_num']}
                        label={<Button style={styleButton}>&nbsp;患者番号&nbsp;</Button>}>
                        <Input style={{textAlign: 'right'}}/>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24} style={{display: 'inline'}}> 
                        <Form.Item name={['ListData', this.state.indexTable, 'order_start_date']} style={{width: 202, marginRight: 5, float: 'left'}}
                          label={<Button style={styleButton}>&ensp;&nbsp;開始日&ensp;&nbsp;</Button>}>
                          <VenusDatePickerCustom formRefDatePicker={this.formRef} format='YYYY/MM/DD'/>
                        </Form.Item>
                        <Form.Item name={['ListData', this.state.indexTable, 'order_start_time']} >
                          <Input  style={{width: 80}}/>
                        </Form.Item> 
                    </Col>
                  </Row>
                  <Row>
                    <Col span={5}>
                      <Form.Item name={['ListData', this.state.indexTable, 'depart']}
                        label={<Button style={styleButton}>&emsp;&ensp;&nbsp;科&emsp;&ensp;&nbsp;</Button>}>
                        <Input style={{ width: '75%' }} />
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item name={['ListData', this.state.indexTable, 'ward']}
                        label={<Button style={styleButton}>&emsp;&nbsp;病棟&emsp;&nbsp;</Button>}>
                        <Input style={{ width: '75%' }} />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item name={['ListData', this.state.indexTable, 'instruction_physician']}
                        label={<Button style={styleButton}>&ensp;指示医&ensp;</Button>}>
                        <Input />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={5}>
                      <Form.Item name={['ListData', this.state.indexTable, 'x_emergency_sect']}
                        label={<Button style={styleButton}>&emsp;&nbsp;緊急&emsp;&nbsp;</Button>}>
                        <Input style={{ width: '70%' }} />
                      </Form.Item>
                    </Col>
                    <Col span={5}>
                      <Form.Item name={['ListData', this.state.indexTable, 'x_urgent_sect']}
                        label={<Button style={styleButton}>&emsp;&nbsp;至急&emsp;&nbsp;</Button>}>
                        <Input style={{ width: '70%' }} />
                      </Form.Item>
                    </Col>
                    <Col span={5}>
                      <Form.Item name={['ListData', this.state.indexTable, 'x_urgent_phenomenon_sect']}
                        label={<Button style={styleButton}>至急現象</Button>}>
                        <Input style={{ width: '65%' }} />
                      </Form.Item>
                    </Col>
                    <Col span={5} >
                      <Form.Item name={['ListData', this.state.indexTable, 'interpret_request_situation']}
                        label={<Button style={styleButton}>読影依頼</Button>}>
                        <Input style={{ width: '65%' }} />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={10}>
                      <Form.Item name={['ListData', this.state.indexTable, 'reserves_acquisition_flg']}
                        label={<Button style={styleButton}>&emsp;&nbsp;予約&emsp;&nbsp;</Button>} >
                        <Radio.Group>
                          <Radio value={'0'}>なし</Radio>
                          <Radio value={'1'}>あり</Radio>
                        </Radio.Group>
                      </Form.Item>
                    </Col>
                    <Col span={2}>
                      <Form.Item name={['ListData', this.state.indexTable, 'reserves_depart']}>
                        <Input style={{ width: '80%' }} />
                      </Form.Item>
                    </Col>
                    <Col span={3}>
                      <Form.Item name={['ListData', this.state.indexTable, 'reserves_item_cd']}>
                        <Input style={{ width: '90%' }} />
                      </Form.Item>
                    </Col>
                    <Col span={3}>
                      <Form.Item name={['ListData', this.state.indexTable, 'reserves_act_cd']}>
                        <Input />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <Form.Item name={['ListData', this.state.indexTable, 'reserves_comment']}
                        label={<Button style={styleButton}>&nbsp;コメント&nbsp;</Button>}>
                        <Input />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <Table dataSource={this.formRef.current?.getFieldValue("tableData") ? this.formRef.current?.getFieldValue("tableData") : []}
                        loading={this.state.isloaddingTable2}
                        pagination={false} bordered={true} size="small"
                        rowKey={(record) => record.id} scroll={{ y: 300 }}
                      >
                        <Table.Column title="ｺｰﾄﾞ" dataIndex="cnv_1059_001" />
                        <Table.Column title="名称" dataIndex="exam_name" />
                      </Table>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row style={{ marginTop: '1em' }}>
                <Col span={24} style={{ textAlign: 'right' }}>
                  <Button type="primary" onClick={() => this.Check_F12()} >確定</Button>
                </Col>
              </Row>
            </Form>
          </Spin>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS2745009_ConfirmScreen);
