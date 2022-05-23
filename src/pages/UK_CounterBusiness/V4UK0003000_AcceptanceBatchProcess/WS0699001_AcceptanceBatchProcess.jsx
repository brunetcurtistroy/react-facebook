import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
import React from "react";
import { connect } from "react-redux";

import { Card, Form, Button, Select, Checkbox, Row, Col, Space, message, InputNumber, Table } from "antd";
import { SearchOutlined, PlusCircleOutlined } from "@ant-design/icons";
import WS2788013_TargetSelectSub from 'pages/JZ_AdvancePreparation/V4JZ0101000_ConsultInfoList/WS2788013_TargetSelectSub.jsx';
import WS2786001_ConditionAddSub from 'pages/BS_BasicInfo/V4KB0203000_ConsultInfoReconstruction/WS2786001_ConditionAddSub.jsx';
import moment from "moment";
import {
  getScreenAcceptanceBatchProcessAction, eventRetrievalAcceptanceBatchProcessAction, eventAcceptOrCancelSubAcceptanceBatchProcessAction
} from "redux/CounterBusiness/AcceptanceBatchProcess/AcceptanceBatchProcess.actions";
import { ModalConfirm, ModalInfo } from "components/Commons/ModalConfirm";
import { ModalCustom } from "components/Commons/ModalCustom";
import Color from "constants/Color";
import Menubar from "components/Commons/Menubar";

const smGrid = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const dateFormat = 'YYYY/MM/DD';
class WS0699001_AcceptanceBatchProcess extends React.Component {

