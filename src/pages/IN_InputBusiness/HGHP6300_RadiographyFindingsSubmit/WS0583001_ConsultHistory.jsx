import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import { Card, Table, Row, Col, Button, Tabs, Input, Modal } from "antd";
import { DoubleRightOutlined, MoreOutlined } from '@ant-design/icons';

import WS0688001_ContractInspectContentSelectSub from 'pages/IN_InputBusiness/HGHP6300_RadiographyFindingsSubmit/WS0688001_ContractInspectContentSelectSub.jsx'
import WS0251003_OfficeSpecialDisplay from 'pages/BS_BasicInfo/V4MS0003300_PersonalNumberMigration/WS0251003_OfficeSpecialDisplay.jsx'
import  ModalDraggable  from "components/Commons/ModalDraggable";

const { TabPane } = Tabs;

const initialPanes = [
  { title: 'ｵﾌﾟｼｮﾝ', key: '1', closable: false },
  { title: '追加', key: '2', closable: false },
  { title: '削除', key: '3', closable: false },
  { title: '全件', key: '4', closable: false },
];

const styleButtonCustom = {
  width: '100%',
  border: '1px solid black',
  padding: '0',
  height: '28px',
  borderRadius: '0',
  textAlign: 'center',
};

let numbers = [];

class WS0583001_ConsultHistory extends React.Component {

  static propTypes = {
    Li_PersonalNum: PropTypes.any,
    Li_HistoryPresence: PropTypes.any,

    onClickedSelect: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = '受診履歴';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      activeKey: initialPanes[0].key,
      panes: initialPanes,
      dataSource: [
        {
          id: 1,
          visit_date_on: '2021/03/21',
          period_time: '12:12',
          contract_short_name: 'test',
          comprehensive_judgment: '3',
          office_kanji_name: '11',
          event: '10',
          editing: false
        }
      ],
    };
  }

  onChange = activeKey => {
    this.setState({ activeKey });
  };


  addNumber = () => {
    numbers = [];
    for (let i = 1; i < 11; i++) {
      numbers.push(i)
    }
  };

  render() {
    const formatDate = 'YYYY/MM/DD';
    const formatTime = 'HH:mm';
    this.addNumber();
    const { panes, activeKey } = this.state;
    return (
      <div className="consult-history">
        <Card title="受診履歴">
          <Row gutter={24}>
            <Col span={12}>
              <Table
                dataSource={this.state.dataSource}
                loading={false}
                pagination={false}
                bordered={true}
                rowKey={(record) => record.id}
                scroll={{ x: 500, y: 1000 }}
              >
                <Table.Column title="受診日" dataIndex=""
                  render={(key, item) => (
                    <div>
                      <div> {(item.visit_date_on, formatDate)} </div>
                      <div>{item.visit_date_on}</div>
                    </div>
                  )}
                />
                <Table.Column title="" dataIndex="event" width="50px" />
                <Table.Column title="時間帯" dataIndex="period_time" width="90px"
                  render={(key, item) => (
                    <div> {(item.period_time, formatTime)} </div>
                  )} />
                <Table.Column title="受診コース" dataIndex=""
                  render={(key, item) => (
                    <div>
                      <div> {item.contract_short_name} </div>
                      <div> {item.contract_short_name} </div>
                    </div>
                  )} />
                <Table.Column title="判定" dataIndex="comprehensive_judgment" width="50px" />
                <Table.Column title="事業所" dataIndex=""
                  render={(key, item) => (
                    <div>
                      <Row>
                        <Col span={16}>
                          <div> {item.office_kanji_name} </div>
                          <div> {item.office_kanji_name} </div>
                        </Col>
                        <Col span={8} style={{ alignSelf: 'center', float: 'right' }}>
                          <Button icon={<MoreOutlined />} style={{ width: '22px', height: '25px', fontSize: 'inherit' }}
                            onClick={() => {
                              this.setState({
                                childModal: {
                                  ...this.state.childModal,
                                  visible: true,
                                  width: 1200,
                                  component:
                                    <WS0251003_OfficeSpecialDisplay
                                      onClickedCreate={() => {
                                        this.setState({
                                          childModal: {
                                            ...this.state.childModal,
                                            visible: false,
                                          },
                                        });
                                      }}
                                    />
                                  ,
                                },
                              });
                            }}
                          ></Button>
                        </Col>
                      </Row>
                    </div>
                  )}
                />
              </Table>
            </Col>
            <Col span={12}>
              <Row gutter={24}>
                {numbers.map(number => (
                  <Col span={2} style={{ padding: '0px' }} key={number}>
                    <Button type="primary"
                      style={styleButtonCustom}>4</Button>
                  </Col>
                ))}
                <Col span={2} style={{ padding: '0px' }}>
                  <Button type="primary"
                    style={{
                      marginLeft: '2px',
                      padding: '0',
                      height: '28px'
                    }}
                    icon={<DoubleRightOutlined />}
                  ></Button>
                </Col>
              </Row>
              <Row gutter={24}>
                {numbers.map(number => (
                  <Col span={2} style={{ padding: '0px' }} key={number}>
                    <Input type="text" value={4}
                      style={styleButtonCustom} />
                  </Col>
                ))}
              </Row>
              <Row gutter={24}>
                <Col span={24} style={{ padding: '0px' }}>
                  <Tabs
                    hideAdd
                    type="card"
                    onChange={this.onChange}
                    activeKey={activeKey}
                    onEdit={this.onEdit}
                    style={{ marginTop: '8px' }}
                  >
                    {panes.map(pane => (
                      <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
                        <WS0688001_ContractInspectContentSelectSub>
                        </WS0688001_ContractInspectContentSelectSub>
                      </TabPane>
                    ))}
                  </Tabs>
                </Col>
              </Row>
            </Col>
          </Row>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0583001_ConsultHistory);
