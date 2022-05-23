/* eslint-disable eqeqeq */
/* eslint-disable react/no-direct-mutation-state */
import React from "react";
import { connect } from "react-redux";
import ModalDraggable from "components/Commons/ModalDraggable";

import { Card, Table, Row, Col, Button, Form, Input, Select, message, Dropdown, Menu, Space } from "antd";
import WS0398001_ParamIndicationItemDisplaySub from 'pages/KK_ResultOutput/V4KK0012000_PrintParamMaintain/WS0398001_ParamIndicationItemDisplaySub.jsx';
import WS0397005_InstructionDivisionMaintain from 'pages/KK_ResultOutput/V4KK0012000_PrintParamMaintain/WS0397005_InstructionDivisionMaintain.jsx';
import ParamPromptedQuerySubAction from "redux/ResultOutput/PrintParamMaintain/ParamPromptedQuerySub/ParamPromptedQuerySub.action";
import OldItemAction from "redux/ResultOutput/PrintParamMaintain/OldItem.action"

class WS0397001_ParamPromptedQuerySub extends React.Component {
  formRef = React.createRef();
  constructor(props) {
    super(props);

    // document.title = 'ﾊﾟﾗﾒｰﾀ指示照会 SUB';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      dataSource: [],
      isLoadingTable: true,
      selectedRowKeys: [],
      rowSelected: [],
      indexTable: 0,
      parramScreeenData: {
        Li_Format: "",
        Lo_IndicationDivision: ""
      },
      parramListTable: {
        Li_Format: "",
        Li_Division: "",
        Li_DivisionList: "",
        Li_ClassifyNameList: "",
        Lo_IndicationDivision: "",
        SearchInstructionDivision: "",
        ButtonSelect: "",
      },
      SearchString: "",
      Identify: "",
      Identify_DB: []
    };
  }

  componentDidMount() {
    let form = {
      Li_Format: "",
      Lo_IndicationDivision: ""
    }
    console.log(this.props.Li_Format)
    form.Li_Format = this.props.Li_Format
    form.Lo_IndicationDivision = this.props.Lo_IndicationDivision ?? ""
    this.setState({
      parramScreeenData: form
    })
    this.getScreenData(form);
  }

  componentDidUpdate(PropPev) {
    if (this.props !== PropPev) {
      let form = {
        Li_Format: "",
        Lo_IndicationDivision: ""
      }
      form.Li_Format = this.props.Li_Format
      form.Lo_IndicationDivision = this.props.Lo_IndicationDivision
      this.setState({
        parramScreeenData: form
      })
      this.getScreenData(form);
    }
  }

  async getScreenData(parram) {
    this.setState({ isLoadingTable: true })
    const res = await ParamPromptedQuerySubAction.getScreenData(parram)
    let data = res ? res : [];
    this.setState({
      parramListTable: data,
      SearchString: data.SearchString,
      Identify: data.Identify,
      isLoadingTable: false,
      Identify_DB: data.Identify_DB,
    })
    this.formRef.current?.setFieldsValue({ Identify: data.Identify })
    this.getScreenDataTable(true)
  }
  async getScreenDataTable(reload) {
    const request = await ParamPromptedQuerySubAction.InstructDivisionQuerySub(this.state.parramListTable)
    let data_table = request.data ? request.data : [];
    let index = reload ? 0 : this.state.indexTable
    data_table.forEach((q) => {
      let temp = this.state.Identify_DB.find((i) => i.LinkedField == q._id_);
      q._id_ = temp.DisplayField;
    });
    this.setState({
      dataSource: data_table ? data_table : [],
      isLoadingTable: false,

      rowSelected: data_table.length > 0 ? [data_table[index]] : [],
      selectedRowKeys: data_table.length > 0 ? [data_table[index].id] : [],
      indexTable: index,
    })
  }

  updateIdentify(value) {
    this.setState({
      Identify: value
    })
    this.state.parramListTable.Li_Division = value
    this.getScreenDataTable(true)
  }

  updateSearchString(value) {
    this.state.parramListTable.Lo_IndicationDivision = value
  }

  changeRow(index) {
    this.setState({
      indexTable: index
    });
  }

  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      }
    });
  }

  render() {
    return (
      <div className="param-prompted-query-sub">
        <Card title="ﾊﾟﾗﾒｰﾀ指示照会 SUB">
          <Form ref={this.formRef}
            onFinish={this.getScreenData}>
            <Row gutter={24}>
              <Col span={8}>
                <Form.Item
                  name="Identify"
                  label="識別"
                >
                  <Select
                    onChange={(e) => this.updateIdentify(e)}>
                    {this.state.Identify_DB?.map(value => (
                      <Select.Option key={value.LinkedField} value={value.LinkedField}>{value.DisplayField}</Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Table
              size="small"
              dataSource={this.state.dataSource}
              loading={this.state.isLoadingTable}
              pagination={false}
              rowKey={(record) => record.id}
              scroll={{ x: 600, y: 400 }}
              bordered
              rowSelection={{
                type: "radio",
                selectedRowKeys: this.state.selectedRowKeys,
                onSelect: (record, selected, selectedRows) => {
                  let index = this.state.dataSource.findIndex(x => x.id === record.id)
                  this.setState({
                    rowSelected: selectedRows,
                    selectedRowKeys: selectedRows.map(x => x.id),
                    indexTable: index
                  });
                  this.changeRow(index)
                },
              }}
            >
              <Table.Column title="指示" dataIndex="instruction_division" width={120} />
              <Table.Column title="識別" dataIndex="_id_" key="" width={100} />
              <Table.Column title="名　称" dataIndex="name" />

              <Table.Column width={90} key="action" align='center'
                render={(value, record, index) => {
                  return (
                    <Space>
                      <Button size="small" type="primary" style={{ float: "right" }}
                        onClick={() => {
                          const func = this.props.onSelect || this.props.onFinishScreen;
                          if (this.props.format != 'instruction_division_857001') {
                            func({
                              Lo_IndicationDivision: record.instruction_division,
                              Lo_RecodeData: record
                            });
                          } else {
                            let params = {
                              instruction_division: record.instruction_division,
                              format_name: this.props.format_name ?? "",
                              parameters: this.props.parameters ?? "",
                              Li_StsListFormat: this.props.Li_Format ?? ""
                            }
                            OldItemAction.instructiondivisionchange(params)
                              .then((res) => {
                                func({
                                  Lo_IndicationDivision: record.instruction_division,
                                  Lio_Name: res.data.format_name,
                                  Lio_Option: res.data.parameters,
                                });
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
                        }}
                      >選択</Button>
                      <Dropdown
                        overlay={() => (
                          <Menu>
                            <Menu.Item onClick={() => {
                              console.log(this.state.Identify)
                              this.setState({
                                childModal: {
                                  ...this.state.childModal,
                                  visible: true,
                                  width: "70%",
                                  component:
                                    <WS0397005_InstructionDivisionMaintain
                                      Li_Format={this.state.parramScreeenData.Li_Format}
                                      Li_Identify={this.state.Identify}
                                      onFinishScreen={(ouput) => {
                                        this.getScreenData()
                                        this.closeModal()
                                      }}
                                    />
                                  ,
                                },
                              });
                            }}
                            >登録</Menu.Item>
                            <Menu.Item onClick={() => {
                              this.setState({
                                childModal: {
                                  ...this.state.childModal,
                                  visible: true,
                                  width: 800,
                                  component:
                                    <WS0398001_ParamIndicationItemDisplaySub
                                      Li_Format={this.state.parramScreeenData.Li_Format}
                                      Li_IndicationDivision={record.instruction_division}
                                      onClickedCreate={() => {
                                        this.getScreenData()
                                        this.closeModal()
                                      }}
                                    />
                                  ,
                                },
                              });
                            }}
                            >明細</Menu.Item>
                          </Menu>
                        )}
                      >
                        <Button size="small" type="primary" >:</Button>
                      </Dropdown>
                    </Space>
                  )
                }} />
            </Table>

            <Row gutter={24} className="mb-3">
              <Col span={24}>
                <Input.TextArea value={this.state.rowSelected[0]?.remarks} type="text" rows={5} />
              </Col>
            </Row>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0397001_ParamPromptedQuerySub);
