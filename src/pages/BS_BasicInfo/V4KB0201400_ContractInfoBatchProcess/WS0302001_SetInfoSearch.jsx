import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ModalDraggable from "components/Commons/ModalDraggable";
import { Card, Form, Input, Radio, Button, Table, Row, Col, Modal, Space, Dropdown, Menu } from "antd";

import { getSetInfoSearchListAction, getScreenDataSetInfoSearchAction } from 'redux/basicInfo/ContractInfoBatchProcess/ContractInfoBatchProcess.actions';

import WS0333001_SetIncludesQuery from 'pages/YK_ReservationBusiness/V5YK0004000_PersonalReserveProcess/WS0333001_SetIncludesQuery.jsx';
import { debounce } from "lodash";

const grid = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

class WS0302001_SetInfoSearch extends React.Component {
  static propTypes = {
    Li_SetIdentify: PropTypes.any,
    Li_StartDate: PropTypes.any,
    Li_CourseCode: PropTypes.any,
    _Lo_Return: PropTypes.any,
    Li_ContextId: PropTypes.any,
    Li_RangeSetting: PropTypes.any,
    Li_CourseLevel: PropTypes.any,
    Li_ReserveNum: PropTypes.any,
    Li_ContractType: PropTypes.any,
    Li_ContractOrgCode: PropTypes.any,
    Li_ContractStartDate: PropTypes.any,
    Li_ContractNum: PropTypes.any,
    Lo_SetCode: PropTypes.any,
    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.formRef = React.createRef();

    // document.title = 'セット情報検索';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      initialValues: {
        Li_SetIdentify: "All",
        Li_SetShortName: "",
        Li_RangeSetting: "",
        Li_ExamList: "",
        Li_ContractPresence: true,
        Li_ContractType: "",
        Li_ContractOrgCode: "",
        Li_ContractStartDate: "",
        Li_ContractNum: "",
        Li_InspectCategoryBreakdown: ""
      },
      isShowCategory2: true,
      setDefaultRadio: {
        Category1: 'All',
        Category2: 'Cos'
      },
      pagination: {
        defaultPageSize: 10,
        size: 'small',
        showQuickJumper: true
      },
      isLoading: true,
      data: [],
    };
  }

  componentDidMount = () => {
    let params = {
      Li_SetIdentify: this.props.Li_SetIdentify,
      Li_CourseLevel: this.props.Li_CourseLevel,
      Li_ReserveNum: this.props.Li_ReserveNum,
      Li_ContractType: this.props.Li_ContractType,
      Li_ContractOrgCode: this.props.Li_ContractOrgCode,
      Li_ContractStartDate: this.props.Li_ContractStartDate,
      Li_ContractNum: this.props.Li_ContractNum
    }
    this.loadScreenData(params);
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps !== this.props) {
      let params = {
        Li_SetIdentify: this.props.Li_SetIdentify,
        Li_CourseLevel: this.props.Li_CourseLevel,
        Li_ReserveNum: this.props.Li_ReserveNum,
        Li_ContractType: this.props.Li_ContractType,
        Li_ContractOrgCode: this.props.Li_ContractOrgCode,
        Li_ContractStartDate: this.props.Li_ContractStartDate,
        Li_ContractNum: this.props.Li_ContractNum
      }
      this.loadScreenData(params);
    }
  }

  loadScreenData = (params) => {
    getScreenDataSetInfoSearchAction(params)
      .then(res => {
        let values = {
          ...this.state.initialValues,
          Li_ExamList: res.data.ExamList,
          Li_ContractPresence: res.data.StsTermsAndConditionInfo,
          Li_InspectCategoryBreakdown: res.data.exam_category
        }
        this.callAPILoadData(values);
      })
      .catch()
  }

  callAPILoadData = (params) => {
    this.setState({ isLoading: true })
    getSetInfoSearchListAction(params).then((res) => {
      this.setState({ data: res })
    }).finally(() => this.setState({ isLoading: false }))
  }

  handleSearch = (e) => {
    this.setState({
      initialValues: {
        ...this.state.initialValues,
        Li_SetShortName: e.target.value,
      }
    }, () => this.callAPILoadData(this.state.initialValues));
  }

  handleButton = () => {
  }

  handleChangeRadio = (e) => {
    const formInstance = this.formRef.current;
    if (e.target.value === 'All' || e.target.value === 'Tan') {
      const SetIdentifyTemp = formInstance.getFieldValue('Category1');
      this.setState({
        isShowCategory2: true,
        initialValues: {
          ...this.state.initialValues,
          Li_SetIdentify: SetIdentifyTemp
        }
      }, () => this.callAPILoadData(this.state.initialValues));
    } else {
      const SetIdentifyTemp = formInstance.getFieldValue('Category2');
      this.setState({
        isShowCategory2: false,
        initialValues: {
          ...this.state.initialValues,
          Li_SetIdentify: SetIdentifyTemp
        }
      }, () => this.callAPILoadData(this.state.initialValues));
    }
  }

  render() {
    const { data, pagination, isLoading, setDefaultRadio, isShowCategory2, } = this.state;
    return (
      <div className="set-info-search">
        <Card title="セット情報検索">
          <Form {...grid} ref={this.formRef} initialValues={setDefaultRadio} autoComplete='off'>
            <Row gutter={24} className="mb-3">
              <Col span={8}>
                <Form.Item name="Category1" onChange={this.handleChangeRadio}>
                  <Radio.Group name="Category1">
                    <Radio value="All">全て</Radio>
                    <Radio value="condition">セット</Radio>
                    <Radio value="Tan">単品</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item name="Category2" >
                  <Radio.Group name="Category2" disabled={isShowCategory2} onChange={this.handleChangeRadio}>
                    <Radio value="Cos">コース</Radio>
                    <Radio value="Opt">ｵﾌﾟｼｮﾝ</Radio>
                    <Radio value="Set">その他</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item name="SetShortName" label="検索">
                  <Input onChange={debounce((e) => this.handleSearch(e), 300)} />
                </Form.Item>
              </Col>
            </Row>

            <Table
              size='small'
              className="mb-3"
              bordered
              dataSource={data}
              rowKey={record => record.set_code}
              locale={{ emptyText: "データがありません" }}
              loading={isLoading}
              pagination={pagination}
              scroll={{x: 850, y: 700}}
            >
              <Table.Column title="コード" dataIndex="set_code" width={100}/>
              <Table.Column title="セット名称" dataIndex="set_name" />
              <Table.Column title="セット略称" dataIndex="set_short_name" />
              <Table.Column title="検索略称" dataIndex="search_short_name" />
              <Table.Column title="条" dataIndex="" width={50} align='center'/>
              <Table.Column title="性別" dataIndex="Expression_2" width={50} align='center'/>
              <Table.Column title="続柄" dataIndex="name" />
              <Table.Column title="単価" dataIndex="unit_price" width={100}
                render={(text) => <div>{text === 0 || text === '0' ? '' : text.toLocaleString()}</div>}
              />
              <Table.Column width={90} align='center'
              render={(value, row) => (
                <Dropdown.Button
                  type="primary"
                  onClick={() => {
                    if (this.props.onFinishScreen) {
                      this.props.onFinishScreen({
                        Lo_SetCode: row.set_code,
                        recordData: row
                      });
                    };
                  }}
                  overlay={(<Menu>
                    <Menu.Item type="primary" onClick={() => {
                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          visible: true,
                          width: 900,
                          component: (<WS0333001_SetIncludesQuery
                            Li_StartDate={this.props.Li_StartDate || '0000/00/00'}
                            Li_SetCode={row.SetCodeSetIncludeQuery}
                            Li_CourseCode={this.props.Li_CourseCode}
                            onClickedSelect={() => {
                              this.setState({
                                childModal: {
                                  ...this.state.childModal,
                                  visible: false,
                                }
                              });
                            }}
                          />)
                        }
                      })
                    }}>セット内訳</Menu.Item>
                  </Menu>)}
                >選択</Dropdown.Button>
              )} />
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0302001_SetInfoSearch);
