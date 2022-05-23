import React from "react";
import { connect } from "react-redux";
import { Card, Table, Form, Select, Button, Input, message } from "antd";
import  ModalDraggable  from "components/Commons/ModalDraggable";

import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';


import PropTypes from "prop-types";

import InspectAddDeleteAction from "redux/basicInfo/SetInfoMaintain/InspectAddDelete.action";
import WS0271001_InspectItemSearchQuerySingle from "../V4KB0201400_ContractInfoBatchProcess/WS0271001_InspectItemSearchQuerySingle";
import Modal from "antd/lib/modal/Modal";
import { getInspectItemSearchQuerySingleSistAction } from "redux/basicInfo/ContractInfoBatchProcess/ContractInfoBatchProcess.actions";
class WS2710017_InspectAddDelete extends React.Component {
  formRef = React.createRef();

  static propTypes = {
    Li_SetCode: PropTypes.any,
    Li_start_date_on: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = "検査追加・削除";

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      dataSource: [],
      isLoading: false,
      dataInspectItemSearchQuery: []
    };
    this.onFinish = this.onFinish.bind(this);
  }

  componentDidMount() {
    this.loadDataInspectItemSearchQuerySingle()
    this.setState({
      dataSource: [],
    });
    this.formRef.current.setFieldsValue({
      dataRow: this.state.dataSource,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.loadDataInspectItemSearchQuerySingle()
      this.setState({
        dataSource: []
      });
      this.formRef.current.setFieldsValue({
        dataRow: this.state.dataSource,
      });
    }
  }

  loadDataInspectItemSearchQuerySingle() {
    let params = {
      SearchChar: '',
      StsUseInspect: 1,
      Type: ''
    }
    this.setState({isLoading: true})
    getInspectItemSearchQuerySingleSistAction(params)
      .then((res) => {
        this.setState({ 
          dataInspectItemSearchQuery: res,
          isLoading: false 
        })
      })
      .finally(() => this.setState({isLoading: false}))
  }

  getExamName(inspectCode, index) {
    let data = this.state.dataInspectItemSearchQuery.filter(x => x.test_item_code === parseInt(inspectCode))
    console.log(inspectCode, index, data)
    if (data.length > 0) {
      this.updateDatasource(index, "exam_name", data[0]?.exam_name);
    } else {
      this.updateDatasource(index, "exam_name", '');
    }
  }

  onFinish(values) {
    let data = {
      Li_SetCode: this.props.Li_SetCode,
      data: this.formRef.current.getFieldValue("dataRow"),
    };

    InspectAddDeleteAction.InspectAddDelete(data)
      .then((res) => {
        if (this.props.onFinishScreen) {
          this.props.onFinishScreen(data);
        }
      })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  }

  handleAddRowTable() {
    let newRow = {
      id: Math.random(),
      Add_Remove: 0,
      W1_inspect_cd: null,
      exam_name: null,
      start_date_on: this.props.Li_start_date_on
    };

    let data = [...this.state.dataSource];

    data.push(newRow);

    this.setState({
      dataSource: data,
    });

    this.formRef.current.setFieldsValue({
      dataRow: data,
    });

    this.forceUpdate();
  }

  handleDeleteRowTable(index) {
    let data = [...this.state.dataSource];

    data.splice(index, 1);

    this.formRef.current.getFieldValue("dataRow").splice(index, 1);

    this.setState({
      dataSource: data,
    });
  }

  updateDatasource(index, field, value) {
    let data = [...this.state.dataSource];

    data[index][field] = value;

    this.setState({
      dataSource: data,
    });

    this.formRef.current.setFieldsValue({
      dataRow: data,
    });
  }

  renderDelete(index) {
    return (
      <Button size='small'
        onClick={() => this.handleDeleteRowTable(index)}
        danger
        icon={<DeleteOutlined />}
      >
      </Button>
    );
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
      <div className="inspect-add-delete">
        <Card title="検査追加・削除">
          <Form ref={this.formRef} onFinish={this.onFinish}>
            <Table
              dataSource={this.state.dataSource}
              loading={this.state.isLoading}
              pagination={this.state.dataSource.length > 10 ? true : false}
              rowKey={(record) => record.id}
            >
              <Table.Column width={'20%'}
                title="追加・削除"
                dataIndex="Add_Remove"
                render={(text, record, index) => {
                  return (
                    <>
                      <Form.Item name={["dataRow", index, "Add_Remove"]}>
                        <Select
                          onChange={(value) => {
                            this.updateDatasource(index, "Add_Remove", value);
                          }}
                        >
                          <Select.Option value={0}><label style={{ color: 'blue' }}>追加</label></Select.Option>
                          <Select.Option value={1}><label style={{ color: 'red' }}>削除</label></Select.Option>
                        </Select>
                      </Form.Item>
                    </>
                  );
                }}
              />
              <Table.Column width={'30%'}
                title="検査コード"
                dataIndex="W1_inspect_cd"
                render={(text, record, index) => {
                  return (
                    <Form.Item name={["dataRow", index, "W1_inspect_cd"]}>
                      <Input.Search type='number' min={0}
                        onSearch={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: '60%',
                              component: (
                                <WS0271001_InspectItemSearchQuerySingle
                                  onFinishScreen={(output) => {
                                    this.updateDatasource(index, "W1_inspect_cd", output.Lio_InspectItemCode);
                                    this.updateDatasource(index, "exam_name", output.recordData.exam_name);

                                    this.closeModal();
                                  }}
                                />
                              ),
                            },
                          });
                        }}
                        onBlur={(e) => {
                          this.updateDatasource(index, "W1_inspect_cd", e.target.value);
                          this.getExamName(e.target.value, index)
                        }}
                      />
                    </Form.Item>
                  );
                }}
              />
              <Table.Column
                title="検査名"
                dataIndex="exam_name"
                render={(text, record, index) => {
                  return <Form.Item label={record.exam_name}></Form.Item>;
                }}
              />
              <Table.Column width={100}
                title={
                  <div style={{ textAlign: "center" }}>
                    <Button
                      onClick={() => this.handleAddRowTable()}
                      type="primary"
                      icon={<PlusOutlined />}
                    >
                      追加
                    </Button>
                  </div>
                }
                render={(text, record, index) => {
                  return <div style={{ textAlign: "center" }}>{this.state.dataSource.length > 1 ? this.renderDelete(index) : ""}</div>;
                }}
              />
            </Table>
            <Button
              type="primary"
              htmlType="submit"
              style={{ float: "right", marginTop: "1em" }}
            >
              実行
            </Button>
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
)(WS2710017_InspectAddDelete);
