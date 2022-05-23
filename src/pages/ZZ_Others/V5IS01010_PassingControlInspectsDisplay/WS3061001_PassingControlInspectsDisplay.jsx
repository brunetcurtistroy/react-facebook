import React from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import moment from 'moment';
import { Form, Input, Card, Col, Row, Tabs, Table, Button, Space, Checkbox, Dropdown, Menu, Modal, Spin } from 'antd';

import PassingControlInspectsDisplayAction from "redux/Others/PassingControlInspectsDisplay/PassingControlInspectsDisplay.action";
import WS3059001_PassingManageProgress from '../V5IS01000_PassingManageProgress/WS3059001_PassingManageProgress'

const customStyle = {
  inputOnly: {
    background: "transparent",
    border: "none",
  },
  styleCol: {
    padding: 0,
  },
  styleRow: {
    margin: 0,
  },
};

class WS3061001_PassingControlInspectsDisplay extends React.Component {
  static propTypes = {
    Li_ImplementDate: PropTypes.any,
    Li_PassNum: PropTypes.any,
    Li_TerminalNum: PropTypes.any,
    Li_MenuOption: PropTypes.any,
  };

  formRef = React.createRef();

  constructor(props) {
    super(props);

    document.title = '通過管理検査表示';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      tabNum: 0,

      tabList: [],

      passingDataList: [],
      implementDateChar: '',
      passingNumList: [],
      passingNameList: [],

      dataSource: [],
      PassNum: '',
      TerminalNum: '',
      more: false,
      stateUpdate: false,

      isLoadingTable: false,
      isLoadingSpin: false,
    };

