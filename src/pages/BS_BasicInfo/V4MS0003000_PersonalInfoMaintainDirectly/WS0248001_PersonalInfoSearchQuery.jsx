/* eslint-disable eqeqeq */
import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Row, Col, Input, Form, Spin, Card, Table, Button, Space } from "antd";
import ModalDraggable from "components/Commons/ModalDraggable";
import {
  InfoCircleOutlined,
  WarningOutlined,
  CloseCircleOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { debounce } from "lodash";

import { getPersonalInfoSearchAction, getPersonalInfoSearchOfficeAction } from "redux/basicInfo/PersonalInfoMaintain/PersonalInfoMaintain.action";
import WS0247001_OfficeInfoRetrievalQuery from "pages/BS_BasicInfo/V4MS0002000_OfficeInfoMaintainDirectly/WS0247001_OfficeInfoRetrievalQuery.jsx";
import WS2584019_PersonalInfoInquirySub from "pages/KS_CooperationRelated/V4CP0020000_InspectRequestMain/WS2584019_PersonalInfoInquirySub";
import moment from "moment-timezone";
import WS0343001_PersonalInfoMaintain from "./WS0343001_PersonalInfoMaintain";
import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";

const styleLabel = {
  width: '70px',
  paddingRight: 10,
  textAlign: 'right',
  paddingBottom: 5,
  alignSelf: 'center',
  color: '#14468C',
  fontWeight: 'bold'
}

class WS0248001_PersonalInfoSearchQuery extends React.Component {
  formRef = React.createRef();

  static propTypes = {
    Lo_PersonalNumId: PropTypes.any,
    Li_OfficeCode: PropTypes.any,
    Li_BranchStoreCode: PropTypes.any,
    Li_office_kanji_name: PropTypes.any,

    // show/hide card title
    showTitle: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    // document.title = "個人情報検索・照会";

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      selectedRows: "",

      dataSource: [],
      isLoadingTable: false,
      selectedRowKeys: [],
      rowSelected: [],
      indexTable: 0,

      isLoadingInsurerInfo: false,

      disabledByOfficeCode: false,

      tableDataPaginate: {},
      tablePageDataRes: {},
    };
  }

  componentDidMount = () => {
    this.formRef.current?.setFieldsValue({
      office_code: this.props.Li_OfficeCode ? this.props.Li_OfficeCode : '',
      branch_store_code: this.props.Li_BranchStoreCode ? this.props.Li_BranchStoreCode : '',
      office_kanji_name: this.props.Li_office_kanji_name ? this.props.Li_office_kanji_name : ''
    })
    this.onSearchData()
  };

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.formRef.current?.setFieldsValue({
        office_code: this.props.Li_OfficeCode ? this.props.Li_OfficeCode : '',
        branch_store_code: this.props.Li_BranchStoreCode ? this.props.Li_BranchStoreCode : '',
        office_kanji_name: this.props.Li_office_kanji_name ? this.props.Li_office_kanji_name : ''
      })
      this.onSearchData()
    }
  }

  getPersonalInfoSearchList(page, pageSize) {
    let params = {
      ...this.formRef.current?.getFieldValue(),
      DateOfBirthSearch: this.formRef.current?.getFieldValue('DateOfBirthSearch') ? moment(this.formRef.current?.getFieldValue('DateOfBirthSearch'))?.format('YYYY/MM/DD') : '',
      page: page ? page : 1,
      limit: pageSize
    };

    params.birthday_on = moment(params.birthday_on).format('YYYY/MM/DD');

    this.setState({
      isLoadingInsurerInfo: true,
      isLoadingTable: true
    });

    getPersonalInfoSearchAction(params)
      .then((res) => {
        if (res) {
          this.setState({
            dataSource: res ? res.data : [],
            isLoadingTable: false,
            isLoadingInsurerInfo: false,
            selectedRowKeys: res && res.data.length > 0 ? [res.data[0].id] : [],
            rowSelected: res && res.data.length > 0 ? [res.data[0]] : [],
            tableDataPaginate: res ? {
              ...this.state.tableDataPaginate,
              current: res.current_page,
              pageSize: res.per_page,
              total: res.total,
            } : null,
          });
          this.forceUpdate();
        }
      })
      .finally(() => {
        this.setState({
          isLoadingInsurerInfo: false,
          isLoadingTable: false
        })
      })
  };

  getPersonalInfoSearchListOffice(page, pageSize) {
    let params = {
      ...this.formRef.current?.getFieldValue(),
      DateOfBirthSearch: this.formRef.current?.getFieldValue('DateOfBirthSearch') ? moment(this.formRef.current?.getFieldValue('DateOfBirthSearch'))?.format('YYYY/MM/DD') : '',
      page: page ? page : 1,
      limit: pageSize
    };

    params.birthday_on = moment(params.birthday_on).format('YYYY/MM/DD');

    this.setState({
      isLoadingInsurerInfo: true,
      isLoadingTable: true
    });

    getPersonalInfoSearchOfficeAction(params)
      .then((res) => {
        this.setState({
          dataSource: res ? res.data : [],
          isLoadingTable: false,
          isLoadingInsurerInfo: false,
          selectedRowKeys: res && res.data.length > 0 ? [res.data[0].id] : [],
          rowSelected: res && res.data.length > 0 ? [res.data[0]] : [],
          tableDataPaginate: res ? {
            ...this.state.tableDataPaginate,
            current: res.current_page,
            pageSize: res.per_page,
            total: res.total,
          } : null,
        });
        this.forceUpdate();
      })
      .finally(() => {
        this.setState({
          isLoadingInsurerInfo: false,
          isLoadingTable: false
        })
      })
  };
  onSearchData() {
    if (this.formRef.current.getFieldValue("office_code")) {
      this.setState({
        disabledByOfficeCode: true
      })
      this.getPersonalInfoSearchListOffice(1, 15);
    } else {
      this.setState({
        disabledByOfficeCode: false
      })
      this.getPersonalInfoSearchList(1, 15);
    }
  }

  onFinish(values) {
    console.log("Values", values);
  }

  closeModal = () => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  };

  render() {
    return (
      <div className="personal-info-search-query">
        <Card title={this.props.hideTitle ? null : "個人情報検索・照会"}>
          <Form ref={this.formRef} onFinish={this.onFinish} autoComplete="off" >
            <Spin spinning={this.state.isLoadingInsurerInfo}>
              <div className="mb-3">
                <Row>
                  <label style={styleLabel}>事業所</label>
                  <Form.Item name="office_code" style={{ width: '120px', marginRight: 10, marginBottom: 5 }}>
                    <Input.Search
                      onSearch={() => {
                        this.setState({
                          childModal: {
                            ...this.state.childModal,
                            visible: true,
                            width: '90%',
                            component: (
                              <WS0247001_OfficeInfoRetrievalQuery
                                onFinishScreen={({ Lio_OfficeCode, Lio_BranchStoreCode, Lo_Kanji_Name }) => {
                                  this.formRef.current.setFieldsValue({
                                    office_code: Lio_OfficeCode,
                                    branch_store_code: Lio_BranchStoreCode,
                                    office_kanji_name: Lo_Kanji_Name,
                                  });

                                  this.onSearchData()
                                  this.closeModal()
                                }}
                              />
                            ),
                          },
                        });
                      }}
                      onChange={debounce((event) => {
                        this.formRef.current.setFieldsValue({
                          office_kanji_name: '',
                          branch_store_code: event.target.value ? this.formRef.current.getFieldValue('branch_store_code') : ''
                        });
                        this.setState({
                          disabledByOfficeCode: event.target.value ? true : false
                        })
                        this.onSearchData()
                      }, 300)}
                    />
                  </Form.Item>
                  <Form.Item name="branch_store_code" style={{ width: '110px', marginRight: 10, marginBottom: 5 }}>
                    <Input.Search
                      onChange={(event) => this.onSearchData()}
                      onSearch={() => {
                        this.setState({
                          childModal: {
                            ...this.state.childModal,
                            visible: true,
                            width: 1200,
                            component: (
                              <WS0247001_OfficeInfoRetrievalQuery
                                onFinishScreen={({ Lio_OfficeCode, Lio_BranchStoreCode, Lo_Kanji_Name }) => {
                                  this.formRef.current.setFieldsValue({
                                    office_code: Lio_OfficeCode,
                                    branch_store_code: Lio_BranchStoreCode,
                                    office_kanji_name: Lo_Kanji_Name,
                                  });
                                  this.onSearchData()
                                  this.closeModal()
                                }}
                              />
                            ),
                          },
                        });
                      }}
                    />
                  </Form.Item>
                  <Form.Item style={{ width: 'calc(100% - 320px)', marginBottom: 5 }}>
                    <span>
                      {this.formRef.current?.getFieldValue("office_kanji_name")}
                    </span>
                  </Form.Item>
                </Row>
                <Row>
                  <label style={styleLabel}>カナ氏名</label>
                  <Form.Item name="kana_name" style={{ width: '150px', marginRight: 10, marginBottom: 5 }}>
                    <Input
                      disabled={this.state.disabledByOfficeCode}
                      onChange={(event) => this.onSearchData()}
                    />
                  </Form.Item>
                  <Form.Item name="kana_first_name" label="カナ名" style={{ width: '170px', marginRight: 10, marginBottom: 5 }}>
                    <Input
                      disabled={this.state.disabledByOfficeCode}
                      onChange={(event) => this.onSearchData()}
                    />
                  </Form.Item>
                  <Form.Item name="DateOfBirthSearch" label="生年月日" style={{ width: '180px', marginBottom: 5 }}>
                    <VenusDatePickerCustom formRefDatePicker={this.formRef} format='NNy/MM/DD'
                      onBlur={(event) => this.onSearchData()}
                    />
                  </Form.Item>
                </Row>
                <hr />
              </div>

              {/* row2 */}
              <Row gutter={24}>
                <Col lg={24} xl={11} style={{ borderRight: '1px solid #dddd' }}>
                  <div
                    className="mb-3"
                    style={{ height: "calc(100% - 1rem)" }}
                  >
                    <div hidden={this.state.disabledByOfficeCode}>
                      <Table
                        size="small"
                        style={{ cursor: 'pointer' }}
                        rowClassName={(record, index) => record.id === this.state.rowSelected[0].id ? 'table-row-light' : ''}
                        loading={this.state.isLoadingTable}
                        dataSource={this.state.dataSource}
                        rowKey={(record) => record.id}
                        scroll={{ x: 700, y: 700 }}
                        bordered
                        onRow={(record, rowIndex) => {
                          return {
                            onClick: () => {
                              this.setState({
                                rowSelected: [record],
                                selectedRowKeys: [record.id],
                              });
                            },

                            onDoubleClick: () => {
                              if (this.props.onFinishScreen) {
                                this.props.onFinishScreen({
                                  Lo_PersonalNumId: record.personal_number_id,
                                  recordData: record,
                                });
                              }
                            }
                          };
                        }}
                        onChange={(pagination) => {
                          this.getPersonalInfoSearchList(pagination.current, pagination.pageSize)
                        }}
                        pagination={this.state.tableDataPaginate}
                      >
                        <Table.Column title="個人番号" dataIndex="personal_number_id" width={80} 
                        render={(value, record, index) => { 
                          return (
                            <div style={{textAlign: 'right'}}>{value == 0 ? '' : value}</div>
                          )
                        }}
                        />
                        <Table.Column title="メモ" dataIndex="importance" width={40} align='center'
                          render={(value, record, index) => {
                            switch (record.importance) {
                              case 1:
                                return (<InfoCircleOutlined style={{ fontSize: 20, color: "#1890ff" }} />);

                              case 3:
                                return (<WarningOutlined style={{ fontSize: 20, color: "#faad14" }} />);

                              case 5:
                                return (<CloseCircleOutlined style={{ fontSize: 20, color: "#ff4d4f" }} />);

                              default:
                                return <Button size='small' icon={<MoreOutlined style={{ fontSize: 20 }} />}></Button>
                            }
                          }}
                        />
                        <Table.Column title="カナ氏名" dataIndex="kana_name" />
                        <Table.Column title="氏名" dataIndex="kanji_name" />
                        <Table.Column title="性" dataIndex="sex" width={35} align='center'
                          render={(value, record, index) => {
                            return value ?
                              value === 1 ? "男"
                                : value === 2 ? "女"
                                  : ""
                              : "";
                          }}
                        />
                        <Table.Column title="生年月日" dataIndex="birthday_on" width={125}
                          render={(value, record, index) => {
                            return (
                              value ? (
                                <div>
                                  {moment(value).format("NNy/MM/DD")}(
                                  {moment(value).format("YYYY")})
                                </div>
                              ) : ""
                            )
                          }}
                        />
                        <Table.Column title="続柄" dataIndex='name' width={50} />
                        <Table.Column title="事業所" dataIndex='office_kanji_name' />
                      </Table>
                    </div>

                    <div hidden={!this.state.disabledByOfficeCode}>
                      <Table
                        size="small"
                        style={{ cursor: 'pointer' }}
                        rowClassName={(record, index) => record.id === this.state.rowSelected[0].id ? 'table-row-light' : ''}
                        loading={this.state.isLoadingTable}
                        dataSource={this.state.dataSource}
                        rowKey={(record) => record.id}
                        scroll={{ x: 600, y: 700 }}
                        bordered
                        onRow={(record, rowIndex) => {
                          return {
                            onClick: () => {
                              this.setState({
                                rowSelected: [record],
                                selectedRowKeys: [record.id],
                              });
                            },

                            onDoubleClick: () => {
                              if (this.props.onFinishScreen) {
                                this.props.onFinishScreen({
                                  Lo_PersonalNumId: record.personal_number_id,
                                  recordData: record,
                                });
                              }
                            }
                          };
                        }}
                        onChange={(pagination) => {
                          this.getPersonalInfoSearchListOffice(pagination.current, pagination.pageSize);
                        }}
                        pagination={this.state.tableDataPaginate}
                      >
                        <Table.Column title="個人番号" dataIndex="personal_number_id" width={80} />
                        <Table.Column title="メモ" dataIndex="importance" width={40} align='center'
                          render={(value, record, index) => {
                            switch (record.importance) {
                              case 1:
                                return (<InfoCircleOutlined style={{ fontSize: 20, color: "#1890ff" }} />);

                              case 3:
                                return (<WarningOutlined style={{ fontSize: 20, color: "#faad14" }} />);

                              case 5:
                                return (<CloseCircleOutlined style={{ fontSize: 20, color: "#ff4d4f" }} />);

                              default:
                                return <Button size='small' icon={<MoreOutlined style={{ fontSize: 20 }} />}></Button>;
                            }
                          }}
                        />
                        <Table.Column title="カナ氏名" dataIndex="kana_name" />
                        <Table.Column title="氏名" dataIndex="kanji_name" />
                        <Table.Column title="性" dataIndex="sex" width={35} align='center'
                          render={(value, record, index) => {
                            return value ?
                              value === 1 ? "男"
                                : value === 2 ? "女"
                                  : ""
                              : "";
                          }}
                        />
                        <Table.Column title="生年月日" dataIndex="birthday_on" width={125}
                          render={(value, record, index) => {
                            return (
                              value ? (
                                <div>
                                  {moment(value).format("NNy/MM/DD")}(
                                  {moment(value).format("YYYY")})
                                </div>
                              ) : ""
                            )
                          }}
                        />
                        <Table.Column title="続柄" dataIndex='name' width={50} />
                      </Table>

                    </div>
                  </div>
                </Col>

                <Col lg={24} xl={13}>
                  <WS2584019_PersonalInfoInquirySub
                    Li_PersonalNum={this.state.rowSelected.length > 0 ? this.state.rowSelected[0].personal_number_id : ''}
                    inData={this.state.rowSelected[0]}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={24} className="text-end" style={{ textAlign: "right" }}>
                  <Space>
                    <Button type='primary'
                      disabled={this.state.rowSelected.length === 0}
                      onClick={() => {
                        this.setState({
                          childModal: {
                            ...this.state.childModal,
                            visible: true,
                            width: '90%',
                            component: (
                              <WS0343001_PersonalInfoMaintain
                                Li_PersonalNum={this.state.rowSelected[0].personal_number_id}
                                onFinishScreen={(output) => {
                                  this.closeModal()
                                }}
                              />
                            ),
                          },
                        });
                      }}
                    >
                      新規登録
                    </Button>
                    <Button type="primary"
                      disabled={this.state.rowSelected.length === 0}
                      onClick={() => {
                        if (this.props.onFinishScreen) {
                          this.props.onFinishScreen({
                            Lo_PersonalNumId: this.state.rowSelected[0].personal_number_id,
                            recordData: this.state.rowSelected[0],
                          });
                        }
                      }}>
                      選択
                    </Button>
                  </Space>
                </Col>
              </Row>
            </Spin>
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

const mapStateToProps = ({ userReducer, alertReducer }) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WS0248001_PersonalInfoSearchQuery);