  constructor(props) {
    super(props);

    // document.title = '受付一括処理';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      colorConditionAddBtn: 163,
      isLoading: false,
      objChild: {
        records: [],
        recordsID: []
      },
      initParams: {
        DateChar: moment().format(dateFormat),
        StateFlag: 0,
        KeyInfo: '',
        StartNumOp: '',
        SkyNumsUsePresenceOp: 1
      },
      initObj: {},
      message: '', // WS2788013_TargetSelectSub
      isSearch: false, // WS2788013_TargetSelectSub
      menuItems: [
        { id: 1, label: '実行', handleClick: this.eventF12 },
      ],
    };
  }

  componentDidMount = () => {
    this.loadInitData();
  }

  loadInitData = () => {
    getScreenAcceptanceBatchProcessAction()
      .then(res => {
        if (res?.data) {
          this.setState({
            initObj: res.data,
            initParams: {
              ...this.state.initParams,
              KeyInfo: res.data.KeyInfo
            }
          });
        }
      })
      .catch(err => message.error(err?.response?.data?.message || "エラーが発生しました"))
  }

  loadData = (params) => {
    this.setState({ isLoading: true, objChild: { record: [], recordsID: [] } });
    eventRetrievalAcceptanceBatchProcessAction(params)
      .then(res => {
        if (res) {
          this.setState({
            message: res.data.message,
            isLoading: false,
            isSearch: true
          });
        }
      })
      .catch(err => {
        this.setState({ isLoading: false })
        message.error(err?.response?.data?.message || "エラーが発生しました")
      })
      .finally(() => this.setState({ message: '' }))
  }

  Retrieval = () => {
    this.loadData(this.state.initParams)
  }

  AcceptOrCancelSub = (params) => {
    this.setState({ isLoading: true });
    eventAcceptOrCancelSubAcceptanceBatchProcessAction(params)
      .then(res => {
        ModalInfo(res?.data?.Warning);
        this.Retrieval();
      })
      .catch(err => message.error(err?.response?.data?.message || "エラーが発生しました"))
      .finally(() => this.setState({ isLoading: false }))
  }

  handleChangeInitparams = (value, name) => {
    this.setState({
      initParams: {
        ...this.state.initParams,
        [name]: value
      }
    })
  }

  setValueChildren = (arr) => {
    let recordsID = [];
    if (arr.length > 0) {
      recordsID = arr.map(item => item.id);
    }
    this.setState({
      objChild: {
        records: arr,
        recordsID: recordsID
      }
    })
  }

  renderTargetSub = () => (
    <WS2788013_TargetSelectSub
      isSearch={this.state.isSearch}
      message={this.state.message}
      setValueChildren={this.setValueChildren}
      PageSize={20}
    />
  )

  closeModal = () => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }

  render() {
    return (
      <div className="acceptance-batch-process">
        <Card>
          <Form initialValues={{
            StateFlag: 0,
            DateChar: moment(),
            SkyNumsUsePresenceOp: true
          }} >
            <Menubar items={this.state.menuItems} />
            <Row gutter={24} className="mt-3" style={{borderBottom: '.5px solid #DCDCDC'}}>
              <Col span={8}>
                <Row gutter={24}>
                  <Col span={8}>
                    <Form.Item name="StateFlag" label="処　理" {...smGrid} >
                      <Select allowClear={false} onChange={(value) => this.handleChangeInitparams(value, 'StateFlag')}>
                        <Select.Option value={0}>受付</Select.Option>
                        <Select.Option value={1}>取消</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={8}>
                    <Form.Item name="DateChar" label="受診日" {...smGrid} >
                      <VenusDatePickerCustom formRefDatePicker={this.formRef} allowClear={false} format="YYYY/MM/DD"
                        onChange={(date, dateString) => this.handleChangeInitparams(dateString, 'DateChar')}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={8} className="mb-3">
                    <Space style={{ textAlign: "right" }}>
                      <Button
                        onClick={() => {
                          this.setState({
                            isSearch: false,
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: 800,
                              component:
                                <WS2786001_ConditionAddSub
                                  Li_DateF={this.state.initParams.DateChar}
                                  Li_DateT={this.state.initParams.DateChar}
                                  Li_AcceptNoF={''}
                                  Li_AcceptNoT={''}
                                  Li_CourseF={''}
                                  Li_CourseT={''}
                                  Li_TimeDivision={''}
                                  Li_FacilityType={''}
                                  Li_State={this.state.initParams.StateFlag}
                                  Li_Insurer={''}
                                  Li_Office={''}
                                  Li_BranchShop={''}
                                  Li_PersonalNum={''}
                                  Lio_KeyInfo={this.state.initParams.KeyInfo}
                                  onFinishScreen={({ Lio_KeyInfo, Expression_36 }) => {
                                    if (Lio_KeyInfo && Expression_36) {
                                      this.handleChangeInitparams(Lio_KeyInfo, 'KeyInfo')
                                      this.setState({ colorConditionAddBtn: Expression_36 })
                                    }
                                    this.closeModal()
                                  }}
                                />
                              ,
                            },
                          });
                        }}
                      >
                        <PlusCircleOutlined />
                        <span style={{ color: Color(this.state.colorConditionAddBtn).Foreground }}>条件追加</span>
                      </Button>
                      <Button icon={<SearchOutlined />} onClick={this.Retrieval} style={{color: '#14468C'}}>検　　索 </Button>
                    </Space>
                  </Col>
                </Row>
              </Col>

              <Col span={10} >
                <Row gutter={24}>
                  <Col span={6}>
                    <Form.Item name="StartNumOp" label="開始番号" >
                      <InputNumber min={1} maxLength={6} onChange={(value) => this.handleChangeInitparams(value, 'StartNumOp')} />
                    </Form.Item>
                  </Col>
                  <Col span={18}>
                    <Form.Item name="SkyNumsUsePresenceOp" valuePropName="checked" >
                      <Checkbox onChange={(e) => this.handleChangeInitparams(e.target.checked ? 1 : 0, 'SkyNumsUsePresenceOp')}>空き発番</Checkbox>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={18} offset={6}>
                    <Button type="primary"
                      onClick={() => {
                        let StateFlag = this.state.initParams.StateFlag === 0 ? '受付' : '取消';
                        let content = '一括で' + StateFlag + '処理を実行しますか？';
                        ModalConfirm({
                          content: content,
                          onOk: () => {
                            const params = {
                              StartNumOp: this.state.initParams.StartNumOp,
                              StateFlag: this.state.initParams.StateFlag,
                              SkyNumsUsePresenceOp: this.state.initParams.SkyNumsUsePresenceOp,
                              OptionOp: this.state.initObj.OptionOp
                            }
                            this.AcceptOrCancelSub(params)
                          },
                        })
                      }}
                    >実　行</Button>
                  </Col>
                </Row>
              </Col>
            </Row>

            <div className='mt-3'>
              {!this.state.isLoading
                ? this.renderTargetSub()
                :
                (
                  <Table
                    size="small"
                    dataSource={[]}
                    loading={this.state.isLoading}
                    pagination={false}
                    bordered
                  >
                    <Table.Column title="受診日" dataIndex="visit_date_on" />
                    <Table.Column title="時間" dataIndex="period_time" />
                    <Table.Column title="受付No" dataIndex="receipt_number" />
                    <Table.Column title="個人番号" dataIndex="personal_number_id" />
                    <Table.Column title="メモ" dataIndex="importance" />
                    <Table.Column title="漢字氏名" dataIndex="KanjiName" />
                    <Table.Column title="性別" dataIndex="Gender" />
                    <Table.Column title="生年月日" dataIndex="DateBirth" />
                    <Table.Column title="年齢" dataIndex="Age" />
                    <Table.Column title="メモ" dataIndex="expression_27" />
                    <Table.Column title="事業所" dataIndex="office_kanji_name" />
                    <Table.Column title="契約情報" />
                    <Table.Column title="状態" dataIndex="expression_15" />
                    <Table.Column title="備考" dataIndex="remarks" />
                    <Table.Column title="検査状況" dataIndex="InspectStatus" />
                  </Table>
                )
              }
            </div>
          </Form>
        </Card>
        {ModalCustom({
          width: this.state.childModal.width,
          visible: this.state.childModal.visible,
          component: this.state.childModal.component,
          onCancel: this.closeModal
        })}
      </div >
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS0699001_AcceptanceBatchProcess);