    this.renderTabPane = this.renderTabPane.bind(this);
  }

  componentDidMount() {
    this.getScreenData()
  }

  getScreenData() {
    this.setState({ isLoadingSpin: true });

    let params;
    if (this.props.ImplementDateChar) {
      this.setState({ implementDateChar: this.props.ImplementDateChar });
      params = {
        Li_ImplementDate: this.props.ImplementDateChar,
        Li_PassNum: this.props.passing_number ?? '',
        Li_TerminalNum: this.props.terminal_num ?? '',
        Li_MenuOption: '',
      }
    } else {
      // path='/passing-control-inspects-display/passing-control-inspects-display/:num/:date'
      let date = moment(this.props.match.params.date ?? '').format('YYYY/MM/DD');
      this.setState({ implementDateChar: date });
      params = {
        Li_ImplementDate: moment(date).format('YYYY/MM/DD'),
        Li_PassNum: '',
        Li_TerminalNum: this.props.match.params.num ?? '',
        Li_MenuOption: '',
      }
    }
    let tabListNameArr = []
    PassingControlInspectsDisplayAction.getScreenData(params)
      .then((res) => {
        if (res) {
          this.formRef.current?.setFieldsValue({
            PersonalNum: res.PersonalNum ?? '',
            StsMore: res.StsMore,
            StateUpdate: res.StateUpdate,
          });

          tabListNameArr = res.PassingNameList?.split(',');

          this.setState({
            tabList: tabListNameArr,
            passingNumList: res.PassingNumList?.split(','),
            passingNameList: res.PassingNameList?.split(','),
            PassNum: res.PassNum,
            TerminalNum: res.TerminalNum,
            more: res.StsMore,
            stateUpdate: res.StateUpdate,
            isLoadingTable: true
          });

          const passNum = res.PassNum;
          const terminalNum = res.TerminalNum;
          const implementDateChar = moment(res.ImplementDate)?.format("YYYY/MM/DD");
          const more = res.StsMore;
          this.getStatusList(implementDateChar, passNum, terminalNum, more)
        }
      }).finally(() => this.setState({ isLoadingSpin: false }))
  }

  getStatusList(implementDateChar, passNum, terminalNum, more) {
    let params = {
      Li_ImplementDate: implementDateChar,
      Li_PassNum: passNum,
      Li_TerminalNum: terminalNum,
      Li_MenuOption: '',
      Li_More: (more) ? 1 : 0,
    }
    PassingControlInspectsDisplayAction.getStatusList(params)
      .then((res) => {
        this.setState({
          dataSource: res ? res : []
        })
        this.formRef.current?.setFieldsValue({ PersonalNum: '' });

      }).finally(() => this.setState({ isLoadingTable: false }))
  }

  componentDidUpdate(prevProps) {
    // if (this.props !== prevProps) {
    //   this.getScreenData();
    // }
  }

  changeMore(event) {
    const bool = event.target.checked
    this.setState({ isLoadingTable: true, more: bool })
    this.getStatusList(this.state.implementDateChar, this.state.PassNum, this.state.TerminalNum, bool)
  }

  onFinish() {

  }

  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }

  acceptedState(personal_number_id) {
    this.setState({ isLoadingTable: true })
    let param = {
      Li_PersonalNum: personal_number_id,
      Li_ImplementDate: this.state.implementDateChar,
      Li_PassNum: this.state.PassNum,
      Li_TerminalNum: this.state.TerminalNum,
    }
    PassingControlInspectsDisplayAction.acceptedState(param)
      .then((res) => {
        this.getStatusList(this.state.implementDateChar, this.state.PassNum, this.state.TerminalNum, this.state.more);
      })
  }

  carriedOutState(personal_number_id) {
    this.setState({ isLoadingTable: true })
    let param = {
      Li_PersonalNum: personal_number_id,
      Li_ImplementDate: this.state.implementDateChar,
      Li_PassNum: this.state.PassNum,
      Li_TerminalNum: this.state.TerminalNum,
    }
    PassingControlInspectsDisplayAction.carriedOutState(param)
      .then((res) => {
        this.getStatusList(this.state.implementDateChar, this.state.PassNum, this.state.TerminalNum, this.state.more);
      })
  }

  cancel(personal_number_id) {
    this.setState({ isLoadingTable: true })
    let param = {
      Li_PersonalNum: personal_number_id,
      Li_ImplementDate: this.state.implementDateChar,
      Li_PassNum: this.state.PassNum,
      Li_TerminalNum: this.state.TerminalNum,
    }
    PassingControlInspectsDisplayAction.cancel(param)
      .then((res) => {
        this.getStatusList(this.state.implementDateChar, this.state.PassNum, this.state.TerminalNum, this.state.more);
      })
  }

  unmeasurable(personal_number_id) {
    this.setState({ isLoadingTable: true })
    let param = {
      Li_PersonalNum: personal_number_id,
      Li_ImplementDate: this.state.implementDateChar,
      Li_PassNum: this.state.PassNum,
      Li_TerminalNum: this.state.TerminalNum,
    }
    PassingControlInspectsDisplayAction.unmeasurable(param)
      .then((res) => {
        this.getStatusList(this.state.implementDateChar, this.state.PassNum, this.state.TerminalNum, this.state.more);
      })
  }

  changeStateUpdate(event) {
    let personal_number_id = event.target.value
    this.setState({ isLoadingTable: true })
    let param = {
      Li_StateUpdate: (this.state.stateUpdate) ? 1 : 0,
      Li_PersonalNum: personal_number_id,
      Li_ImplementDate: this.state.implementDateChar,
      Li_PassNum: this.state.PassNum,
      Li_TerminalNum: this.state.TerminalNum,
      Li_StsUpdate: ''
    }
    PassingControlInspectsDisplayAction.changeStateUpdate(param)
      .then((res) => {
        this.getStatusList(this.state.implementDateChar, this.state.PassNum, this.state.TerminalNum, this.state.more);
      })
  }

  changeUpdate(event) {
    const bool = event.target.checked
    this.setState({ stateUpdate: bool })
  }

  changeTab(activeKey) {
    this.setState({ isLoadingTable: true })
    this.setState({ tabNum: activeKey, PassNum: this.state.passingNumList[activeKey] })
    this.getStatusList(this.state.implementDateChar, this.state.passingNumList[activeKey], this.state.TerminalNum, this.state.more);
  }

  renderMenuBar = () => (
    <Space>
      <Button onClick={() => {
        this.setState({
          childModal: {
            ...this.state.childModal,
            visible: true,
            width: 1440,
            component: (
              <WS3059001_PassingManageProgress
                onFinishScreen={this.closeModal()}
              />
            ),
            isCloseModalLoadReserveStatusDisplayAgain: true,
          }
        });
      }}
        type='text'>一覧表示</Button>
    </Space>
  )

  renderListNumber = () => {
    var listItem = [];
    for (let i = 1; i <= 20; i++) {
      listItem.push(
        <Col
          span={1}
          offset={i === 1 ? 2 : null}
          style={customStyle.styleCol}
          key={`renderListNumber_${i}`}
        >
          <Form.Item style={{ marginBottom: 0 }}>
            <Input
              value={i < 10 ? "0" + i : i}
              readOnly
              style={customStyle.inputOnly}
            />
          </Form.Item>
        </Col>
      );
    }
    return listItem;
  };

  renderTabPane = () => {
    let paneList = [];
    const data = this.state.passingNameList;
    for (let i = 0; i < data.length; i++) {
      paneList.push(
        <Tabs.TabPane tab={data[i]} key={i} disabled={this.state.isLoadingTable}>
          {this.renderBodyTab(i)}
        </Tabs.TabPane>
      );
    }
    return paneList;
  };

  renderBodyTab = (tabNum) => {

    return (
      <div>
        <Row gutter={24} style={{ marginTop: "10px" }}>
          <Col span={24}>
            <div>
              <Table
                dataSource={this.state.dataSource}
                loading={this.state.isLoadingTable}
                // pagination={{
                //   current: 1,
                //   pageSize: 20,
                // }}
                pagination={false}
                bordered={true}
                size="small"
                scroll={{ y: '500px' }}
                style={{ height: '500px' }}
                tableLayout="fixed"
              >
                <Table.Column
                  title="受付No"
                  dataIndex="carried_out_order"
                  width={100}
                  render={(value) => {
                    return (
                      <div style={{ textAlign: 'right' }}>{value}</div>
                    )
                  }}
                />
                <Table.Column
                  title="個人番号"
                  dataIndex="personal_number_id"
                  width={120}
                  render={(value) => {
                    return (
                      <div style={{ textAlign: 'right' }}>{value}</div>
                    )
                  }}
                />
                <Table.Column
                  title="カナ氏名"
                  dataIndex="kana_name"
                />
                <Table.Column
                  title="漢字氏名"
                  dataIndex="kanji_name"
                />
                <Table.Column
                  title="性別"
                  dataIndex="Gender"
                  width={50}
                  align='center'
                  render={(text) => (<span style={{ color: text === '男性' ? '#0F3278' : '#B41432' }}>{text}</span>)}
                />
                <Table.Column
                  title="年齢"
                  dataIndex="Age"
                  width={80}
                  render={(value) => {
                    return (
                      <div style={{ textAlign: 'right' }}>{value}</div>
                    )
                  }}
                />
                <Table.Column
                  title="状態"
                  dataIndex="State"
                  width={80}
                  align='center'
                  style={{ fontFamily: 'Meiryo' }}
                />
                <Table.Column key="action" width={25}
                  render={(row, record) => {
                    return (
                      <Dropdown
                        overlay={() => (
                          <Menu>
                            <Menu.Item onClick={() => {
                              this.acceptedState(record.personal_number_id)
                            }}>受付済み</Menu.Item>
                            <Menu.Item onClick={() => {
                              this.carriedOutState(record.personal_number_id)
                            }}>実施済み</Menu.Item>
                            <Menu.Item onClick={() => {
                              this.cancel(record.personal_number_id)
                            }}>キャンセル</Menu.Item>
                            <Menu.Item onClick={() => {
                              this.unmeasurable(record.personal_number_id)
                            }}>測定不可</Menu.Item>
                          </Menu>
                        )}
                      >
                        <Button size="small">:</Button>
                      </Dropdown>
                    )
                  }} />
              </Table>
            </div>
          </Col>
        </Row>
      </div>
    );
  };

  render() {
    return (
      <div className="passing-control-inspects-display">
        <Spin spinning={this.state.isLoadingSpin}>
          <Card title="通過管理検査表示">
            <Form ref={this.formRef}>
              {this.renderMenuBar()}
              <div style={{ padding: '10px', border: '1px solid #93c8f9', height: '100%', margin: '10px 0' }} >
                <Row>
                  <Col span={16}>
                    <Space>
                      <Form.Item name="PersonalNum" label="バーコード" >
                        <Input
                          disabled={this.state.isLoadingTable}
                          onPressEnter={(event) => this.changeStateUpdate(event)}
                        />
                      </Form.Item>
                    </Space>
                  </Col>
                  <Col span={8} style={{ textAlign: 'right' }}>
                    <Space>
                      <Form.Item
                        name="StsMore"
                        valuePropName="checked"
                      >
                        <Checkbox
                          disabled={this.state.isLoadingTable}
                          onChange={(event) => this.changeMore(event)}>
                          全表示</Checkbox>
                      </Form.Item>
                      <Form.Item
                        name="StateUpdate"
                        valuePropName="checked"
                      >
                        <Checkbox
                          disabled={this.state.isLoadingTable}
                          onChange={(event) => this.changeUpdate(event)}>
                          更新</Checkbox>
                      </Form.Item>
                    </Space>
                  </Col>
                </Row>
              </div>
            </Form>
            <Tabs
              type="card"
              defaultActiveKey={this.state.tabNum}
              onChange={(activeKey) => this.changeTab(activeKey)}
            >
              {this.renderTabPane()}
            </Tabs>
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
      </div >
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS3061001_PassingControlInspectsDisplay);
