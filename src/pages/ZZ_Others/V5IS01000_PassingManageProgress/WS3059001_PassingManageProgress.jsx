import React from 'react';
import { connect } from "react-redux";
import moment from 'moment';
import PassingManageProgressAction from 'redux/Others/PassingManageProgress/PassingManageProgress.action';
import { Form, Card, Col, Row, Table, Modal, Button, Space, Spin, message, DatePicker, Checkbox } from 'antd';

import WS3059005_TerminalList from './WS3059005_TerminalList'
import WS3059008_PassingList from './WS3059008_PassingList'

class WS3059001_PassingManageProgress extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    document.title = '通過管理進捗状況';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      ImplementDateChar: '',
      PassingNumList: '',
      PassingNameList: '',
      selectedRowTableFirst: 0,
      dataSource: [],
      isLoadingTable: false,
      isLoadingSpin: false,
      selectedRowKeys: [],
      rowSelected: [],
    };

    this.redisplay = this.redisplay.bind(this);
  }

  componentDidMount() {
    this.getScreenData()
  }
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
    }
  }
  getScreenData() {
    this.setState({ isLoadingSpin: true })
    let param = {
      PassingNumList: '',
      PassingNameList: '',
      ImplementDateChar: '',
    }
    PassingManageProgressAction.getScreenData(param)
      .then((res) => {
        this.formRef.current?.setFieldsValue({
          ImplementDateChar: moment(res.ImplementDateChar),
          StsMore: res.StsMore
        });
        this.setState({
          PassingNumList: res.PassingNumList,
          ImplementDateChar: res.ImplementDateChar,
          isLoadingTable: true,
          PassingNameList: res.PassingNameList,
        });
        this.getStatusList(res.ImplementDateChar, res.StsMore, res.PassingNumList, 0);
      }).catch(error => {
        const res = error.response;
        if (!res || res.data || res.data.message) {
          message.error('エラーが発生しました');
        }
      }
      ).finally(() => this.setState({ isLoadingSpin: false }))
  }
  redisplay() {
    let date = this.formRef.current.getFieldValue("ImplementDateChar")?._i
    let more = this.formRef.current.getFieldValue("StsMore")
    let pass = this.state.PassingNumList
    this.getStatusList(date, more, pass,);
  }

  getDataOcrCheck(event) {
    let date = this.formRef.current.getFieldValue("ImplementDateChar")?._i
    let more = event.target.checked
    let pass = this.state.PassingNumList
    this.getStatusList(date, more, pass)
  }

  changeImplementpDate(event) {
    if (event === null) {
      this.formRef.current?.setFieldsValue({ ImplementDateChar: null })
    } else {
      let date = event.format('YYYY/MM/DD')
      let more = this.formRef.current.getFieldValue("StsMore")
      this.setState({ ImplementDateChar: date });

      this.formRef.current?.setFieldsValue({ ImplementDateChar: moment(date) });
      this.getStatusList(date, more, this.state.PassingNumList,);
    }
  }

  getStatusList(date, more, pass,) {
    this.setState({ isLoadingTable: true })
    let param = {
      Li_PassingNumList: pass,
      Li_ImplementDate: date,
      Li_More: (more) ? 1 : 0,
    }
    PassingManageProgressAction.getStatusList(param)
      .then((res) => {
        const dataRes = res ? res : []
        this.setState({
          dataSource: dataRes,
        })
        return res;
      }).finally(() => this.setState({ isLoadingTable: false }))
  }
  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }
  onFinish(values) {

  }

  renderMenuBar = () => (
    <Space>
      <Button onClick={() => {
        this.setState({
          childModal: {
            ...this.state.childModal,
            visible: true,
            width: 600,
            component: (
              <WS3059005_TerminalList
                ImplementDateChar={this.state.ImplementDateChar}
                onFinishScreen={() => {
                  this.closeModal();
                }}
              />
            ),
          }
        });
      }}
        type='text'>端末項目</Button>

      <Button onClick={() => {
        this.setState({
          childModal: {
            ...this.state.childModal,
            visible: true,
            width: 600,
            component: (
              <WS3059008_PassingList
                ImplementDateChar={this.state.ImplementDateChar}
                onFinishScreen={() => {
                  this.closeModal();
                }}
              />
            ),
          }
        });
      }}
        type='text'>通過項目</Button>

      <Button type="primary" onClick={() => this.redisplay()}>再表示</Button>
    </Space>
  )

  render() {
    const format = "YYYY/MM/DD";
    return (
      <div className="passing-manage-progress">
        <Spin spinning={this.state.isLoadingSpin}>
          <Card title="通過管理進捗状況">
            <Form>
              {this.renderMenuBar()}
            </Form>
            <Form ref={this.formRef} onFinish={this.onFinish}>
              <div style={{ padding: '10px', border: '1px solid #93C8F9', height: '100%', margin: '10px 0' }}>
                <Row>
                  <Col span={12} >
                    <Space>
                      <Form.Item name="ImplementDateChar" label="実施日">
                        <DatePicker
                          disabled={this.state.isLoadingTable}
                          // moment(format),
                          format={format}
                          onChange={(event) => this.changeImplementpDate(event)}
                        />
                      </Form.Item>
                    </Space>
                  </Col>
                  <Col span={12} style={{ textAlign: 'right' }}>
                    <Form.Item name="StsMore" valuePropName="checked">
                      <Checkbox onChange={(event) => this.getDataOcrCheck(event)}
                        disabled={this.state.isLoadingTable}
                      >全表示</Checkbox>
                    </Form.Item>
                  </Col>
                </Row>
              </div>
            </Form>
            <Table
              dataSource={this.state.dataSource}
              bordered={true}
              loading={this.state.isLoadingTable}
              scroll={{
                x: 'calc(100vw - (210px + 260px + ' + String(this.state.PassingNumList.split(',')?.length * 16) + 'px))',
                y: 'calc(100vh - (32px + 58px + 34px + 51px + 175px))'
              }}
              pagination={false}
              rowKey={(record) => record.doctor_code}
              className="mb-3"
              size="middle"
            >
              <Table.Column
                title="受付No"
                dataIndex="carried_out_order"
                width={30}
                fixed='left'
                render={(value) => {
                  return (
                    <div style={{ textAlign: 'right' }}>{value}</div>
                  )
                }}
              />
              <Table.Column
                title="個人番号"
                dataIndex="personal_number_id"
                width={40}
                fixed='left'
                render={(value) => {
                  return (
                    <div style={{ textAlign: 'right' }}>{value}</div>
                  )
                }}
              />
              <Table.Column
                title="カナ氏名"
                dataIndex="kana_name"
                width={60}
                fixed='left'
              />
              <Table.Column
                title="漢字氏名"
                dataIndex="kanji_name"
                width={60}
                fixed='left'
              />
              <Table.Column title="性別" dataIndex="Gender" width={30}
                render={(text) => (<span style={{ color: text === '男性' ? '#0F3278' : '#B41432' }}>{text}</span>)}
                fixed='left'
              />
              <Table.Column
                title="年齢"
                dataIndex="Age"
                width={30}
                fixed='left'
                render={(value) => {
                  return (
                    <div style={{ textAlign: 'right' }}>{value}</div>
                  )
                }}
              />

              {this.state.PassingNumList.split(',')?.map((item, index) => {
                let title = this.state.PassingNameList.split(',')[index];
                let dateIndex = "Inspect" + ("00" + (index + 1)).slice(-2);
                return (
                  <Table.Column
                    title={title}
                    dataIndex={dateIndex}
                    width={16}
                    key={`Inspect_${index}`}
                    render={(value) => {
                      return (
                        <div style={{ textAlign: 'center', fontFamily: 'Meiryo' }}>{value}</div>
                      )
                    }}
                  />)
              })}

            </Table>
          </Card>
        </Spin>
        <Modal
          footer={null}
          width={this.state.childModal.width}
          visible={this.state.childModal.visible}
          bodyStyle={{ margin: 0, padding: 0 }}
          destroyOnClose={true}
          maskClosable={false}
          onCancel={() => {
            this.closeModal();
          }}
        >
          {this.state.childModal.component}
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS3059001_PassingManageProgress);
